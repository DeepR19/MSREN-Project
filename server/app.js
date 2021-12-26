const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);

const io = socketio(server, { cors :{origin :'*'}});
const cookieParser = require('cookie-parser');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


// link DB
require("./src/db/conn");

    // let users = [];
    // let alone=[];
    // // add users
    // const addSocket = (userId, name, socketId) => {
    //   !users.some((user) => user.userId === userId) &&
    //     users.push({ userId, name, socketId });

    //     console.log(users)
    // };

    // // remove socketId from users
    // const removeSocket = (socketId) => {
    //   users = users.filter((user) => user.socketId !== socketId);
    // };

    // // find userId is in users
    // const getSocket = (userId) => {
    //   return users.find((user) => user.userId === userId);

    // };
// const filterSocket =(userId) => {
//    return alone = users.filter((user)=>user.userId !== userId)
//         // console.log(alone)
// }
    io.on("connection", socket => {
        console.log("--> Socket Connected😎");


    //   //add user to socket
    //   socket.on("addUser", (userId, name) => {
    //     addSocket(userId, name, socket.id);

    //   //  const get = filterSocket(userId);

    //     io.emit("getUsers", users);
    //   });

    //   socket.on("typing", ({sender, receiver})=>{
    //     const user = getSocket(receiver.userId);

    //     user?
    //         io.to(user.socketId).emit("type", sender)
    //         :console.log("No!");
    //   })

     

    //   //socket remove
      socket.on("disconnect", () => {
        console.log("<-- user Gone😭");
        // removeSocket(socket.id);
      // io.emit("getUsers", users);

      });

    })




// link router page
app.use(require("./src/route/router"));
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
})



