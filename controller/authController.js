const pool = require("../db");
const bcrypt = require("bcrypt");

const signupUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password, address, jobTitle } = req.body;

        if (!email || !firstName || !lastName || !password) {
            return res.status(400).json({ error: "All required fields must be filled!" });
        }
        console.log("Received Data:", req.body);
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const result = await pool.query(
            `INSERT INTO users (username, full_name, email, password, roles, address, "Jobtitle") 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, full_name`,
            [email, `${firstName} ${lastName}`, email, hashedPassword, ['student'], address, jobTitle]
        );


        console.log("Database Result:", result.rows);

        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { signupUser };
