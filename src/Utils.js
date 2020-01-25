const chalk = require('../node_modules/chalk')
const request = require('../../WeatherApp/node_modules/request')
//get longtitude and latitude for provided address
const geoCode = (address, callback) => {
  const gurl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidGl0aWVuMTA0IiwiYSI6ImNrNW9uejd5djBwZmUzZHFodW51Y2xyYzMifQ.HRndMV-py5o-hHkmlavFbQ&limit=2";
  request({ url: gurl, json: true }, (error, response) => {
    if (error) {
      console.log(chalk.red("Can not connect to map service"));
      return callback(error);
    } else if (!response.body.features) {
      console.log(chalk.red("Can not locate your location!"));
      return callback(error);
    } else {
        const long = response.body.features[0].center[0]; //api from mapbox
        const lat = response.body.features[0].center[1];
        return callback(error, { long, lat});
    }
  });
};

const getWeather = (data, callback) => {
  const url =
    "https://api.darksky.net/forecast/1120d2811d0a31c7829b0832f89d75ba/" +
    encodeURIComponent(data) +
    "?lang=en&units=auto";
  request({ url: url, json: true }, (error, response) => {
    //since we set json to true, respose will return JSON object
    //const data = JSON.parse(response.body)
    //console.log('data from getWeather function call: ' + data)
    if (error) {
      console.log(chalk.red("Can not connect to weather service!"));
      return callback(error);
    } else if (response.body.error) {
      console.log(chalk.red(response.body.error));
      callback(error);
    } else {
      const currently = response.body.currently;
      const daily = response.body.daily.data[0];
      return callback(error, { daily, currently });
      // console.log(
      // chalk.yellow("Today forcast summary: ") + daily.data[0].summary)
      // console.log(chalk.yellow("Current Temperature: ") + currently.temperature)
      // console.log(chalk.yellow("Chance of rain: ") + currently.precipProbability)
    }
  });
};
module.exports = {
    geoCode,
    getWeather
}