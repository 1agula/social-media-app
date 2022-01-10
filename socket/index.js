const io = require("socket.io")(8990, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let receivers = [];

const addReceiver = (receiverId, socketId) => {
  !receivers.some((receiver) => receiver.receiverId === receiverId) &&
    receivers.push({ receiverId, socketId });
};

const getReceiver = (receiverId) => {
  return receivers.find((receiver) => receiver.receiverId === receiverId);
};

const removeReceiver = (socketId) => {
  receivers = receivers.filter((receiver) => receiver.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("user connected");
  //take userId and socketId from user
  socket.on("addReceiver", (receiverId) => {
    addReceiver(receiverId, socket.id);
    io.emit("getReceivers", receivers);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    console.log(senderId, receiverId, text);
    const receiver = getReceiver(receiverId);
    io.to(receiver.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when diconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeReceiver(socket.id);
  });
});
