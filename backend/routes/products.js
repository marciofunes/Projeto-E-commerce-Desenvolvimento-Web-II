import express from "express";
import { getProducts, newProduct } from "../controllers/productControllers.js";
const router = express.Router();

// Rota para obter todos os produtos
router.route("/products").get(getProducts);

//Rota apenas para admin do sistema para cadastrar produtos
router.route("/admin/products").post(newProduct);

export default router;