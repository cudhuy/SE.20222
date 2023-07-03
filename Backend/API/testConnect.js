
const express = require('express')
const router = express.Router();
const { pool } = require('../database/dbinfo')

/* Get data */

/* define api get, post, patch, put, delete */

router.get('/', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request().query("select * from Users")
        const test = result.recordset;
        res.json(test);
        console.log(test);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;