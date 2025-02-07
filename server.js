const express = require("express");
const path = require("path");
const app = express();

app.use('/css', express.static(path.join(__dirname, 'pages', 'css')));
app.use('/frontJS', express.static(path.join(__dirname, 'frontJS')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "home.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "home.html"));
});

app.get("/signInStud", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "signInStud.html"));
});

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "component", "list.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const cors = require("cors");
// const pool = require("./db"); // PostgreSQL-тэй холболт
// const jobRoutes = require("./routes/job");
// const swaggerUi = require("swagger-ui-express");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/jobs", jobRoutes);

// // Зар оруулах API
// app.post('/api/zaruud', async (req, res) => {
//     try {
//         console.log("Хүлээн авсан өгөгдөл:", req.body); // 📌 Debugging

//         const { position, experience, salary, benefit, duration } = req.body;
//         if (!position || !experience || !salary) {
//             return res.status(400).json({ message: 'Бүх талбарыг бөглөнө үү!' });
//         }

//         const result = await pool.query(
//             'INSERT INTO zaruud (position, experience, salary, benefit, duration) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//             [position, experience, salary, benefit, duration]
//         );

//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error("Серверийн алдаа:", error.stack); // Алдааны дэлгэрэнгүй мэдээлэл
//         res.status(500).json({ message: 'Серверийн алдаа' });
//     }
    
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

