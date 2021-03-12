//this file is solely for communicating with the database
const express = require('express');
const app = express();

const port = process.env.PORT || 5050;

app.use((req, res, next) => {
    console.log('incoming request');
    next();
})

app.use("/api", require("./routes/api"))


app.listen(port, () => {
    console.log(`server is running on ${port}`);
})