const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.get('/', (req, res) => {
    db.query(`select * from theater`, (err, data) => {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(500).send(err);
        }
    })
})

router.get('/screenInfo/:title/:date/:theaterName', (req, res) => {
    const title = req.params.title;
    const date = req.params.date;
    const theaterName = req.params.theaterName;
    db.query(`SELECT si.time AS time,
                     si.date AS date,
                     si.movie_title AS title,
                     sh.name AS screen_hall_name,
                     sh.theater_name AS theater_name,
                     sh.seat_count AS seat_count
              FROM screen_info si
              JOIN screen_hall sh ON sh.id = si.screen_hall_id
              WHERE si.movie_title = '${title}' AND si.date = '${date}' AND sh.theater_name = '${theaterName}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(500).send(err);
        }
    })
})

module.exports = router;