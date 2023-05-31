const hasAuthValidFields = (req, res, next) => {
    let errors = [];

    //verifica se o campo de email está presente na requisição
    if (!req.body.email) {
        errors.push("Está faltando o email");
    }

    //verifica se o campo de senha está presente na requisição
    if (!req.body.password) {
        errors.push("Está faltando a senha");
    }

    //se houver erros, retorna uma resposta de erro com os detalhes
    if (errors.length) {
        return res.status(400).send({ errors: errors.join(", ") });
    }

    //se não houver erros, passa para o próximo middleware ou rota
    return next();
};

const VerifyUserMiddleware = {
    hasAuthValidFields,
};

export default VerifyUserMiddleware;
