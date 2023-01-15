const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f8c337cedd66783d38dbe4576b3fdc46&units=metric`;

  request({ url, json: true }, (error, { body }={}) => {
    if (error) {
      callback("Unable to connect fore cast server!", undefined);
    } else if (body.message) {
      callback("Unable to find forecast please try again!", undefined);
    } else {
      callback(undefined, {
        weather: body.weather[0].description,
        temperature: body.main.temp,
      });
    }
  });
};

module.exports = forecast;
