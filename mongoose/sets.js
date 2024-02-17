const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  setNumber: {
    type: Number,
    required: true,
  },
  setName: {
    type: String,
    required: true,
    cast: false,
  },
  theme: {
    type: String,
    required: true,
    cast: false,
  },
  pieces: {
    type: Number,
    required: true,
  },
  ages: {
    type: String,
    required: true,
    cast: false,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    cast: false,
  },
  image: {
    type: String,
    cast: false,
  },
});

const Set = mongoose.model("Set", setSchema);

module.exports = Set;
