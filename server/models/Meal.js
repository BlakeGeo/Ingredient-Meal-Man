const { Schema } = require('mongoose');

const mealSchema = new Schema({
  mealId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  mealURL: {
    type: String,
  }
});

module.exports = mealSchema;
