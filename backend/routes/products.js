import express from "express";
import { deleteProductbyID, getProductbyID, getProducts, newProduct, updateProductbyID } from "../controllers/productControllers.js";
const router = express.Router();

//1 - Rota apenas para admin do sistema para cadastrar produtos
router.route("/admin/products").post(newProduct);

//2 - Rota para obter todos os produtos
router.route("/products").get(getProducts);

//3 - Rota para obter produtos usando ID
router.route("/products/:id").get(getProductbyID);

//4 - Rota para atualizar produtos usando ID
router.route("/products/:id").put(updateProductbyID);

//5 - Rota para deletar produtos usando ID
router.route("/products/:id").delete(deleteProductbyID);

export default router;