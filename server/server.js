const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
    io.on('connection', (socket) => {
        console.log(`New User Connected `);

        
        

        socket.emit('joinMessage',generateMessage('Admin','Welcome to the Chat App'));


        socket.broadcast.emit('newUserMessage',generateMessage('Admin','New User Joined'));



        socket.on('createMessage',(message) =>{
            console.log('Message',message);
            io.emit('newMessage',generateMessage(message.from,  message.text));
            // socket.broadcast.emit('newMessage',{
            //     from: message.from,
            //     text: message.text,
            //     createdAt: new Date().getTime()
            // });
        });

        

        socket.on('disconnect',()=>{
            console.log(`Client Disconnected`);
        });

    });

   

    server.listen(port, () => {
        console.log(`Server is up on port ${port}`);
    });