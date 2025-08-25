import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/all", async (req, res) => {
  try {
    const posts = await pool.query(
      "SELECT * FROM tabpost ORDER BY created_at DESC"
    );
    res.json(posts.rows);
  } catch (err) {
    console.err(err);
    res.status(400).json({
      message: "Error fetching tabs."
    })
  }
})

router.post("/add", async (req, res) => {
  const { title, artist, user_id } = req.body;
  try {
    if (!user_id) {
      return res.status(400).json({
        message: "No user_ID specified!"
      });
    }
    const post = await pool.query(
      "INSERT INTO tabpost (title, artist, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, artist, user_id]
    );

    res.status(200).json({
      message: "Tab created!",
      tab: post.rows[0]
    });

  } catch (err) {
    res.status(500).json({error: err.message});
  }
});


export default router