const express = require("express");
let router = express.Router();

//put middleware in router object
//every request that comes in
//that goes through this router
//this middleware is applied only
//to requests that get hendled by this file
//not ones that are handled by app.js
router.use(function (req, res, next) {
    console.log(req.url, "@", Date.now());
    next();
});

router
    // .route("/things/cars")
    //you dont need to include things because it is defined in app.use in server.js
    .route("/cars")
    .get((req, res) => {
        // things/cars
        res.send("hi get things/card");
    })
    .post((req, res) => {
        res.send("hi post things/card");
    });

router
    // .route("/things/cars/:carid")
    .route("/cars/:carid")
    .get((req, res) => {
        res.send("hi get things/cars/" + req.params.carid);
    })
    .post((req, res) => {
        res.send("hi post things/cars/" + req.params.carid);
    });


module.exports = router;