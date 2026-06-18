import { prisma } from "../utils/prisma.js";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.users.findUnique({ where: { email: email } });
  }

  async delete(userId: number) {
    return prisma.users.delete({ where: { id: userId } }).catch(() => {
      throw new Error("User already doesn't exist");
    });
  }

  async create(username: string, email: string, password: string) {
    return prisma.users.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
  }
}
