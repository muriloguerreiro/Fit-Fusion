const Load = require('../models/Load')


const LoadController = {
  async createLoad(req, res) {
    const { weight, exerciseId } = req.body;
    try {
      const newLoadId = await Load.createLoad(weight, exerciseId);
      res.status(201).json({ message: 'Carga criada com sucesso', newLoadId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAllLoads(req, res) {
    try {
      const loads = await Load.getAllLoads();
      res.status(200).json(loads);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getLoadById(req, res) {
    const { id } = req.params;
    try {
      const load = await Load.getLoadById(id);
      if (!load) {
        res.status(404).json({ message: 'Carga não encontrada' });
      } else {
        res.status(200).json(load);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getLoadsByExerciseId(req, res) {
    const { id } = req.params;
    try {
      const loads = await Load.getLoadsByExerciseId(id);
      res.status(200).json(loads);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteLoad(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Load.deleteLoad(id);
      if (deleted) {
        res.status(200).json({ message: 'Carga excluída com sucesso' });
      } else {
        res.status(404).json({ message: 'Carga não encontrada' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = LoadController;
