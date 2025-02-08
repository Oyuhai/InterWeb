const express = require("express");
const path = require("path");
const app = express();
const pool = require('./db');

app.use(express.json());

app.use('/css', express.static(path.join(__dirname, 'pages', 'css')));
app.use('/frontJS', express.static(path.join(__dirname, 'frontJS')));
app.use('/pics', express.static(path.join(__dirname, 'pics')));
app.use(express.static(path.join(__dirname)));
const internAdsRoutes = require('./routes/internAdsRoutes');;

const PORT = process.env.PORT || 4000;
app.use('/api/intern-ads', internAdsRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "home.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "home.html"));
});

app.get("/signInStud", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "signInStud.html"));
});

app.get("/signInHR", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "signInHR.html"));
});

app.get("/studprofile", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "studprofile.html"));
});

app.get("/HRprofile", (req, res) => {
    res.sendFile(path.join(__dirname, "pages", "HRprofile.html"));
});

app.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "componentTest", "list.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


