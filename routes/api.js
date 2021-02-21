//main routes live in this file 

// we pass in parametres and can run sql query

const express = require('express');
const router = express.Router();

//every thime you make a route the server
router.get("/", (req, res) => {
    // res.json = echo json_encode(...) in PHP 
    res.json({ message: "you hit the api route" });
})
//send back json encode
//the page will show the message
// it is like doing echo in php
router.get("/users", (req, res,) => {
    // run a SQL query here
    // res.json(query result here)

    // you can run sql query here
    res.json({ message: "all users route" });
})

module.exports = router;