import { prisma } from "../utils/prisma.js";

export class CartModel {
  async create(userId: number) {
    return prisma.cart.create({
      data: { userId },
    });
  }

  async addItem(cartId: number, name: string, quantity: number) {
    return prisma.cartItem.create({
      data: { cartId, name, quantity },
    });
  }

  async removeItem(itemId: number) {
    return prisma.cartItem.delete({
      where: { id: itemId },
    });
  }

  async clearCart(cartId: number) {
    return prisma.cartItem.deleteMany({
      where: { cartId },
    });
  }

  async findByUserId(userId: number) {
    return prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
  }
}
