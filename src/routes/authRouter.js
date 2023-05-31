//rotas relacionadas à autenticação e registro de usuários na API
import express from "express";
import UserController from "../controllers/userController.js";
import VerifyUserMiddleware from "../middlewares/verifyUserMiddleware.js";

const authRouter = express.Router();

//rota de login
authRouter.get("/login", [
    VerifyUserMiddleware.hasAuthValidFields,
    UserController.Login,
]);

//rota de registro
authRouter.post("/register", [
    VerifyUserMiddleware.hasAuthValidFields,
    UserController.Register,
]);

export default authRouter;
