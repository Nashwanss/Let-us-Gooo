
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                const mongoose = require('mongoose');
// family members Shcema

const familyMembersSchema = new mongoose.Schema({
    id_profile: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],
    kid_name: { type: String, required: true },
    kid_age: { type: String, required: true },

});
const familyMembersModel = mongoose.model('familyMembers', familyMembersSchema);

module.exports = familyMembersModel;