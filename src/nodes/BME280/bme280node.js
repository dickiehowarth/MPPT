'use strict'
import BaseNode from './../basenode'; 
import BME280 from 'bme280-sensor';

class BME280Node extends BaseNode
{
  constructor(name) {
    super(
      {
        name: name ? name : 'BME280',
        nodeType: 1
      });

    this.pulseInterval = 5000;
    this.dataEnabled = false;

    // The BME280 constructor options are optional.
    const options = {
      i2cBusNo   : 1, // defaults to 1
      i2cAddress : 0x76//BME280.I2C_ADDRESS_B
    };
    this.bme280 = new BME280(options);
  }

  readData()
  {
    // Allow requires initialization Read  
    this.bme280.init()
      .then(() => {
        this.doCallback(
          { 
            message: 'initialization succeeded'
          });
         
         this.readSensorData();
      })
      .catch((err) => 
        {
          this.dataEnabled = false;

          this.doCallback(
            { 
              message: `initialization failed: ${err}`
            });
      });
  }

  // Read BME280 sensor data, repeat
  readSensorData()
  {
    this.bme280.readSensorData()
      .then((data) => {
        // temperature_C, pressure_hPa, and humidity are returned by default.
        // I'll also calculate some unit conversions for display purposes.
        //
        data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
        data.pressure_inHg = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);

        this.doCallback(
          { 
            sensorData: data 
          });
        
        if (this.dataEnabled)
          setTimeout(this.readSensorData.bind(this), this.pulseInterval);
      })
      .catch((err) => {
          
          this.doCallback(
            { 
              message: `BME280 read error: ${err}`
            });

        if (this.dataEnabled)
          setTimeout(this.readSensorData.bind(this), this.pulseInterval);
      });
    }
};

export default BME280Node