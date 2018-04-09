var socket = io();

socket.on('connect', function () {
    console.log(`Connected to server`);
});


socket.on('joinMessage', function (message) {
    console.log('Greetings ', message);
});

socket.on('newUserMessage', (message) => {
    console.log('From New Message',message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});




socket.on('disconnect', function () {
    console.log(`Disconnected from Server`);
});

jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function(acknowlegdement){
        console.log(acknowlegdement);
    });

});