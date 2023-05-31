//definição do modelo de usuário utilizando o mongoose & funções relacionadas às operações de usuário
import mongoose from "../services/mongooseService.js";

//definindo o esquema do usuário
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    permissionLevel: Number,
});

//criando o modelo de usuário
const User = mongoose.model("Users", userSchema);

//define um campo virtual id
userSchema.virtual("id").get(() => {
    return this._id.toHexString();
});

//os campos virtuais são convertidos para JSON
userSchema.set("toJSON", {
    virtuals: true,
});

//encontrar um usuário pelo id
userSchema.findById = (cb) => {
    return this.model("Users").find({ id: this.id }, cb);
};

//função para criar um usuário
async function createUser(userData) {
    const user = new User(userData);
    return await user.save();
}

//função para verificar se um usuário já existe pelo email
async function isUserExisting(email) {
    const res = await User.findOne({ email });

    if (res === null) {
        return false;
    }

    return true;
}

//função para encontrar um usuário pelo email
async function findByEmail(email) {
    const res = await User.findOne({
        email,
    });

    return res;
}

const UserModel = {
    createUser,
    isUserExisting,
    findByEmail,
};

export default UserModel;
