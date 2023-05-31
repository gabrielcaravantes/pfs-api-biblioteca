import { ObjectId } from "mongodb";

function verifyIdParam(req, res, next) {
    if (ObjectId.isValid(req.params.id) === false) {
        return res.sendStatus(422);
    }

    return next();
}

const bookMiddleware = {
    verifyIdParam,
};

export default bookMiddleware;
