const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");

const app = express();
const port = process.env.PORT || 3000;
//Define paths for Expressjs Config
const publicUrlPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup Handlebar engine
app.set("view engine", "hbs");

//Setup handlebars partials location
hbs.registerPartials(partialsPath);

//Setup 'views' location
app.set("views", viewPath);

//Setup static directory to serve
app.use(express.static(publicUrlPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home page",
    heading: "Welcome to the Home page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    heading: "About Page !!",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    heading: "Help Page !!",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "contact",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.search) {
    return res.send({
      title: "Weather",
      message: "",
      error: "Please provide a search query to get the weather information!",
    });
  }
  const searchQuery = req.query.search;
  geoCode(searchQuery, (error, { locationName, latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        title: "Weather",
        message: "",
        error: error,
      });
    }
    forecast(
      latitude,
      longitude,
      (error, { weather_descriptions, temperature, feelsLike } = {}) => {
        if (error) {
          return res.send({
            title: "Weather",
            error: error,
          });
        }
        const message = `Its ${weather_descriptions} now with a temperature of ${temperature} degrees F and it feels like ${feelsLike} degrees F. at ${locationName}`;
        res.send({
          title: "Weather",
          locationName: locationName,
          message: message,
          temperature: temperature,
          weather_descriptions: weather_descriptions,
          feelsLike: feelsLike,
        });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port} !`);
});
