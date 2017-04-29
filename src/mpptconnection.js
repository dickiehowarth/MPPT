'use strict';

import SerialPort from 'serialport';

import MPPTDataProcessor from './mpptdataprocessor';
import MPPTOutput from './mpptoutput';

class MPPTConnection { 
  constructor () {

    this.mpptOutput = new MPPTOutput();
    this.mpptOutput.splash(); 

    this.portName = '/dev/ttyS0';
    this.port = new SerialPort(this.portName, {
      baudrate: 19200,
      parser: SerialPort.parsers.readline('\x0D\x0A')
    })

    this.mpptDataProcessor = new MPPTDataProcessor(
      (data) => {
        this.mpptOutput.flashProcessing(); 
        this.mpptOutput.showData(data); 
      });
  }
  
  connect() {
     this.port.on('data', this.onSerialData.bind(this));
    
    this.port.on('error', function(err) {
      console.log(err);
    });
  }

  onSerialData(data) {
    this.mpptDataProcessor.dataIn(data);
  }
};

export default MPPTConnection