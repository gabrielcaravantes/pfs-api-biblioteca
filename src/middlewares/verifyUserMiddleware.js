const hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (!req.body.email) {
        errors.push("Missing email field");
    }

    if (!req.body.password) {
        errors.push("Missing password field");
    }

    if (errors.length) {
        return res.status(400).send({ errors: errors.join(", ") });
    }

    return next();
};

const VerifyUserMiddleware = {
    hasAuthValidFields,
};

export default VerifyUserMiddleware;
