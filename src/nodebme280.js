var BME280 = require('node-bme280');
 
var barometer = new BME280({address: 0x76});
 
barometer.begin(function(err) {
    if (err) {
        console.info('error initializing barometer', err);
        return;
    }
 
    console.info('barometer running');
 
    setInterval(function() {
        barometer.readPressureAndTemparature(function(err, pressure, temperature, humidity) {
            console.info(
                'temp:',
                temperature.toFixed(2),
                '℃  pressure:',
                (pressure / 100).toFixed(2),
                'hPa  hum:',
                humidity.toFixed(2),
                '%'
            );
        });
    }, 1000);
});