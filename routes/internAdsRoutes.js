/**
 * @swagger
 * tags:
 *   name: InternAds
 *   description: Internship advertisement endpoints
 */

/**
 * @swagger
 * /api/intern-ads:
 *   get:
 *     summary: Get all internship ads
 *     tags: [InternAds]
 *     responses:
 *       200:
 *         description: amjilttai
 *       500:
 *         description: serveriin aldaa
 * 
 */

/**
 * @swagger
 * /api/intern-ads:
 *   post:
 *     summary: Add a new internship ad
 *     tags: [InternAds]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - position
 *               - experience
 *               - salary
 *               - duration
 *             properties:
 *               position:
 *                 type: string
 *               experience:
 *                 type: string
 *               salary:
 *                 type: string
 *               duration:
 *                 type: string
 *     responses:
 *       201:
 *         description: IAmjilttai
 *       400:
 *         description: Medeelel dutuu
 *       500:
 *         description: serveriin aldaa
 * 
 */

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
