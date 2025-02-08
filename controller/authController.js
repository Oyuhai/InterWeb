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

        res.status(201).json({ message: "User  registered successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the required fields are provided
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required!" });
        }

        // Query the database to find the user with the given email
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        );

        // Check if the user exists
        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, result.rows[0].password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // If login is successful, return user data (could be used for session or token)
        res.status(200).json({
            message: "Login successful",
            user: result.rows[0], // You can also send a token here if you're using JWT
        });
    } catch (error) {
        console.error("Signin Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getProfile = async (req, res) => {
    try {
        const userId = req.query.userId; // Get userId from query parameters

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Fetch user profile from DB (adjust to your actual query and model)
        const profileData = await pool.query('SELECT * FROM users WHERE username = $1', [userId]);

        if (profileData.rows.length === 0) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profileData.rows[0]); // Send the profile data as response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching profile data" });
    }
};



// Export both functions in a single object
module.exports = { signupUser, signinUser, getProfile };