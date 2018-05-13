const express = require('express'); 
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

const app = express();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cors());
app.use(logger('dev'));
app.use(passport.initialize());
app.use(passport.session());


mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/AttendanceSystem');

const {user, enrollUser} = require('./routes/user');
const attendanceEntry = require('./routes/attendace');
const posts = require('./routes/post');
const notices = require('./routes/notice');

app.use('/users',user);
app.use('/post',posts);
app.use('/notice',notices);
// To link with arduino-uno on com3 serial port
// Use a `\r\n` as a line terminator
const parser = new parsers.Readline({
   delimiter: '\n'
 });

// const serialPort = new SerialPort('COM3', {
//   baudRate: 9600
// });

// serialPort.pipe(parser);

// serialPort.on('open',(err) => {
//   if(err)
//   console.log(err);
//   else  
//   console.log('serialPort opened');
// });

// parser.on('data',console.log);

parser.on('data', (data) => {
  // setTimeout( () => console.log(JSON.parse(data)),2000);
  data = data.toString();
  // const id = Number(data.slice(2));
  // console.log(id);
  // console.log(data);
  if ( data[1] === 'S' ) {
    // successfully attendance registered
    attendanceEntry((parseInt(data.slice(2))));
   }  else if (data[1] === 'E') {
    // new fingerPrint id enrolled
    enrollUser((parseInt(data.slice(2))));
  } // else {
  //   // fingerPrint deleted
  // }
});

// starting server

const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err)
    {
      console.log(err);
    }
    else console.log('Attendance System server started at port ' + port);
})