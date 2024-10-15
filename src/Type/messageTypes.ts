//////////////////////////////-----MESSAGE TYPE-----//////////////////////////////

import z from "zod";

export const Message = z.object({
  _id: z.string(),
  text: z.string(),
  senderId: z.string(),
  chatId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type MessageType = z.TypeOf<typeof Message>;

export const Room = z.object({
  _id: z.string(),
  members: z.array(z.string()),
  user_unread: z.record(z.string(), z.any()),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type RoomType = z.TypeOf<typeof Room>;

export const SendMessageBody = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  text: z.string(),
});
export type SendMessageBodyType = z.TypeOf<typeof SendMessageBody>;

//  SEND MESSAGE RES TYPE
export const SendMessageRes = z.object({
  data: Message,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type SendMessageResType = z.TypeOf<typeof SendMessageRes>;

// GET ALL CHAT

export const GetAllRoomBody = z.object({
  adminId: z.string(),
});
export type GetAllRoomBodyType = z.TypeOf<typeof GetAllRoomBody>;

//  SEND MESSAGE RES TYPE
export const GetAllRoomRes = z.object({
  data: z.array(Room),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type GetAllRoomResType = z.TypeOf<typeof GetAllRoomRes>;

// GET Room

export const GetRoomBody = z.object({
  chatId: z.string(),
});
export type GetRoomBodyType = z.TypeOf<typeof GetRoomBody>;

const Chat = z.object({
  room: Room,
  messages: z.array(Message),
});

export type ChatType = z.TypeOf<typeof Chat>;

//  SEND MESSAGE RES TYPE
export const GetRoomRes = z.object({
  data: Chat,
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type GetRoomResType = z.TypeOf<typeof GetRoomRes>;

// MARK UNREAD

export const MarkUnreadBody = z.object({
  chatId: z.string(),
  _id: z.string(),
});
export type MarkUnreadBodyType = z.TypeOf<typeof MarkUnreadBody>;

//  SEND MESSAGE RES TYPE
export const MarkUnreadRes = z.object({
  data: z.null(),
  message: z.string(),
  ok: z.boolean(),
  statusCode: z.number(),
});
export type MarkUnreadResType = z.TypeOf<typeof MarkUnreadRes>;

const notification = z.object({
  senderId: z.string(),
  text: z.string(),
  isRead: z.boolean(),
  receiverId: z.string(),
});
export type notificationType = z.TypeOf<typeof notification>;
