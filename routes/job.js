const express = require("express");
const router = express.Router();
const pool = require("../zar-api/db");

// 🔹 1. Зар нэмэх (POST)
router.post("/", async (req, res) => {
    try {
        const { position, experience, salary, benefits, duration, image_url } = req.body;
        const newJob = await pool.query(
            "INSERT INTO jobs (position, experience, salary, benefits, duration, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [position, experience, salary, benefits, duration, image_url]
        );
        res.status(201).json(newJob.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 2. Бүх зар авах (GET)
router.get("/", async (req, res) => {
    try {
        const jobs = await pool.query("SELECT * FROM jobs");
        res.json(jobs.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 3. Нэг зар авах (GET /:id)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const job = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
        if (job.rows.length === 0) {
            return res.status(404).json({ message: "Зар олдсонгүй" });
        }
        res.json(job.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
