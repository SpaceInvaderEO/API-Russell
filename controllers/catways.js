const Catway = require('../models/Catway');

exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).json(catways);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(catway);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCatway = async (req, res) => {
    const catway = new Catway({
        catwayNumber: req.body.catwayNumber,
        catwayType: req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try {
        const newCatway = await catway.save();
        res.status(201).json(newCatway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateCatway = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }

        if (req.body.catwayState) {
            catway.catwayState = req.body.catwayState;
        }

        const updatedCatway = await catway.save();
        res.status(200).json(updatedCatway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCatway = async (req, res) => {
    try {
        const result = await Catway.deleteOne({ catwayNumber: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json({ message: 'Catway deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
