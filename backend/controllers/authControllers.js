import User from "../models/user.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

//Registrar usuários - /api/v1/register
export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    const token = user.getJwtToken();

    res.status(201).json({
        token,
    });

});

//Login de usuários - /api/v1/login
export const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Por favor, informe o email e password', 400));
    }

    //Busca o usuário no Banco de Dados
    const user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next(new ErrorHandler('Por favor, informe o usuário corretamente', 401));
    }

    //Verifica se o password está correto
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Password incorreto', 401));
    }

    const token = user.getJwtToken();

    res.status(201).json({
        token,
    });

});