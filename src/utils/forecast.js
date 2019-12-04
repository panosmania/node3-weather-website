request = require("request");

//με destructuring video 39-40 εχει παραδειγμα
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/99ac28cbe7e583e5821fef9f8fff8ec5/" +
    latitude +
    "," +
    longitude +
    "?units=si&lang=el";

  //request({ url: url, json: true }, (error, response) => {
  request({ url, json: true }, (error, { body }) => {
    //console.log(response);

    if (error) {
      callback("unable to connect to weather service", undefined);
      //} else if (response.body.error) {
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary + //response.body.daily.data[0].summary +
        " it is currently " +
        body.currently.temperature + //response.body.currently.temperature +
        " celcius out. there is a " +
        body.currently.precipProbability + //response.body.currently.precipProbability +
          "% chance of rain"
      );
    }
  });
};

module.exports = forecast;
