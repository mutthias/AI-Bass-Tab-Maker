import express from "express";
import cors from "cors";
import pool from "./db.js"

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
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})

