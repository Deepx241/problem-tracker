import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Problem Tracker API Running",
    });
});

export default app;