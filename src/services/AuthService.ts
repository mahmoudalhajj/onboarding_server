import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { UserModel } from "../models/UserModel";
import { LoginResponse } from "../types/LoginResponse";
const userModel = new UserModel();

class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    const user = await userModel.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      throw new Error("Invalid Credentials");
    }
    const token = generateToken(user.id);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const existing = await userModel.findByEmail(email);

    if (existing) {
      throw new Error("Email already exists");
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create(username, email, hashed);
    const token = generateToken(user.id);
    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async deleteUser(userId: number) {
    return userModel.delete(userId).catch(() => {
      throw new Error("User already doesnt exist");
    });
  }
}

export default AuthService;
