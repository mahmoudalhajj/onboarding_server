import express from "express";
import UserController from "../controllers/UserController";
import { authenticate } from "../middlewares/authMiddleware";

const router = express.Router();
const userController = new UserController();

router.post("/delete", authenticate, async (req, res) => {
  await userController.deleteUser(req, res);
});

router.get("/profile", authenticate, async (req, res) => {
  await userController.getUserById(req, res);
});

export default router;
