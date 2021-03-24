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
        connection.query(`SELECT DISTINCT m.*, GROUP_CONCAT(DISTINCT g.genre_name) as genre_name, GROUP_CONCAT( DISTINCT c.cast_name) as cast_name, GROUP_CONCAT(DISTINCT d.director_name) as director_name, GROUP_CONCAT(DISTINCT country.country_name) as country_name FROM tbl_movies m LEFT JOIN tbl_mov_genre link ON link.movies_id=m.movies_id LEFT JOIN tbl_genre g ON link.genre_id = g.genre_id LEFT JOIN tbl_mov_cast cast ON cast.movies_id=m.movies_id LEFT JOIN tbl_cast c ON cast.cast_id=c.cast_id LEFT JOIN tbl_mov_director dir ON dir.movies_id=m.movies_id LEFT JOIN tbl_director d ON dir.director_id=d.director_id LEFT JOIN tbl_mov_country country_link ON country_link.movies_id=m.movies_id LEFT JOIN tbl_country country ON country_link.country_id=country.country_id GROUP BY m.movies_id`, function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });

})

// router.get("/*movies*/:id/", (req, res) => {
//     connect.query(`SELECT * from tbl_movies WHERE movies_id=${req.params.id}`, function (error, results, fields) {
//         if (error) throw error;
//         console.log('results: ', results, "fields: ", fields);
//         res.json(results);
//     });
// })

router.get("/*movies*/:id/", (req, res) => {
    connect.query(`SELECT DISTINCT m.*, GROUP_CONCAT(DISTINCT g.genre_name) as genre_name, GROUP_CONCAT( DISTINCT c.cast_name) as cast_name, GROUP_CONCAT(DISTINCT d.director_name) as director_name, GROUP_CONCAT(DISTINCT country.country_name) as country_name FROM tbl_movies m LEFT JOIN tbl_mov_genre link ON link.movies_id=m.movies_id LEFT JOIN tbl_genre g ON link.genre_id = g.genre_id LEFT JOIN tbl_mov_cast cast ON cast.movies_id=m.movies_id LEFT JOIN tbl_cast c ON cast.cast_id=c.cast_id LEFT JOIN tbl_mov_director dir ON dir.movies_id=m.movies_id LEFT JOIN tbl_director d ON dir.director_id=d.director_id LEFT JOIN tbl_mov_country country_link ON country_link.movies_id=m.movies_id LEFT JOIN tbl_country country ON country_link.country_id=country.country_id WHERE m.movies_id=${req.params.id}`,
        function (error, results, fields) {
            if (error) throw error;
            console.log('results: ', results, "fields: ", fields);
            res.json(results);
        });
})


router.get("/tvs", (req, res) => {
    connect.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query('SELECT t.*, GROUP_CONCAT(g.genre_name) as genre_name FROM tbl_tvs t NATURAL LEFT JOIN tbl_genre g NATURAL JOIN tbl_tvs_genre GROUP BY t.tv_id', function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
    });

})

router.get("/tvs/:id/", (req, res) => {
    connect.query(`SELECT t.*, GROUP_CONCAT(g.genre_name) as genre_name, GROUP_CONCAT(DISTINCT d.director_name) as director_name, GROUP_CONCAT(DISTINCT c.country_name) as country_name FROM tbl_tvs t NATURAL LEFT JOIN tbl_genre g NATURAL JOIN tbl_tvs_genre LEFT JOIN  tbl_tvs_director link ON link.tv_id = t.tv_id LEFT JOIN tbl_director d ON link.director_id = d.director_id LEFT JOIN tbl_tvs_country link_country ON link_country.tv_id = t.tv_id LEFT JOIN tbl_country c ON link_country.country_id = c.country_id WHERE t.tv_id=${req.params.id} `, function (error, results, fields) {
        if (error) throw error;
        console.log('results: ', results, "fields: ", fields);
        res.json(results);
    });
})
router.get("/tvs/seasons/:id", (req, res) => {
    connect.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM tbl_${req.params.id}_seasons`, function (error, results) {
            connection.release();
            if (error) throw error;
            res.json(results);
        });
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