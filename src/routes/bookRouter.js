import express from "express";
import bookController from "../controllers/bookController.js";
import VerifyAuthorizationMiddleware from "../middlewares/verifyAuthorizationMiddleware.js";
import bookMiddleware from "../middlewares/bookMiddleware.js";

const bookRouter = express.Router();

bookRouter.get("/", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookController.getBooks,
]);
bookRouter.get("/:id", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookMiddleware.verifyIdParam,
    bookController.findBook,
]);
bookRouter.post("/", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookController.createBook,
]);
bookRouter.put("/:id", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookMiddleware.verifyIdParam,
    bookController.updateBook,
]);
bookRouter.delete("/:id", [
    VerifyAuthorizationMiddleware.validJWTNeeded,
    bookMiddleware.verifyIdParam,
    bookController.deleteBook,
]);

export default bookRouter;
