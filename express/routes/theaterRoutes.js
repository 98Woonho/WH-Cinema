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

module.exports = router;