var serialPort = require('serialport'); 
var Serialport = serialPort.SerialPort;
 
var i = 0;
Serialport.list(function (err, ports) {
    ports.forEach(function (port)
    {
	console.log(i++);
	console.log(port);
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
    });
});



