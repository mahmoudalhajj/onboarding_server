import express from "express";
import CartController from "../controllers/CartController";
import { authenticate } from "../middlewares/authMiddleware";
const router = express.Router();
const cartController = new CartController();

router.use(authenticate);

router.get("/cart", (req, res) => {
  cartController.getCart(req, res);
});

router.post("/cart/items", (req, res) => {
  cartController.addItem(req, res);
});

router.delete("/cart/items/:itemId", (req, res) => {
  cartController.removeItem(req, res);
});
router.delete("/cart/clear", (req, res) => {
  cartController.clearCart(req, res);
});
export default router;
