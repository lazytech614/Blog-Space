import express from "express";
import dotenv from "dotenv";
import connectToDb from "./db/connection.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the uploads directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test route
app.get("/", (req, res) => {
  res.send("Hello from server!");
});

// Blog routes
app.use("/api/blogs", blogRoutes);

// Start the server
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

// Connect to the database
connectToDb();
