import express from "express";
import cors from "cors";
import pool from "./db.js"

import tabProcessor from "./routes/tabProcessor.js";
import tabSaver from "./routes/tabSaver.js";
import users from "./routes/users.js"
import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json())
app.use(cookieParser())

app.get("/api/home", (req, res) => {
  res.json({ 
    message: "Hello Twin."
  });
});

// Imported routes here 
app.use("/tabProcessor", tabProcessor);
app.use("/tabSaver", tabSaver);
app.use("/users", users);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
