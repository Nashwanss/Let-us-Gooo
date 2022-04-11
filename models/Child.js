const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({

  childName: {
    type: String,
    required: true,
    trim: true
  },
  childAge: {
    type: Number,
    required: true,
  }
});


const Child = mongoose.model("Child",childSchema);

module.exports = {Child,childSchema}


