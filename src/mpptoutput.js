'use strict'

import { Gpio } from 'onoff';
import LCD from 'lcdi2c';
import moment from 'moment-timezone';

class MPPTOutput{
    constructor() {
        this.lcd = new LCD( 1, 0x3f, 20, 4 );
        this.led = new Gpio(23, 'out')
    }

    splash()
    {
        this.lcd.clear();
        this.lcd.on();
        this.lcd.println('MPPT 75/115', 1)
        this.lcd.println('Panel Monitor', 2)
    }

    flashProcessing() {
        this.processing(true); 
        setTimeout(() => this.processing(false), 10);
    }

    processing(on)
    {
        this.led.writeSync(on ? 1 : 0);
    }

    showData(data){
        this.lcd.clear();
        let dt = new Date();
        this.lcd.println(`${moment(dt).format('DD-MM-YY')} ${dt.toLocaleTimeString()}`, 1);
        this.lcd.println(`Batt: ${(data.V*0.001).toFixed(2)}V, ${data.I}mA`, 2);
        this.lcd.println(`Panel: ${(data.VPV*0.001).toFixed(2)}V, ${data.PPV}W`, 3);
        this.lcd.println(`Load: ${(data.IL*0.001).toFixed(2)}mA [${data.LOAD}]`, 4);
    }
}

export default MPPTOutput;