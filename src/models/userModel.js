import mongoose from "../services/mongooseService.js";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    permissionLevel: Number,
});

const User = mongoose.model("Users", userSchema);

userSchema.virtual("id").get(() => {
    return this._id.toHexString();
});

// Os campos virtuais são convertidos para JSON
userSchema.set("toJSON", {
    virtuals: true,
});

// Encontrar um usuário pelo id
userSchema.findById = (cb) => {
    return this.model("Users").find({ id: this.id }, cb);
};

async function createUser(userData) {
    const user = new User(userData);
    return await user.save();
}

async function isUserExisting(email) {
    const res = await User.findOne({ email });

    if (res === null) {
        return false;
    }

    return true;
}

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
