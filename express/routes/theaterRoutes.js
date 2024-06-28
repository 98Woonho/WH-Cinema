const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.get('/', (req, res) => {
    db.query(`SELECT * FROM theater`, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send(data);
    })
})

router.get('/screenInfo', (req, res) => {
    const { title, date, theaterName } = req.query;
    db.query(`SELECT si.time AS time,
                     si.date AS date,
                     si.movie_title AS title,
                     sh.name AS screen_hall_name,
                     sh.theater_name AS theater_name,
                     sh.seat_count AS seat_count
              FROM screen_info si
              JOIN screen_hall sh ON sh.id = si.screen_hall_id
              WHERE si.movie_title = '${title}' AND si.date = '${date}' AND sh.theater_name = '${theaterName}'
              ORDER BY sh.name ASC`, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send(data);
    })
})

router.get('/screenHall/:name/:theaterName/', (req, res) => {
    const { name, theaterName } = req.params;
    db.query(`SELECT adult_cost, youth_cost
              FROM screen_hall
              WHERE name = '${name}' AND theater_name = '${theaterName}'`, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }

        res.status(200).send(data);
    })
})

module.exports = router;