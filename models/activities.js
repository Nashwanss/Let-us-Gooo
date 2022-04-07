const mongoose = require('mongoose');

// Activity Schema

const activitiesSchema = new mongoose.Schema({
    _id: { type: String, unique: true },
    name: { type: String, required: true },
    about: { type: String, required: true },
    image: { type: String, unique: true },
    website: { type: String, unique: true },
    Date: { type: String, required: true },
    address: { type: String, required: true },
    price: { type: String, required: true },
    suitableAge: { type: String, required: true },
});

const activities = mongoose.model('activities', activitiesSchema);

module.exports = activities;