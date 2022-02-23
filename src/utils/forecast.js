const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const accessKey = "436e963cad2bd2bab69dd7c01d9eb252";
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}&units=f`;

  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      customError = `Unable to process the request at this time, please check your internet connection and try again.`;
      callback(customError, undefined);
    } else if (body.error) {
      customError = `Unable to fetch weather data for the requested location. Please try with a different location.`;
      callback(customError, undefined);
    } else {
      data = {
        weather_descriptions: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelsLike: body.current.feelslike,
      };
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
