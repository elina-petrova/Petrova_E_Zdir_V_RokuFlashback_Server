// database queries
const express = require('express');
const router = express.Router();
const connect = require("../config/sqlConfig");

router.get("/", (req, res) => {
    res.json({ message: "you hit the api route" });
})

router.get("/users", (req, res) => {
    connect.query(`SELECT * from tbl_user`, function (error, results, fields) {
        if (error) throw error;
        console.log('results: ', results, "fields: ", fields);
        res.json(results);
    })
})

router.get("/movies", (req, res) => {
    connect.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM tbl_movies', function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });

})

router.get("/*movies*/:id/", (req, res) => {
    connect.query(`SELECT * from tbl_movies WHERE movies_id=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        console.log('results: ', results, "fields: ", fields);
        res.json(results);
    });
})

router.get("/tvs", (req, res) => {
    connect.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM tbl_tvs', function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });

})

router.get("/*tvs*/:id/", (req, res) => {
    connect.query(`SELECT * from tbl_tvs WHERE tv_id=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        console.log('results: ', results, "fields: ", fields);
        res.json(results);
    });
})

router.get("/music", (req, res) => {
    connect.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT * FROM tbl_music', function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });

})

router.get("/*music*/:id/", (req, res) => {
    connect.query(`SELECT * from tbl_music WHERE music_id=${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        console.log('results: ', results, "fields: ", fields);
        res.json(results);
    });
})

module.exports = router;