const express = require("express");
const morgan = require("morgan");
const api = require("./src/apis/index");
const cors = require("cors");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
const port = 5000;
const socketPort = 4000;
const dbMiddleware = require("./src/middlewares/dbConnection")
app.use(cors());
//app.use(express.json())

const storyRoutes = require("./src/apis/story");

api(app);

app.use(morgan("combined"));
app.use(dbMiddleware);
app.use("/api/stories", storyRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  },
});

const userRegistration = {};

io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id}`);

  // Listen for messages from clients
  socket.on("chatMessage", (sendMessage) => {
    console.log("sendMessage", sendMessage);
    const recipentId = userRegistration[sendMessage.recipentEmail];
    console.log("recipentId", recipentId);
    socket.to(recipentId).emit("newMessage", {
      sendfrom: sendMessage.senderEmail,
      content: sendMessage.content,
      image: sendMessage.image
    });
  });

  socket.on("register", (email) => {
    console.log(email)

    userRegistration[email] = socket.id
    console.log(userRegistration)
  })

  socket.on("newStory", (storyData) => {
    const recipentId = userRegistration[storyData.recipentEmail]; // Tìm ID người nhận
    console.log("New Story data", storyData);

    socket.to(recipentId).emit("newStoryNotification", {
      userEmail: storyData.senderEmail,
      mediaUrl: storyData.mediaUrl,
      createdAt: new Date()
    });
  });

  socket.on("viewStory", (viewData) => {
    const recipentId = userRegistration[viewData.recipentEmail];
    console.log("User viewed the story", viewData);

    socket.to(recipentId).emit("viewStoryNotification", {
      userEmail: viewData.senderEmail,
      mediaUrl: viewData.mediaUrl
    });
  });

  // Xóa story
  socket.on("deleteStory", (storyId) => {
    console.log("Story deleted", storyId);

    // Có thể thông báo cho người nhận về việc story đã bị xóa
    socket.broadcast.emit("storyDeleted", { storyId });
  });


  socket.on("changeBackground", (image) => {
    console.log(image)
    const recipentId = userRegistration[image.recipentEmail]
    socket.to(recipentId).emit("changeBackground", {
      "sendFrom": image.senderEmail,
      "src": image.src,
      "theme": image.theme
    })

  })

  socket.on("newLike", (like) => {
    console.log("new Like", like)
    const recipentId = userRegistration[like.postOwnerEmail]
    console.log("userRegistration", userRegistration)
    console.log("like.postOwnerEmail", like.postOwnerEmail)
    console.log("new like recipent id", recipentId)
    socket.to(recipentId).emit("newLikeOnPost", {
      "user": like.userEmail,
      "postId": like.postId,
      "type": like.type
    })

  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });



});

// const corsOptions = {
//     origin: 'http://127.0.0.1:3000', // Allow your frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };

server.listen(socketPort, () => {
  console.log(`Listening on port ${socketPort}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
