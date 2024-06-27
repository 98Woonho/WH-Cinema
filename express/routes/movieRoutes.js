const express = require('express');
const router = express.Router();
const db = require('../config/db.js');


router.get('/', (req, res) => {
    const { title, screeningFlag, sort } = req.query;
    let query = 'SELECT * FROM movie';

    if (title) {
        query += ` WHERE title = '${title}'`;
    }

    if (screeningFlag) {
        query += ` WHERE screening_flag = '${screeningFlag}'`;
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
    const { screeningFlag } = req.query;

    const query = `SELECT * FROM movie WHERE screening_flag = '${screeningFlag}' ORDER BY vote_average DESC LIMIT 5`

    db.query(query, (err, data) => {
        if (err) {
            res.send(err);
        }

        res.send(data);
    })
});

module.exports = router;