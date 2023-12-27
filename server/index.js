const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = 8000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join_room", (passed_data) => {
    socket.join(passed_data?.room_name);
    console.log(
      `User ${socket.id} has joined the room: ${passed_data?.room_name}`
    );
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
