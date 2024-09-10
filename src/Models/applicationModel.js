const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  username: {
    type: String,
  },
  qualification: {
    type: String,
  },
  email: {
    type: String,
  },
  contactno: {
    type: String,
  },
  field: {
    type: String,
  },
  location: {
    type: String,
  },
  areaOfInterest: {
    type: String,
  },
  workMode: {
    type: String,
  }
},
{
  timestamps: true,
}
);

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
