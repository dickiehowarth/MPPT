'use strict';

import MPPTConnection from './mpptconnection';
import MPPTDataProcessor from './mpptdataprocessor';
import BaseNode from './../basenode'; 

class MPPTNode extends BaseNode
{
  constructor(name) {
    super(
      {
        name: name ? name : 'MPPT75115',
        nodeType: 2
      });

    this.pulseInterval = 5000;
    this.dataEnabled = false;

    this.mpptDataProcessor = new MPPTDataProcessor(
      (data) => {

        this.doCallback({
            sensorData: data
        })
      });

     this.cnx = new MPPTConnection(
        (data) =>
        {   
            this.mpptDataProcessor.dataIn(data);
        });
  }

  readData()
  {
    this.doCallback(
    { 
        message: 'initialization succeeded'
    });

    this.cnx.connect();
  }

};

export default MPPTNode

