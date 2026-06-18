import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cartRoutes from "./routes/cartRoutes";
import { authenticate } from "./middlewares/authMiddleware";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/user", userRoutes);
app.use("v1/api/cart", cartRoutes);

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
