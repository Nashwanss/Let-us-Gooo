const mongoose = require('mongoose');

// Activity Schema

const activitiesSchema = new mongoose.Schema({
    id_wishList: { type: String, unique: true },
    name: { type: String, required: true },
    about: { type: String, required: true },
    Image: { type: String, unique: true },
    Website: { type: String, unique: true },
    Date: { type: Date, required: true },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    suitable_age: { type: Number, required: true },
});

const activities = mongoose.model('activities', activitiesSchema);

module.exports = activities;