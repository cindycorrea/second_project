const mongoose = require("mongoose");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const builderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    cast: false,
  },
  lastName: {
    type: String,
    required: true,
    cast: false,
  },
  email: {
    type: String,
    required: true,
    match: emailRegex,
  },
  favoriteTheme: {
    type: String,
    required: true,
    cast: false,
  },
  setsOwned: {
    type: [Number],
  },
  wishList: {
    type: [Number],
  },
});

const Builder = mongoose.model("Builder", builderSchema);

module.exports = Builder;
