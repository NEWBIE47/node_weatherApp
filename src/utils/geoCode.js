const request = require("request");

const geoCode = (searchQuery, callback) => {
  const accessToken =
    "pk.eyJ1IjoibXZpc2hudTkxMSIsImEiOiJja3pxbnFsc2UwY2ZwMndtdXpteHl3OTZ3In0.TiiYhg80edKa9Bwge-Rt9A";
  const geoCodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    searchQuery
  )}.json?access_token=${accessToken}&limit=1`;
  request({ url: geoCodeUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      const errorMessage = `Unable to process the request at this time, please check your internet connection and try again.`;
      callback(errorMessage, undefined);
    } else if (body.message) {
      const errorMessage = `Could not find any results for : "${searchText}" `;
      callback(errorMessage, undefined);
    } else if (body.features.length === 0) {
      const errorMessage = `Invalid search term !`;
      callback(errorMessage, undefined);
    } else {
      data = {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        locationName: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

module.exports = geoCode;
