import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js"

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb+srv://mfunes:facef123456@facef.na5u1.mongodb.net/?retryWrites=true&w=majority&appName=Facef");

    await Product.deleteMany();
    console.log("Produtos deletados");

    await Product.insertMany(products);
    console.log("Produtos adicionados");

    process.exit();

  } catch (error) {
    console.log(error.message);
    process.exit();    
  }
};

seedProducts();
