const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM intern_ads');
        res.json(result.rows);
    } catch (err) {
        console.error("intern_ads tatahad aldaa garlaa:", err);
        res.status(500).json({ error: "intern_ads husnegt tatahad aldaa garlaa" });
    }
});

module.exports = router;
