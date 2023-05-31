import { ObjectId } from "mongodb";

function verifyIdParam(req, res, next) {
    //verifica se o parâmetro id da requisição é um ObjectId válido
    if (ObjectId.isValid(req.params.id) === false) {
        //se não for válido, retorna o status 422
        return res.sendStatus(422);
    }
    //se for válido, passa o controle para o próximo middleware ou rota
    return next();
}

const bookMiddleware = {
    verifyIdParam,
};

export default bookMiddleware;
