const pool = require("../db");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password, address, jobTitle } = req.body;

        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ error: "Бүрэн бөглөнө үү!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (username, full_name, email, password, roles, address, "Jobtitle") 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, full_name`,
            [email, `${firstName} ${lastName}`, email, hashedPassword, ['student'], address, jobTitle]
        );

        res.status(201).json({ message: "Амжилттай бүртгүүллээ" });
    } catch (error) {
        console.error("Алдаа гарлаа:", error);
        res.status(500).json({ error: "Дотоод серверийн алдаа" });
    }
};

const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(400);
        }

        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (result.rows.length === 0) {
            alert('хэрэглэгч олдсонгүй')
            return;
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password);
        if (!isMatch) {
            alert('Буруу нууц үг')
            return;
        }

        res.status(200).json({
            message: "амжилттай",
            user: result.rows[0], //hamgiin ehend oldson user
        });
    } catch (error) {
        console.error("Алдаа гарлаа:", error);
        res.status(500).json({ error: "Дотоод серверийн алдаа" });
    }
};



const getProfile = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.sendStatus(400);
        }

        const profileData = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

        if (profileData.rows.length === 0) {
            return res.sendStatus(404);
        }

        res.json(profileData.rows[0]);
    } catch (err) {
        console.error("Алдаа гарлаа:", error);
        res.status(500).json({ error: "Дотоод серверийн алдаа" });
    }
};

module.exports = { signupUser, signinUser, getProfile };