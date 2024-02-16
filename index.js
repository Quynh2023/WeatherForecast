//----------------Setup--------------------------------

//import express, body-parser and axios
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

//using app express
const app = express();
const port = 3000;

//use the static public file, use body-parser
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//----------Display Date for Today-------------------------

/*create variable today for display*/
// Create a new Date object
var date = new Date();

// Define arrays for days and months
var daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Get the day of the week and month as numbers
var dayOfWeekNumber = date.getDay();
var monthNumber = date.getMonth();

// Get the day of the month
var dayOfMonth = date.getDate();

// Get the year
var year = date.getFullYear();

// Get the day of the week and month as strings
var dayOfWeek = daysOfWeek[dayOfWeekNumber];
var month = months[monthNumber];

// Create the desired date string
var today = dayOfWeek + ", " + month + " " + dayOfMonth + ", " + year;

//-------------Run the app-----------------------------
app.get("/", (req, res) => {
  res.render("index.ejs", { today });
});

//-----------Handling post request using Axios----------
app.post("/weather", async (req, res) => {
  try {
    const city = req.body.city;
    const myAPIKey = "ae2354617fec52097d418bd8742a5e60";
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}`);
    res.render("index.ejs", { today, data: result.data });
  } catch (error) {
    res.status(404).send("City is undefined in the request body.");
  }
});

//----------check app running---------------------------
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
