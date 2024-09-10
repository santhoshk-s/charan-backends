const express = require('express');
const app = express();
const cors = require('cors');
const socket = require("socket.io");
const port = process.env.PORT || 5000;
require('dotenv').config();
const connectDB=require("./src/config/DB");
const userRoutes=require("./src/routes/userRoutes");
const messageRoute=require("./src/routes/messagesRoute");
const Users=require('./src/Models/userModel');
const workshop = require('./src/routes/workShopRoutes/workshopRoutes');
const internshipRoute = require('./src/routes/internshipRoute');
const applicationRoute = require('./src/routes/applicationRoute');
connectDB()
app.use(cors());
app.use(express.json());


app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoute);
app.use('/api/workshop',workshop)
app.use('/api/internshipRoute',internshipRoute)
app.use('/api/application',applicationRoute)




app.get('/', (req, res) => {
    res.send('Travel app backend start');
});

const server = app.listen(port, () => {
    console.log(`Server Started on ${port}`);
  });
  
  const io = socket(server, {
    cors: {
      origin:"http://localhost:5173",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  let onlineUserIds = {};
  
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
      onlineUserIds[userId]=true;
      io.emit("online-users", onlineUserIds);
    });
  
    socket.on("send-msg", async (data) => {
      const userData = await Users.findById(data.from);
      const date = new Date();
      userData.lastMessage = date;
      await userData.save();
      const allUserdata = await Users.find({}).sort({ lastMessage: -1 });
      // console.log(allUserdata)
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message, allUserdata);
      }
    });
  
    socket.on("logout", (userId) => {
      onlineUserIds[userId]=false;
  
      io.emit("online-users", onlineUserIds);
    })
  });


