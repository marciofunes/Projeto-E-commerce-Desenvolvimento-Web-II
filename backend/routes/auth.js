import express from "express";
import { loginUser, registerUser } from '../controllers/authControllers.js';
const router = express.Router();

//1 - Rota para registrar um novo usuario
router.route("/register").post(registerUser);

//2 - Rota para login do usuario
router.route("/login").post(loginUser);

export default router;