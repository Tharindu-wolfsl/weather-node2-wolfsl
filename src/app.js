const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define custom paths

//root path for curretn directory
// console.log(__dirname);
//root path for current file
// console.log(__filename);
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPaths = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebars and view engine
app.set("view engine", "hbs");
app.set("views", viewsPaths);
hbs.registerPartials(partialPath);

//Define parent directory for static web pages
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("weather", {
    title: "Weather",
    name: "Tharindu",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { name: "Tharindu", age: 26, title: "About" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is help page!",
    name: "Tharindu",
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Yoy have to Provide Address First",
    });
  }
  geocode(req.query.address, (error, { longitude, latitude, location }={}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(longitude, latitude, (error, { weather, temperature }={}) => {
      if (error) {
        return res.send({
          error: error,
        });
      }

      res.send({
        location: location,
        weather: weather,
        temperature: temperature,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      Error: "Yoy have to Provide Search Term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    message: "Help Articale Not found!",
    name: "Tharindu",
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    message: "404 Error page not found!",
    name: "Tharindu",
  });
});
app.listen(3000, () => {
  console.log("Server run on port 3000");
});
