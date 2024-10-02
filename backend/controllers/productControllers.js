import Product from '../models/product.js';
import ErrorHandler from '../utils/errorHandler.js';
import APIFilters from '../utils/apiFilters.js';

// Pesquisar produtos => /api/v1/products
export const getProducts = async (req, res) => {

    const resPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query).search().filters();

    let products = await apiFilters.query;
    let filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();

    res.status(200).json({
        resPerPage,
        filteredProductsCount,
        products,
    });
};

// Criar um novo produto => /api/v1/admin/products
export const newProduct = async (req, res) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        product,
    });
};

// Consultar produto por ID => /api/v1/products/:id
export const getProductbyID = async (req, res, next) => {
    const product = await Product.findById(req?.params?.id);

    if(!product){
        return next(new ErrorHandler("Produto não encontrado", 404));
    }

    res.status(200).json({
        product,
    });
};

// Atualizar produto por ID => /api/v1/products/:id
export const updateProductbyID = async (req, res) => {
    let product = await Product.findById(req?.params?.id);

    if(!product){
        return next(new ErrorHandler("Produto não encontrado", 404));
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new: true });

    res.status(200).json({
        product,
    });
};

// Deletar produto por ID => /api/v1/products/:id
export const deleteProductbyID = async (req, res) => {
    const product = await Product.findById(req?.params?.id);

    if(!product){
        return next(new ErrorHandler("Produto não encontrado", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        message: "Produto Deletado",
    });
};