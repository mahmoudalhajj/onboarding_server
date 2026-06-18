import express from "express";
import UserController from "../controllers/UserController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();
const userController = new UserController();

router.post("/register", async (req, res) => {
  await userController.register(req, res);
});

router.post("/login", authenticate, async (req, res) => {
  await userController.login(req, res);
});

export default router;
