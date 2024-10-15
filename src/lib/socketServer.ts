import { Server } from "socket.io";

let io: any;

const createSocketServer = () => {
  io = new Server({});
  io.on("connection", (socket: any) => {
    console.log("New user connected");

    socket.on("sendMessage", (data: any) => {
      console.log("User sendMessage", data);
      // Phát lại tin nhắn đến client khác nếu cần
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export const getSocketIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

export default createSocketServer;
