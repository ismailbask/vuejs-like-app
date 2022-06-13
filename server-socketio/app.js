const socketio = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const PORT = process.env.PORT || 2018;
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST0", "OPTIONS"],
  },
});
server.listen(PORT, () => {
  //io üzerinden bir event gelirse ve ismi connection olursa bir client geliyor ve bunun adı socket deriz.
  io.on("connection", (socket) => {
    console.log(socket.id);
    //KArşılama mesajı gönderildi.
    socket.emit("Welcome_message", `Hoşgeldin ${socket.id}`);
    //socket.on ile gelen mesajı yakala
    socket.on("NEW_BOOKMARK_EVENT", (bookmark) => {
      console.log("new bookmark  geldi", bookmark);
      // io.emit("NEW_BOOKMARK_ADDED", bookmark);

      // paylaşan hariç herkese bookmark bilgisini yolla
      socket.broadcast.emit("NEW_BOOKMARK_ADDED", bookmark);
    });
  });
});
