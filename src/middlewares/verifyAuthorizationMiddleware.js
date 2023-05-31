import jwt from "jsonwebtoken";
import config from "../config/config.js";

function validJWTNeeded(req, res, next) {
    //obtém o token de autorização do cabeçalho da requisição
    let authorization = req.headers.authorization.split(" ");

    //verifica se o cabeçalho de autorização está presente
    if (req.headers.authorization) {
        //verifica se o tipo de autenticação é Bearer
        if (authorization[0] !== "Bearer") {
            //se não for Bearer, retorna um status de não autorizado
            return res.sendStatus(401);
        }
        //verifica e decodifica o token JWT
        req.jwt = jwt.verify(authorization[1], config.secret_key);
        //passa para o próximo middleware ou rota
        next();
    } else {
        //se o cabeçalho de autorização estiver ausente, retorna um status de requisição inválida
        return res.sendStatus(400);
    }
}

const VerifyAuthorizationMiddleware = {
    validJWTNeeded,
};

export default VerifyAuthorizationMiddleware;
