import { CartModel } from "../models/CartModel";
const cartModel = new CartModel();

class CartService {
  async getOrCreateCart(userId: number) {
    const existing = await cartModel.findByUserId(userId);
    if (existing) return existing;
    return cartModel.create(userId);
  }

  async addItem(userId: number, name: string, quantity: number) {
    const cart = await this.getOrCreateCart(userId);
    return cartModel.addItem(cart.id, name, quantity);
  }

  async removeItem(userId: number, itemId: number) {
    const cart = await cartModel.findByUserId(userId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) {
      throw new Error("Item not found in cart");
    }

    return cartModel.removeItem(itemId);
  }

  async clearCart(userId: number) {
    const cart = await cartModel.findByUserId(userId);
    if (!cart) throw new Error("Cart not found");
    return cartModel.clearCart(cart.id);
  }
}

export default CartService;
