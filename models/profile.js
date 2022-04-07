const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    Picture: { type: String, unique: true },
    id_user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    location: { type: [Number], index: { type: '2dsphere', sparse: true } },


});
const profileModel = mongoose.model('profile', profileSchema);

module.exports = profileModel;

