const express = require('express');
const socketio = require('socket.io');
const http = require('http');
// const router = require('./router');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const io = socketio(server, { cors :{origin :'*'}});
// const {addUser, removeUser, getUser, getUserInRoom} = require('./users');

// let currentUser = {}

let users =[];
let groups=[];
io.on('connection', (socket) => {

    // for PrivateChatting

    console.log(`We hava a new ${socket.id}`);


     socket.on('disconnect', () => {
        console.log('User left 😑😯😐'); 
    });


    socket.on("userConnected", (userName) => {
        users[userName] = socket.id;
        io.emit("userConnect",userName);
    })

    socket.on("handleGroup", (sender, group) => {
        groups[sender] = group;

        io.emit("handIn",sender, groups[sender]);
    })

    socket.on("send_message",(data) => {

        var socketID = users[data.receiver];
        io.to(socketID).emit("newMessage",data);
    })
   

 






















// for RoomChatting



//     socket.on('disconnect', () => {
//         console.log('User left 😑😯😐');
        
//         const user = removeUser(socket.id);

//         delete currentUser[socket.id];

//         if(user){
//             io.to(user.room).emit('message',{user: 'admin', text: `OMG! ,${user.name} left 😑😯😐`})
//         }   
//     });

//     socket.on('join', ({name, room , time}, callback) => {

//         const {error , user} = addUser({id: socket.id, name, room, time});

//         if(error) return callback(error);

//         socket.emit('message', {user: 'admin', text: `${user.name}, welcome to ${user.room}`});
        
//         currentUser[socket.id] = name;
//         socket.emit("userCount", {user: currentUser, totalUser: Object.keys(currentUser).length});


//         socket.broadcast.to(user.room).emit('message',{ user: 'admin',text: `${user.name} has joined`});

//         socket.join(user.room);

//         io.to(user.room).emit('roomData',{room: user.room , users: getUserInRoom(user.room)})

//         callback();
        
//     });

//     socket.on('sendMessage',(message, callback) => {

//         const user = getUser(socket.id);
//         // console.log(message);


//         io.to(user.room).emit('message', {user: user.name, text: message, time: user.time});

//         io.to(user.room).emit('roomData', { room: user.room,  users: getUserInRoom(user.room) });

//         callback();
//     });
    
})



// app.use(router);
// app.use(cors());

server.listen(PORT, () => console.log(`Socket server has started on port ${PORT}`));
