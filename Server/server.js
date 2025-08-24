import express from "express";
import cors from "cors";
import pool from "./db.js"

import auth from "./routes/auth.js";


const app = express();
const PORT = 8080

app.use(cors());
app.use(express.json())

app.get("/api/home", (req, res) => {
  res.json({ 
    message: "Hello Twin."
  });
});

app.post("/users", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING *",
      [username, password, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
