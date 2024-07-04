const express = require('express');
const router = express.Router();
const db = require('../config/db.js');


router.get('/', (req, res) => {
    const { title, isScreening, sort, date } = req.query;

    let query = 'SELECT * FROM movie';

    if (title) {
        query += ` WHERE title = '${title}'`;
    }

    if (isScreening === 'true' && date) {
        query += ` WHERE release_date <= '${date}'`;
    }

    if (isScreening === 'false' && date) {
        query += ` WHERE release_date > '${date}'`;
    }

    if (sort === '평점순') {
        query += ' ORDER BY vote_average DESC';
    }
    
    if (sort === '개봉일순(오름차순)') {
        query += ' ORDER BY release_date ASC';
    }

    if (sort === '개봉일순(내림차순)') {
        query += ' ORDER BY release_date DESC';
    }


    db.query(query, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.send(data);
    });
});

router.get('/topRate', (req, res) => {
    const { date, isScreening } = req.query;

    let query = 'SELECT * FROM movie';

    if (isScreening === 'true' && date) {
        query += ` WHERE release_date <= '${date}' ORDER BY vote_average DESC LIMIT 5`;
    }

    if (isScreening === 'false' && date) {
        query += ` WHERE release_date > '${date}' ORDER BY vote_average DESC LIMIT 5`;
    }

    db.query(query, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.send(data);
    })
});

module.exports = router;