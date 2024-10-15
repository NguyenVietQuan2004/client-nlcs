import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let onlineUsers = [];
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3001",
    },
  });
  io.on("connection", (socket) => {
    console.log("Connection success!");
    socket.on("addNewUser", (userId) => {
      !onlineUsers.find((user) => user.userId === userId) &&
        onlineUsers.push({
          userId,
          socketId: socket.id,
        });
      console.log(onlineUsers);
    });
    socket.on("sendMessage", (data) => {
      const userReceive = onlineUsers.find((user) => user.userId === data.receiverId);
      io.to(userReceive.socketId).emit("getMessage", {
        text: data.text,
        senderId: data.senderId,
      });
      io.to(userReceive.socketId).emit("getNotifications", {
        senderId: data.senderId,
        receiverId: userReceive.userId,
        text: data.text,
        isRead: false,
      });
    });
    socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    });
  });
  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
