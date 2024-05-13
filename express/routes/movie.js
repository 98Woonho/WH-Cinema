const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.get('/', (req, res) => {
    db.query(`select * from movie`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

router.get('/:title', (req, res) => {
    const title = req.params.title;
    db.query(`select * from movie where title = '${title}'`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

router.get('/:date1/:date2', (req, res) => {
    const date1 = req.params.date1;
    const date2 = req.params.date2;
    db.query(`select * from movie where releasedate <= '${date1}' AND releasedate >= '${date2}'`, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            res.send(err);
        }
    })
});

module.exports = router;