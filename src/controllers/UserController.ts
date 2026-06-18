import AuthService from "../services/AuthService";
import { Request, Response } from "express";

class UserController {
  authService = new AuthService();

  async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    try {
      const result = await this.authService.register(username, email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(500);
    }
  }
}
export default UserController;
