'use strict'

import axios from 'axios';
import moment from 'moment-timezone';

class MPPTDataProcessor{
    constructor(dataOut) {
        this.Data = [];
        this.count = 0;
        this.readingRecord = false;
        this.count = 0;
        this.DataOutCallback = dataOut;
    }
    
    dataIn(data){
        if (data.startsWith("PID\t"))
        {
            this.readingRecord = true;
            this.Data.length = 0;
        }

        if (this.readingRecord)
        {
            this.Data.push(data);

            if (data.startsWith("Checksum\t"))
            {
                this.readingRecord = false;
                this.dataOut();
            }
        }
    }

    dataOut()
    {
        let dataObj = {};

        for(let data of this.Data)
        {
            let d = data.split('\t');
            dataObj[d[0].replace('#', '')] = d[1];
        }

        this.count++;
        if (this.count%10 == 0)
        {
            let dt = new Date();
            console.log(`${moment(dt).format('DD-MM-YY')} ${dt.toLocaleTimeString()}`);
            console.log(dataObj);
            let cvtObj = this.convertData(dataObj);
            console.log(cvtObj);   

            if (typeof this.DataOutCallback === "function") 
            {
                this.DataOutCallback(dataObj);   
            }
        }

        if (this.count%120 == 0)
        {
            let baseUri = 'http://mpptapp.azurewebsites.net'
            // Post to 
            axios.post(`${baseUri}/api/mppt/log`, dataObj)
            .then(function (response) {
                console.log(`Status: ${response.status} ${response.statusText}`);
            })
            .catch(function (response) {
                console.log(response);
            });
        }
    }

    convertData(data)
    {
        let j =
        {
            ChargeState: ChargeState[data.CS],
            ErrorCode: ErrorCode[data.ERR]
        };

        return j;
    }

}

const ChargeState = { 
    0: 'Off',
    2: 'Fault',
    3: 'Bulk',
    4: 'Absorbtion',
    5: 'Float'
};

const ErrorCode = { 
    0: 'No Error',
    2: 'Battery voltage too high',
    17: 'Charger temperature too high',
    18: 'Charger over current',
    19: 'Charger current reversed',
    20: 'Bulk time limit exceeded',
    21: 'Current sensor issue',
    26: 'Terminals overheated',
    33: 'Input voltage too high (Panel)',
    34: 'Input current too high (Panel)',
    38: 'Input shutdown due to excessive battery voltage',
    116: 'Factory calibration data lost',
    117: 'invalid/incompatible firmware',
    119: 'User settings invalid'
};

export default MPPTDataProcessor;