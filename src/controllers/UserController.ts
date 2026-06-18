import AuthService from "../services/AuthService";
import { Request, Response } from "express";

class UserController {
  authService = new AuthService();

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const result = await this.authService.register(username, email, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("server issue");
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    try {
      const result = await this.authService.login(email, password);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json("server issue");
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = Number(req.user.id);
      await this.authService.deleteUser(userId);
      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getUserById(req: Request, res: Response) {}
}

export default UserController;
