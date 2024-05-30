const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.get('/:title/:theaterName/:screenHallName/:time', (req, res) => {
    const { title, theaterName, screenHallName, time } = req.params;

    db.query(`select seat from ticketing where movie_title='${title}' AND theater_name='${theaterName}' AND screen_hall_name='${screenHallName}' AND screen_time='${time}'`, (err, data) => {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(500).send(err);
        }
    })
})



module.exports = router;