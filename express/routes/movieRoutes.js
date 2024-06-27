const express = require('express');
const router = express.Router();
const db = require('../config/db.js');


router.get('/', (req, res) => {
    db.query(`SELECT * FROM movie`, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.send(data);
    })
});

router.get('/:title', (req, res) => {
    const title = req.params.title;
    db.query(`SELECT * FROM movie WHERE title = '${title}'`, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.send(data);
    })
});

router.get('/:date1/:date2', (req, res) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;
    db.query(`SELECT * FROM movie WHERE release_date <= '${date1}' AND release_date >= '${date2}'`, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.send(data);
    })
});

router.get('/topRate', (req, res) => {
    console.log('hi');
});

module.exports = router;