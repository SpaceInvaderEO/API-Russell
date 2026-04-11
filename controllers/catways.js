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
    const { catwayNumber, catwayType, catwayState } = req.body;
 
    if (!catwayNumber || !catwayType || !catwayState) {
        return res.status(400).json({ message: 'All fields are required (catwayNumber, catwayType, catwayState)' });
    }
 
    if (!['long', 'short'].includes(catwayType)) {
        return res.status(400).json({ message: 'Invalid catwayType (must be long or short)' });
    }

    try {
        const newCatway = await catwayService.createCatway(req.body);
        res.status(201).json(newCatway);
    } catch (err) {
        if (err.message === 'Catway number already exists') {
            return res.status(409).json({ message: err.message });
        }
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
