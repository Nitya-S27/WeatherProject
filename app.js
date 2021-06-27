//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
const date = require(__dirname + "/date.js")


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var city, apiKey ,unit, url, weatherData, imageURL , temperature , weatherIcon ,weatherDescription , latitude ,longitude ,windSpeed , pressure , humidity;

app.get("/", function (req, res) {
    let newDay = date.getDate();
    res.render("lists" , {
      dateAndDay: newDay ,
      imageSource:imageURL ,
      nameOfCity: city ,
      currentTemp: temperature  , 
      des: weatherDescription ,
      press: pressure +"hPa" , 
      hum: humidity + "%" ,
      lat: latitude ,
      long: longitude ,
      speed: windSpeed + "m/s" ,
    })
});

app.post("/" , function (req , res) {

    city = req.body.cityName
    apiKey = "41285cd1aa00df0fb1666e51c6d0b8c6#"
    unit = "metric"
    url ="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ unit +"&appid="+ apiKey+"";

    https.get(url, function (response) {      
    response.on("data", function (data) {

        weatherData = JSON.parse(data);
        temperature = weatherData.main.temp;
        weatherDescription = weatherData.weather[0].description;
        pressure = weatherData.main.pressure;
        humidity = weatherData.main.humidity;
        latitude = weatherData.coord.lat;
        longitude = weatherData.coord.lon;
        windSpeed = weatherData.wind.speed;
        weatherIcon = weatherData.weather[0].icon;
        imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

       res.redirect("/")
    });
  });

})

app.listen(3000, function (req, res) {
    console.log("The server is linked to port 3000.");
});













































// //jshint esversion:6

// var express = require("express");

// var https = require("https");

// var app = express();

// app.get("/" , function (req , res) {

//     var url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=41285cd1aa00df0fb1666e51c6d0b8c6#"
//     https.get(url , function (response) {
//         console.log(response.statusCode);

//         response.on("data" , function (data) {
//             var weatherData = JSON.parse(data);
//             console.log(weatherData);

//             var temp = weatherData.main.temp;
//             var weatherDescription = weatherData.weather[0].description;
//             var weatherIcon = weatherData.weather[0].icon;
//             var iconImage = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

//             // you can use res.write to write multiple res.send request and then call res.send at last

//             res.write("<h1>The temperature in Paris is " + temp + " degree celcius</h1>");
//             res.write("<h2>The weather in Paris is " + weatherDescription + "</h2>" )
//             res.write("<img src=" + iconImage + ">");

//             res.send();
//         })
//     })
// })

// app.listen(3000 , function () {
//     console.log("Server is linked to port 3000.");
// })
