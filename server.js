// import express module
const express = require('express');
// create Express object
const app = express();

const things = require("./routes/things");

//middleware to handleallincoming and convert it to actual objects 
//app.use(express.json());
app.use("/things", things);
//use the things.js file to handle endpoints 
//that starts with /things

//define port
const port = process.env.PORT || 5050;

// app
//     .route("/things/cars")
//     .get((req, res) => { })
//     .post((req, res) => { });

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})