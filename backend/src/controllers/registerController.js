const User = require('../models/User')
const bcrypt = require('bcrypt');

const RegisterController = {
    async createRegister(req, res) {
        const { username, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.createUser(username, hashedPassword)

            res.status(201).json({ success: true, message: "Usuário registrado com sucesso." })
        } catch (error) {
            res.status(500).json({ message: "Erro ao registrar usuário.", error: error.message});
        }
    }
}

module.exports = RegisterController