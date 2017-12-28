'use strict';

import SerialPort from 'serialport';

class MPPTConnection { 
  constructor (callback) {

    if (typeof callback !== 'function')
      throw 'invalid callback';

    this.callback = callback;
    this.portName = '/dev/ttyS0';
    this.port = new SerialPort(this.portName, {
      baudrate: 19200,
      parser: SerialPort.parsers.readline('\x0D\x0A')
    })
  }
  
  connect() {
     this.port.on('data', this.onSerialData.bind(this));
    
    this.port.on('error', function(err) {
      console.log(err);
    });
  }

  onSerialData(data) {
    this.callback(data);
  }
};

export default MPPTConnection