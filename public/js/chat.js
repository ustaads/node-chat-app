var socket = io();

function scrollToBottom() {

    let messages = jQuery("#messages");

    let newMessage = messages.children('li:last-child')

    let clientHeight = messages.prop('clientHeight');
    let scrollHeight = messages.prop('scrollHeight');
    let scrollTop = messages.prop('scrollTop');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {

        messages.scrollTop(scrollHeight);
        
    }
}
socket.on('connect', function () {
   
    let params = jQuery.deparam(window.location.search);


    socket.emit('join', params, function (err) {
        
        if (err) {
           
            alert(err);
            window.location.href = '/';
        } else {
            
        }
    });

});



socket.on('joinMessage', function (message) {
   
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.on('newMessage', (message) => {
//     console.log('From New Message',message);
//     let formattedTime = moment(message.createdAt).format('hh:mm a');
//     var li = jQuery('<li></li>');
//     li.text(`${message.from} ${formattedTime}: ${message.text} `);
//     jQuery('#messages').append(li);
// });



socket.on('newMessage', (message) => {

    
    let formattedTime = moment(message.createdAt).format('hh:mm a');
    let template = jQuery("#message-template").html();
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery("#messages").append(html);
    scrollToBottom();

});

socket.on('updateUserList',function(users){
    

    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});


socket.on('disconnect', function () {
    console.log(`Disconnected from Server`);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    let params = jQuery.deparam(window.location.search);
    let messageBoxText = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: params.name,
        text: messageBoxText.val()
    }, function (acknowlegdement) {
        // console.log(acknowlegdement);
        messageBoxText.val('');
    });

});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    let params = jQuery.deparam(window.location.search);
    // console.log('On Click');
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
            from: params.name,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send Location');
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch Location');
    })
});

socket.on('newLocationMessage', function (message) {
    

    let formattedTime = moment(message.createdAt).format('hh:mm a');
    let template = jQuery("#location-message-template").html();
 
    let html = Mustache.render(template, {
        url: message.url,
        createdAt: formattedTime,
        from: message.from
    });
    jQuery("#messages").append(html);
    scrollToBottom();
});