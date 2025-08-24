import { Router } from "express";
import pool from "../db.js"

const router = Router();

router.post("/users", async (req, res) => {
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

export default router