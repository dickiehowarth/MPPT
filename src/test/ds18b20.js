const sensor = require('ds18b20-raspi');

const tempC = sensor.readSimpleC();
console.log(`${tempC} degC`);

// round temperature reading to 1 digit
const tempC1 = sensor.readSimpleC(1);
console.log(`${tempC1} degC`);


// async version
sensor.readSimpleC((err, temp) => {
	if (err) {
		console.log(err);
	} else {
	console.log(`${temp} degC`);
	}
});

// round temperature reading to 1 digit
sensor.readSimpleC(1, (err, temp) => {
	if (err) {
		console.log(err);
	} else {
	console.log(`${temp} degC`);
	}
});