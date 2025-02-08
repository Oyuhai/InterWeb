const express = require("express");
const path = require("path");
const { Pool } = require('pg');
const pool = require('../db');


const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use('/css', express.static(path.join(__dirname, 'pages', 'css')));
app.use('/frontJS', express.static(path.join(__dirname, 'frontJS')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use(express.static(path.join(__dirname)));

// huudsuudiin zam
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "pages", "home.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "pages", "home.html")));
app.get("/signInStud", (req, res) => res.sendFile(path.join(__dirname, "pages", "signInStud.html")));
app.get("/signInHR", (req, res) => { res.sendFile(path.join(__dirname, "pages", "signInHR.html")); });
app.get("/studprofile", (req, res) => { res.sendFile(path.join(__dirname, "pages", "studprofile.html")); });
app.get("/HRprofile", (req, res) => { res.sendFile(path.join(__dirname, "pages", "HRprofile.html")); });
app.get("/list", (req, res) => { res.sendFile(path.join(__dirname, "componentTest", "list.html")); });

const internAdsRoutes = require('./routes/internAdsRoutes');;
app.use('/api/intern-ads', internAdsRoutes);

// Zar nemeh
app.post("/api/zaruud", async (req, res) => {
    try {
        console.log("Ирсэн өгөгдөл:", req.body);

        const { position, experience, salary, benefit, duration } = req.body;
        if (!position || !experience || !salary) {
            return res.status(400).json({ message: "Бүх талбарыг бөглөнө үү!" });
        }

        // Postgre ruu hadgalah
        const result = await pool.query(
            "INSERT INTO zaruud (position, experience, salary, duration) VALUES ($1, $2, $3, $4) RETURNING *",
            [position, experience, salary, duration]
        );
        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Серверийн алдаа:", error.stack);
        res.status(500).json({ message: "Серверийн алдаа" });
    }
});


app.listen(PORT, () => console.log(`🔥 Сервер ${PORT} порт дээр ажиллаж байна!`));
