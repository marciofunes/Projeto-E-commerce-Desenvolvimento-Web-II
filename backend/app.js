import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import authRoutes from './routes/auth.js';
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middleware/erros.js";

const app = express();
dotenv.config({ path: "backend/config/config.env"});

//Conectand ao MongoDB
connectDatabase();

//Função do express que lida com json
app.use(express.json());

//Importanto todas as rotas
app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);

//Utilizando o middleware de tratamento de erros
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
    console.log('Servidor iniciado na PORTA: 3000');
});

//Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERRO: ${err}`);
    console.log("Desligando servidor devido Rejeições de Promessas Não Tratadas");
    server.close(() => {
        process.exit(1);
    });
});