import express from "express";
const app = express();

import authRouter from "./src/routes/authRouter.js";
import bookRouter from "./src/routes/bookRouter.js";

//processar solicitações JSON
app.use(express.json());

//rotas de autenticação e de livros
app.use("/", authRouter);
app.use("/book", bookRouter);

//inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("Server rodando na porta 3000");
});
