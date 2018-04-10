var moment= require('moment');

var date = moment().add(1,'hour');
console.log(date.format('hh:mm a' ));
console.log(date.format('h:mm a' ));