// import express module
const express = require('express');
// create Express object
const app = express();

//define port
const port = process.env.PORT || 5050;

// specify middleware as the callback function 
// make the middleware functon inside app.use,
// no outside like var myLooger = function
//(req res next){... next()}

// runs when reload the page because
// reloading = request
app.use((req, res, next) => {
    console.log('incoming request');
    console.log(process.env.PORT);
    console.log(process.env.NAME);

    //call next() to control to the next callback
    //it is  gonna be the secon callback

    //just go down to other code
    next();
})

app.use("/api", require("./routes/api"))

//listen for connections on this port
// conncetion happens once
app.listen(port, () => {
    console.log(`server is running on ${port}`);
})