var SerialPort = require("serialport");
var serialPort = new SerialPort("/dev/ttyS0", {
  baudrate: 19200,
  parser: SerialPort.parsers.readline('\x0D\x0A')
});

serialPort.on("open", function () {
  console.log('open');

  serialPort.on('data', function(data) {
    console.log('>' + data);
  });

//  serialPort.write(new Buffer('4','ascii'), function(err, results) {
//    console.log('err ' + err);
//    console.log('results ' + results);
//  });
});
