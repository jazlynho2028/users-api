const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to your Express server" });
});

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error("Query error: ", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;