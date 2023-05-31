import express from "express";

import UserController from "../controllers/userController.js";
import VerifyUserMiddleware from "../middlewares/verifyUserMiddleware.js";

const authRouter = express.Router();

authRouter.get("/login", [
    VerifyUserMiddleware.hasAuthValidFields,
    UserController.Login,
]);
authRouter.post("/register", [
    VerifyUserMiddleware.hasAuthValidFields,
    UserController.Register,
]);

export default authRouter;
