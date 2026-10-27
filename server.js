import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import route files
import authRoutes from "./routes/authRoutes.js";

// Import error middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
await connectDB();

const app = express();

// Middleware: Enable CORS
app.use(cors());

// Middleware: Body parser with limit for photo payloads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// API health check route
app.get("/api", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PhotoJudge API is running smoothly!",
        version: "1.0.0"
    });
});

// Mount Resource Routes
app.use("/api/auth", authRoutes);

// Centralized 404 and Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});
