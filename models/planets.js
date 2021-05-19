const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlanetSchema = new Schema({
  // id: Number,
  name: { type: String, required: true },
  hasKnownLife: { type: Boolean, required: true },
  type: { type: String, required: true },
  noOfMoons: { type: Number, required: true },
});

module.exports = mongoose.model('Planet', PlanetSchema);
