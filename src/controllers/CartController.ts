import CartService from "../services/CartService";
import { Request, Response } from "express";

class CartController {
  cartService = new CartService();

  async getCart(req: Request, res: Response) {
    try {
      const userId = Number(req.user.id);
      const cart = await this.cartService.getOrCreateCart(userId);
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async addItem(req: Request, res: Response) {
    try {
      const userId = Number(req.user.id);
      const { name, quantity } = req.body;
      const item = await this.cartService.addItem(userId, name, quantity);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async removeItem(req: Request, res: Response) {
    try {
      const userId = Number(req.user.id);
      const itemId = Number(req.params.itemId);
      await this.cartService.removeItem(userId, itemId);
      return res.status(200).json({ message: "Item removed" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async clearCart(req: Request, res: Response) {
    try {
      const userId = Number(req.user.id);
      await this.cartService.clearCart(userId);
      return res.status(200).json({ message: "Cart cleared" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default CartController;
