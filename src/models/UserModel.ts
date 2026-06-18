import { prisma } from "../utils/prisma.js";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email: email } });
  }

  async findByUserId(UserId: number) {
    return prisma.user.findUnique({ where: { id: UserId } });
  }

  async delete(userId: number) {
    return prisma.user.delete({ where: { id: userId } }).catch(() => {
      throw new Error("User already doesn't exist");
    });
  }

  async create(username: string, email: string, password: string) {
    return prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
  }
}
