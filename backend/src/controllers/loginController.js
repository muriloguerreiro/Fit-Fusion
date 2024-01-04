const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const LoginController = {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await User.findUserByUsername(username);

            if (user && await bcrypt.compare(password, user.password)) {
                
                const token = jwt.sign(
                    { userId: user.id },
                    JWT_SECRET,
                    { expiresIn: '2h' }
                );

                res.json({ success: true, token });
            } else {
                res.status(400).json({ message: "Usuário ou senha incorretos." });
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao fazer login.", error: error.message });
        }
    }
};

module.exports = LoginController;
