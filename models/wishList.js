const mongoose = require('mongoose');

// wishList Schema

const wishListSchema = new mongoose.Schema({
    id_profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
    id_wishList: [{ type: Schema.Types.ObjectId, ref: 'activities' }],
});
const wishListModel = mongoose.model('wishList', wishListSchema);

mosule.exports = wishListModel;