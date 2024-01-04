const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile.development)

const User = {
    async createUser(username, password) {
        try {
            const newUser = await knex('users').insert({
                username,
                password
            })
          return newUser;
        } catch (error) {
          throw new Error(`Erro ao criar o usuário: ${error}`)
        }
      },

      async findUserByUsername(username) {
        try {
            const user = await knex('users').where({ username }).first();
            return user;
        } catch (error) {
            throw new Error(`Erro ao encontrar o usuário: ${error}`);
        }
    }
}

module.exports = User;