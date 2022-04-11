const mongoose = require('mongoose');
// wishList Schema
const Schema = require('mongoose').Schema;
const wishListElementSchema = new mongoose.Schema({
    profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' }
});
const wishListModel = mongoose.model('WishListElement', wishListElementSchema);

module.exports = wishListModel;