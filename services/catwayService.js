const Catway = require('../models/Catway');

exports.getAllCatways = async () => {
    return await Catway.find();
};

exports.getCatwayById = async (catwayNumber) => {
    return await Catway.findOne({ catwayNumber });
};

exports.createCatway = async (catwayData) => {
    const catway = new Catway({
        catwayNumber: catwayData.catwayNumber,
        catwayType: catwayData.catwayType,
        catwayState: catwayData.catwayState
    });
    return await catway.save();
};

exports.updateCatway = async (catwayNumber, updateData) => {
    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
        return null;
    }

    if (updateData.catwayState) {
        catway.catwayState = updateData.catwayState;
    }

    return await catway.save();
};

exports.deleteCatway = async (catwayNumber) => {
    const result = await Catway.deleteOne({ catwayNumber });
    return result.deletedCount > 0;
};
