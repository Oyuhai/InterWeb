const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require('pg'); // PostgreSQL санг импортлох

const app = express();
const PORT = process.env.PORT || 4000;

// PostgreSQL холбол

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "webintern",
    password: "22B1NUM2341",
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;


app.use(cors());
app.use(express.json());

// Static файлуудыг серверлэх
app.use('/css', express.static(path.join(__dirname, 'pages', 'css')));
app.use('/frontJS', express.static(path.join(__dirname, 'frontJS')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use(express.static(path.join(__dirname)));

// 🏠 Хуудасны маршрутууд
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "pages", "home.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "pages", "home.html")));
app.get("/signInStud", (req, res) => res.sendFile(path.join(__dirname, "pages", "signInStud.html")));
app.get("/list", (req, res) => res.sendFile(path.join(__dirname, "component", "list.html")));

// 📌 **Зар нэмэх API**
app.post("/api/zaruud", async (req, res) => {
    try {
        console.log("Ирсэн өгөгдөл:", req.body);

        const { position, experience, salary, benefit, duration } = req.body;
        if (!position || !experience || !salary) {
            return res.status(400).json({ message: "Бүх талбарыг бөглөнө үү!" });
        }

        // PostgreSQL руу хадгалах
        const result = await pool.query(
            "INSERT INTO zaruud (position, experience, salary, benefit, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [position, experience, salary, benefit, duration]
        );
        res.status(201).json(result.rows[0]); // Амжилттай хадгалсан өгөгдөл

    } catch (error) {
        console.error("Серверийн алдаа:", error.stack);
        res.status(500).json({ message: "Серверийн алдаа" });
    }
});

// Сервер эхлүүлэх
app.listen(PORT, () => console.log(`🔥 Сервер ${PORT} порт дээр ажиллаж байна!`));
