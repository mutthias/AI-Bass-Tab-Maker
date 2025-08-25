import express from "express";
import cors from "cors";
import pool from "./db.js"

import auth from "./routes/auth.js";
import tabProcessor from "./routes/tabProcessor.js";
import tabSaver from "./routes/tabSaver.js";
import users from "./routes/users.js"

const app = express();
const PORT = 8080

app.use(cors());
app.use(express.json())

app.get("/api/home", (req, res) => {
  res.json({ 
    message: "Hello Twin."
  });
});

// Imported routes here 
app.use("/auth", auth);
app.use("/tabSaver", tabSaver)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
