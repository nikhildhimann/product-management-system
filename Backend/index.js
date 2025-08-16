import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import AddProduct from "./models/AddProduct.js";

// --- Config ---
dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const FRONTEND_URL = process.env.LIVE_API_URL;
const FRONTEND_URL = process.env.FRONT_URL;

console.log(FRONTEND_URL);

const PORT = process.env.PORT || 5000;

// --- App & Server ---
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: FRONTEND_URL, methods: ["GET", "POST"] },
});

// --- Middleware ---
// app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

console.log("Frontend URL: ", FRONTEND_URL);


// --- Routes ---
app.get("/", (req, res) => res.send("API is running..."));
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/upload", uploadRoutes);
app.use("/dashboard", dashboardRoutes);

// --- Socket.IO ---
io.on("connection", (socket) => {
  console.log("User connected");

  const salesInterval = setInterval(async () => {
    const [sales] = await AddProduct.aggregate([
      { $group: { _id: null, total: { $sum: "$totalSales" } } },
    ]);
    socket.emit("salesUpdate", sales?.total || 0);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected");
    clearInterval(salesInterval);
  });
});

// Allow routes to access io instance
app.set("socketio", io);

// --- Start Server ---
httpServer.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
