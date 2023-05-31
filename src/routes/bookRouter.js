//definir as rotas relacionadas aos livros na API
import express from "express";
import bookController from "../controllers/bookController.js";
import VerifyAuthorizationMiddleware from "../middlewares/verifyAuthorizationMiddleware.js";
import bookMiddleware from "../middlewares/bookMiddleware.js";

const bookRouter = express.Router();

//rotas relacionadas aos livros
bookRouter.get("/", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookController.getBooks,
]);

//rota para obter um livro específico pelo seu ID
bookRouter.get("/:id", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookMiddleware.verifyIdParam,
    bookController.findBook,
]);

//rota para criar um novo livro
bookRouter.post("/", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookController.createBook,
]);

//rota para atualizar um livro pelo seu ID
bookRouter.put("/:id", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookMiddleware.verifyIdParam,
    bookController.updateBook,
]);

//rota para excluir um livro por ID
bookRouter.delete("/:id", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookMiddleware.verifyIdParam,
    bookController.deleteBook,
]);

export default bookRouter;
