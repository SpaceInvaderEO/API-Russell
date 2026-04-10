const catwayService = require('../services/catwayService');

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.status(200).json(catways);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCatwayById = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(catway);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCatway = async (req, res) => {
    try {
        const newCatway = await catwayService.createCatway(req.body);
        res.status(201).json(newCatway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateCatway = async (req, res) => {
    try {
        const updatedCatway = await catwayService.updateCatway(req.params.id, req.body);
        if (!updatedCatway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(updatedCatway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCatway = async (req, res) => {
    try {
        const success = await catwayService.deleteCatway(req.params.id);
        if (!success) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json({ message: 'Catway deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
