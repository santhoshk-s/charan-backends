const mongoose = require("mongoose");

const workshopSchema = mongoose.Schema({
  workshopname: {
    type: String,
  },
  date: {
    type: String,
  },
  durattion: {
    type: String,
  },
  location: {
    type: String,
  },
  abouttheEvent: {
    type: String,
  },
  amount: {
    type: Number,
  },
  language: {
    type: String,
  },
  logo: String,
  logoId: mongoose.Schema.Types.ObjectId,
},{
  timestamps: true,
});

const workshop = mongoose.model("workshop", workshopSchema);
module.exports = workshop;
