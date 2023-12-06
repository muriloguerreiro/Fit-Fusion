const knexfile = require('../../knexfile')
const knex = require('knex')(knexfile.development)


const Load = {
    async createLoad(weight, exerciseId) {
        try {
            const [loadId] = await knex('loads').insert({ weight, exercise_id: exerciseId });
            return loadId;
        } catch (error) {
            throw new Error(`Erro ao criar carga: ${error}`);
        }
    },

    async getAllLoads() {
        try {
            const loads = await knex('loads').select('*');
            return loads;
        } catch (error) {
            throw new Error(`Erro ao buscar todas as cargas: ${error}`);
        }
    },

    async getLoadById(id) {
        try {
            const load = await knex('loads').where({ id }).first();
            return load;
        } catch (error) {
            throw new Error(`Erro ao buscar carga por ID: ${error}`);
        }
    },

    async getLoadsByExerciseId(exerciseId) {
        try {
            const loads = await knex('loads').where({ exercise_id: exerciseId });
            return loads;
        } catch (error) {
            throw new Error(`Erro ao buscar cargas por ID do exercício: ${error}`);
        }
    },

    async deleteLoad(id) {
        try {
            const deletedRows = await knex('loads').where({ id }).del();
            return deletedRows > 0;
        } catch (error) {
            throw new Error(`Erro ao deletar carga: ${error}`);
        }
    },
};

module.exports = Load;
