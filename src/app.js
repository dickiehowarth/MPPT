'use strict';

import MPPTConnection from './nodes/MPPT75115/mpptconnection';
import MPPTDataProcessor from './nodes/MPPT75115/mpptdataprocessor';
import MPPTOutput from './mpptoutput';

let mpptOutput = new MPPTOutput();
mpptOutput.splash(); 

let mpptDataProcessor = new MPPTDataProcessor(
      (data) => {
        mpptOutput.flashProcessing(); 
        mpptOutput.showData(data); 
      });


const cnx = new MPPTConnection(
    (data) =>
    {   
        mpptDataProcessor.dataIn(data);
    });
cnx.connect();
