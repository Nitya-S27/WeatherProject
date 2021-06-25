//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")    
});

app.post("/" , function (req , res) {

    const city = req.body.cityName
    const apiKey = "41285cd1aa00df0fb1666e51c6d0b8c6#"
    const unit = "metric"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ city +"&units="+ unit +"&appid="+ apiKey+"";


    https.get(url, function (response) {
      
    response.on("data", function (data) {

        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const latitude = weatherData.coord.lat;
        const longitude = weatherData.coord.lon;
        const windSpeed = weatherData.wind.speed;
        const weatherIcon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

        var options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          };
          var day = new Date();

        res.write("<h1>" + day.toLocaleDateString("en-US", options) + "</h1>"); 
        res.write("<h1>The temperature in "+ city+" is " + temp + " degree celcius </h1>");
        res.write("<h1>The weather is " + weatherDescription + " </h1>");
        res.write("<h2>Latitude= "+ latitude +" Longitude = "+longitude+" </h2>")
        res.write("<h2>Wind Speed = "+ windSpeed+" m/s</h2>")
        res.write("<img src = "+ imageURL +">")

        res.send();
    });
  });

})

app.listen(3000, function (req, res) {
    console.log("The server is linked to port 3000.");
});













































// //jshint esversion:6

// const express = require("express");

// const https = require("https");

// const app = express();

// app.get("/" , function (req , res) {

//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=41285cd1aa00df0fb1666e51c6d0b8c6#"
//     https.get(url , function (response) {
//         console.log(response.statusCode);

//         response.on("data" , function (data) {
//             const weatherData = JSON.parse(data);
//             console.log(weatherData);

//             const temp = weatherData.main.temp;
//             const weatherDescription = weatherData.weather[0].description;
//             const weatherIcon = weatherData.weather[0].icon;
//             const iconImage = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

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
