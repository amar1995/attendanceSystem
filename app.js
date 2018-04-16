const express = require('express'); 
const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const bodyParser = require('body-parser');



const app = express();



// To link with arduino-uno on com3 serial port
// Use a `\r\n` as a line terminator
const parser = new parsers.Readline({
  delimiter: '\r\n'
});

const serialPort = new SerialPort('COM3', {
  baudRate: 9600,
  autoOpen: false
});

serialPort.pipe(parser);

// serialPort.on('open').then((res) => {
// 	  console.log('Port open');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

parser.on('data', (data) => {
  console.log(data);
  if ( data[1] === 'S' ) {
    // successfully attendance registered
  } else if (data[1] === 'E') {
    // new fingerPrint id enrolled

  } else {
    // fingerPrint deleted
  }
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