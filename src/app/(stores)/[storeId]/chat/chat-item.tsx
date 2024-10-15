import Image from "next/image";
import { animals } from "../../../../../public/icons/icons";
import { ChatType, RoomType } from "@/Type/messageTypes";
import { firstKey, firstValue } from "@/lib/utils";

interface ChatItemProps {
  item: RoomType;
  handleOnClickChat: (item: RoomType) => void;
  numNewNoti: number;
  index: number;
  roomData: ChatType | null;
  sender: string;
}

function ChatItem({ item, handleOnClickChat, numNewNoti, index, roomData, sender }: ChatItemProps) {
  let numOldNoti = firstKey(item.user_unread) === sender ? firstValue(item.user_unread) : 0;
  // if (roomData && item._id === roomData.room?._id) {
  //   numOldNoti = firstValue(roomData.room.user_unread);
  // }
  return (
    <div
      className={`hover:opacity-50 flex gap-4 items-center cursor-pointer  min-h-16   rounded-2xl px-5   ${
        0 === 0 && "bg-[#f4f4f5]"
      }`}
      onClick={() => handleOnClickChat(item)}
    >
      <Image
        alt="avatar"
        src={`/images/avataruser/avatar${(index % 4) + 1}.webp`}
        width={500}
        height={500}
        className="rounded-full h-10 w-10"
      />
      <span className="line-clamp-1">{animals[index % 100]}</span>
      <span>{(firstKey(item.user_unread) === sender ? numOldNoti : 0) + numNewNoti}</span>
    </div>
  );
}

export default ChatItem;
