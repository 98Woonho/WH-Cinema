const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.post('/', (req, res) => {
    console.log('결제중');
})


module.exports = router;