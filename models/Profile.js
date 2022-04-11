const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    age : {
        type: Number,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Child"
    }]
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = {Profile,ProfileSchema};









// const mongoose = require('mongoose');

// const profileSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     lastName: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     age : {
//         type: Number,
//         required: false
//     },
//     picture: {
//         type: String,
//         required: false
//     },
//     location: {
//         type: String,
//         required: true
//     },
//     children : [
//         {type: mongoose.Schema.Types.ObjectId, ref : "Child"}
//     ]
// });

// const Profile = mongoose.model("Profile", profileSchema);

// module.exports = {Profile,profileSchema};
