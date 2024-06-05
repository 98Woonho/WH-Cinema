const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.post('/', (req, res) => {
    const { impUid, merchantUid, payMethod, name, paidAmount, status, ticketingId } = req.body;

    db.query(`SELECT * FROM `)
})


module.exports = router;