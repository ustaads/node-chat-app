const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const {isRealString} = require('./utils/validation');
const http = require('http');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {Users}= require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
        // console.log(`New User Connected `);
        socket.on('join',(params, callback)=>{
            // console.log(params.name,'from server.js');
            if(!isRealString(params.name) || !isRealString(params.room) )
            {
                return callback('Name and Room name are Required');
            }
            //join a room
            socket.join(params.room);
            users.removeUser(socket.id);
            users.addUser(socket.id, params.name, params.room);
            io.to(params.room).emit('updateUserList',users.getUserList(params.room));
            socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+' has Joined'));

            callback();
        });

        socket.on('createMessage',(message,callback) =>{
            console.log('Message',message);

            let user = users.getUser(socket.id);
            // console.log('Socket.id',user);
             io.to(user[0].room).emit('newMessage',generateMessage(message.from,  message.text));
            
  
            callback('This is from the Server.');
           
        });

        socket.on('createLocationMessage',(message)=>{
            console.log(message.from,message.latitude, message.longitude);
            let user = users.getUser(socket.id);
            console.log(user[0].room);
            io.to(user[0].room).emit('newLocationMessage',generateLocationMessage(message.from,message.latitude, message.longitude));
        });
        socket.on('disconnect',()=>{
            console.log(`Client Disconnected`);
            console.log(users,'Server.js disconnect');
            var user = users.removeUser(socket.id);
            // console.log(users.getUserList(),'Server.js disconnect');
            // console.log(user,'Server.js disconnect');
            if(user){
                // console.log(users.getUserList(user[0].room));
                io.to(user[0].room).emit('updateUserList',users.getUserList(user[0].room));
                io.to(user[0].room).emit('newMessage',generateMessage('Admin', ` ${user[0].name} has left`));      
            }
        });
    

    
    });


       
    server.listen(port, () => {
        console.log(`Server is up on port ${port}`);
    });