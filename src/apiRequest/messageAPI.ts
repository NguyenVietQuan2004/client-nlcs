import httpRequest from "@/lib/http";
import {
  GetAllRoomBodyType,
  GetAllRoomResType,
  GetRoomBodyType,
  GetRoomResType,
  MarkUnreadBodyType,
  MarkUnreadResType,
  SendMessageBodyType,
  SendMessageResType,
} from "@/Type/messageTypes";

export const messageAPI = {
  sendMessage(body: SendMessageBodyType) {
    return httpRequest.post<SendMessageResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/message`, {
      body,
    });
  },
  getAllChats(body: GetAllRoomBodyType) {
    return httpRequest.get<GetAllRoomResType>(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/message/${body.adminId}/getall`,
      {
        cache: "no-cache",
      }
    );
  },
  getRoom(body: GetRoomBodyType) {
    return httpRequest.get<GetRoomResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/message/${body.chatId}/room`, {
      cache: "no-cache",
    });
  },
  markUnread(body: MarkUnreadBodyType) {
    return httpRequest.post<MarkUnreadResType>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/message/markunread`, {
      body,
      cache: "no-cache",
    });
  },
};
