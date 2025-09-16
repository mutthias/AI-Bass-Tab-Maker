import { authToken } from "./auth.js";
import { Router } from "express";
import pool from "../db.js";

const router = Router();


router.get("/all", authToken, async (req, res) => {
  try {
    console.log(req.user)
    const posts = await pool.query(
      "SELECT * FROM tabpost WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(posts.rows);
  } catch (err) {
    console.err(err);
    res.status(400).json({
      message: "Error fetching tabs."
    })
  }
})

router.post("/add", authToken, async (req, res) => {
  const { title, artist } = req.body;
  try {
    const post = await pool.query(
      "INSERT INTO tabpost (title, artist, user_id) VALUES ($1, $2, $3) RETURNING *",
      [title, artist, req.user.id]
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