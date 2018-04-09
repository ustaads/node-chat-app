var socket = io();

socket.on('connect', function () {
    console.log(`Connected to server`);
});


socket.on('joinMessage', function (message) {
    console.log('Greetings ', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newUserMessage', (message) => {
    console.log('From New Message',message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newMessage', (message) => {
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
    
    let messageBoxText = jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageBoxText.val()
    },function(acknowlegdement){
        console.log(acknowlegdement);
        messageBoxText.val('');
    });

});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    console.log('On Click');
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled','disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch Location');
    })
});

socket.on('newLocationMessage',function(message){
    console.log('From New Location Message',message);

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank" >My Current Location</a>');
    a.attr('href',message.url);
    li.text(`${message.from}: `);
    li.append(a);
    jQuery('#messages').append(li);
});