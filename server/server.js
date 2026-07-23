import express from "express";
import "dotenv/config";
import cors from "cors";

import db from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Test Route
app.get("/", (req, res) => {
    res.send("API is Working");
});
app.get("/hello", (req, res) => {
    res.send("HELLO NAMAN");
});
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});