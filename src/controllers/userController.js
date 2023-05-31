import jwt from "jsonwebtoken";
import config from "../config/config.js";
import UserModel from "../models/userModel.js";

async function Register(req, res) {
    const { email, password } = req.body;
    let permissionLevel = 1;

    //verifica se o usuário já existe com base no email fornecido
    const userExists = await UserModel.isUserExisting(email);

    if (userExists === true) {
        //se o usuário já existe, retorna o status de conflito
        return res.status(409).send({ error: "Este usuário já existe." });
    }

    //cria um novo usuário com os dados fornecidos
    const user = await UserModel.createUser({
        email,
        password,
        permissionLevel,
    });

    if (user) {
        //se o usuário for criado com sucesso, retorna o status 201
        return res.status(201).send({ message: "Usuário criado com sucesso." });
    }
}

async function Login(req, res) {
    const { email, password } = req.body;

    //busca o usuário com base no email fornecido
    const user = await UserModel.findByEmail(email);

    //se o usuário existe e a senha fornecida está correta
    if (user && user.password == password) {
        //gera um token JWT com base no payload do usuário e na chave secreta
        const { _id, email, permissionLevel } = user;
        const payload = { _id, email, permissionLevel };
        const token = jwt.sign(payload, config.secret_key);
        //retorna o status ok com o token na resposta
        return res.status(200).send({ token });
    }
    
    //se o usuário não existe ou a senha está incorreta, retorna o status 400
    return res.status(400).send({ error: "Email ou senha incorretos." });
}

const UserController = {
    Register,
    Login,
};

export default UserController;
