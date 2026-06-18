import { UserModel } from "../models/UserModel";
const userModel = new UserModel();

class UserService {
  async getUser(userId: number) {
    const user = await userModel.findByUserId(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}

export default UserService;
