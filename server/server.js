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

        socket.on('createMessage',(message,callback) =>{
            console.log('Message',message);
            // io.emit('newMessage',generateMessage(message.from,  message.text));
            
        socket.broadcast.emit('newUserMessage',generateMessage(message.from,  message.text));

            callback('This is from the Server.');
           
        });
        socket.on('disconnect',()=>{
            console.log(`Client Disconnected`);
        });
        socket.on('newMessage',(message,)=>{
            console.log(message);

        });
    });

       
    server.listen(port, () => {
        console.log(`Server is up on port ${port}`);
    });