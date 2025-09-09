import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

const router = Router();
const jwt_secret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO Users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, hash]
    );
    res.status(200).then(res.json(result.rows[0]));
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: 500
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM Users WHERE email = $1", 
      [email]
    );

    const user = result.rows[0];

    if (!user){
      return res.status(401).json({
        error: "This user does not exist!",
        status: 401
      });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(403).json({
        error: "Invalid password!",
        status: 403
      });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email
      },
        jwt_secret,
      {
        expiresIn: "1h"
      }
    );
    res.status(200).then(res.json({token}));

  } catch (err) {
    res.status(500).json({
      error: "Oops! Something went wrong.",
      status: 500
    });
  }
})

export default router