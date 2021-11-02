const { Schema } = require('mongoose');

const mealSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  mealId: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
  },
});

module.exports = mealSchema;
