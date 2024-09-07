const mongoose = require("mongoose");

const workshopSchema = mongoose.Schema({
  workshopname: {
    tyoe: String,
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
  logo: String,
  logoId: mongoose.Schema.Types.ObjectId,
});

const workshop = mongoose.model("workshopform", workshopSchema);
module.exports = workshop;
