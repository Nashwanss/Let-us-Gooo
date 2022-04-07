const mongoose = require('mongoose');

// History Schema; visited places

const visitedPlacesSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    place_name: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: { type: [Number], index: { type: '2dsphere', sparse: true } },
    id_activities: [{ type: Schema.Types.ObjectId, ref: 'Activities' }],
    id_profile: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],

});
const visitedPlacesModel = mongoose.model('visitedPlaces', visitedPlacesSchema);

module.exports = visitedPlacesModel;