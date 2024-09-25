import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import { connectDatabase } from "./config/dbConnect.js";

const app = express();
dotenv.config({ path: "backend/config/config.env"});

//Conectand ao MongoDB
connectDatabase();

//Função do express que lida com json
app.use(express.json());

//Importanto todas as rotas
app.use("/api/v1", productRoutes);

app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado na PORTA: 3000');
});