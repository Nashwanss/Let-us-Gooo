const mongoose = require('mongoose');

// rating Schema

const ratingSchema = new mongoose.Schema({
    id_profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
    id_activities: { type: Schema.Types.ObjectId, ref: 'Activities' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
})
const ratingModel = mongoose.model('rating', ratingSchema);


module.exports = ratingModel;