import jwt from "jsonwebtoken";
import config from "../config/config.js";

function validJWTNeeded(req, res, next) {
    let authorization = req.headers.authorization.split(" ");
    if (req.headers.authorization) {
        if (authorization[0] !== "Bearer") {
            return res.sendStatus(401);
        }

        req.jwt = jwt.verify(authorization[1], config.secret_key);
        next();
    } else {
        return res.sendStatus(400);
    }
}

const VerifyAuthorizationMiddleware = {
    validJWTNeeded,
};

export default VerifyAuthorizationMiddleware;
