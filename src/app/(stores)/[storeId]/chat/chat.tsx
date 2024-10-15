"use client";

import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";

import { socket } from "@/socket.js";
import WrapIcon from "./wrap-icon";
import ChatItem from "./chat-item";
import RoomChatItem from "./room-chat-item";
import { messageAPI } from "@/apiRequest/messageAPI";
import { handlError } from "@/components/handle-error";
import {
  InfoIcon,
  MoreIcon,
  PhoneIcon,
  SendMessageIcon,
  SquarePenIcon,
  VideoCallIcon,
} from "../../../../../public/icons/icons";
import { ChatType, MessageType, notificationType, RoomType } from "@/Type/messageTypes";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  text: z.string().min(1, { message: "" }),
});

// function ChatClient({ allRooms }: { allRooms: GetAllRoomResType["data"] }) {
function ChatClient() {
  const sender = "admin";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roomData, setRoomData] = useState<ChatType | null>(null);
  const [currentRoomId, setCurrentRoomId] = useState<string>("");
  const [notifications, setNotifications] = useState<notificationType[]>([]);
  const [allRooms, setallRooms] = useState<RoomType[]>([]);

  const objectRoom: RoomType | undefined = allRooms.find((item: RoomType) => item._id === currentRoomId);

  useEffect(() => {
    if (ref && ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [ref, roomData]);
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        if (currentRoomId) {
          const data = await messageAPI.getRoom({ chatId: currentRoomId });
          setRoomData(data.data);
          setallRooms((pre) => [
            ...pre.map((i) => {
              if (i._id === data.data.room._id) {
                return data.data.room;
              }
              return i;
            }),
          ]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [currentRoomId]);
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!socket?.connected || isLoading || !objectRoom) return;
    try {
      // xem seét lai thứ tự này, nếu đúng thì thứ tự này chưa đúng, nếu thất bại thì set message gửi sai nhưng đang để đẹp người dùng
      setIsLoading(true);
      form.setValue("text", "");
      setRoomData((pre: any) => ({
        ...pre,
        messages: [...pre.messages, { senderId: sender, text: data.text, _id: uuidv4(), createdAt: new Date() }],
      }));

      socket.emit("sendMessage", { senderId: sender, receiverId: objectRoom.members[0], text: data.text });
      await messageAPI.sendMessage({ senderId: sender, receiverId: objectRoom.members[0], text: data.text });
    } catch (error) {
      handlError({ consoleError: "Create message error", error });
    } finally {
      setIsLoading(false);
    }
  };
  const handleOnClickChat = async (item: RoomType | undefined) => {
    if (!item) return;

    try {
      // if (firstKey(item.user_unread) !== sender) return;
      await messageAPI.markUnread({ _id: item.members[0], chatId: item._id });
      router.refresh();
    } catch (error) {
      handlError({ consoleError: "Mark unread error", error });
    } finally {
      setNotifications((pre: any) => {
        return pre.filter((i: notificationType) => i.senderId !== item.members[0]);
      });
      setCurrentRoomId(item._id);
    }
  };
  useEffect(() => {
    if (!socket.connected) return;
    socket.emit("addNewUser", sender);
    socket.on("getNotifications", (data) => {
      setNotifications((pre: any) => [...pre, { ...data, isRead: data.senderId === objectRoom?.members[0] }]);

      if (data.senderId === objectRoom?.members[0]) {
        handleOnClickChat(objectRoom);
      }
    });

    socket.on("getMessage", (data) => {
      if (data.senderId !== objectRoom?.members[0]) return;
      setRoomData((pre: any) => ({
        ...pre,
        messages: [...pre.messages, { senderId: data.sender, text: data.text, _id: uuidv4(), createdAt: new Date() }],
      }));
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotifications");
    };
  }, [currentRoomId]);
  console.log(allRooms);
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await messageAPI.getAllChats({ adminId: "admin" });
        setallRooms(response.data);
      } catch (error) {
        handlError({ consoleError: "Get all room error", error });
      }
    };
    fetchAllRooms();
  }, []);
  return (
    <div className="flex z-50 border rounded-xl h-[560px] overflow-hidden ">
      <div className="min-w-[33.333%]  bg-[#fdfdfe] border-r h-full max-w-full flex flex-col">
        <div className="flex justify-between items-center p-5">
          <div className=" font-medium text-[24px] text-[#09090B]">
            Chats <span className="text-[#D4D4D8]">({allRooms.length})</span>
          </div>
          <div className="flex items-center gap-4">
            <WrapIcon children={<MoreIcon />} />
            <WrapIcon children={<SquarePenIcon />} />
          </div>
        </div>
        <div className="p-4  flex flex-col gap-2 overflow-auto ">
          {allRooms.map((item: RoomType, index: number) => {
            const numNewNoti = notifications.filter(
              (i: notificationType) => i.isRead === false && i.senderId === item.members[0]
            ).length;
            return (
              <ChatItem
                sender={sender}
                index={index}
                handleOnClickChat={handleOnClickChat}
                numNewNoti={numNewNoti}
                item={item}
                roomData={roomData}
                key={item._id}
              />
            );
          })}
        </div>
      </div>
      {objectRoom?.members[0] ? (
        <div className="min-w-[66.666%]  flex flex-col ">
          <div className="border-b p-4 py-4 flex justify-between items-center">
            <div className="pr-2 line-clamp-1">{objectRoom?.members[0]}</div>
            <div className="flex gap-1 items-center">
              <WrapIcon children={<PhoneIcon />} />
              <WrapIcon children={<VideoCallIcon />} />
              <WrapIcon children={<InfoIcon />} />
            </div>
          </div>
          <div className="flex flex-col overflow-auto p-4 gap-2" ref={ref}>
            {roomData?.messages?.map((item: MessageType) => {
              return <RoomChatItem item={item} sender={sender} key={item._id} />;
            })}
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full py-4 bg-white px-4 flex mt-auto items-center "
            >
              <div className="border h-full flex-1 rounded-full ">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full space-y-0">
                        <FormControl>
                          <input
                            {...field}
                            autoComplete="off"
                            className=" w-full p-4  placeholder:align-middle  outline-none bg-transparent"
                            placeholder="Type a message"
                            autoFocus
                          />
                        </FormControl>
                        <FormMessage className="text-sm" />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <button type="submit" className="px-6 block h-full">
                <SendMessageIcon fill={form.getValues("text") ? "#353535" : "#acaaaa"} />
              </button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="min-w-[66.666%]  flex flex-col text-xl pt-10 text-center">No user selected.</div>
      )}
    </div>
  );
}

export default ChatClient;
