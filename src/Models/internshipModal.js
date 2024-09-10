const mongoose = require("mongoose");

const internshipSchema = mongoose.Schema({
  position: {
    type: String,
  },
  name: {
    type: String,
  },
  duration: {
    type: String,
  },
  location: {
    type: String,
  },
  applicants: {
    type: String,
  },
  about: {
    type: String,
  },
  details: {
    type: String,
  },
  whoCanApply: {
    type: String,
  },
  skills: {
    type: String,
  }
},
{
  timestamps: true,
}
);

const internship = mongoose.model("internship", internshipSchema);
module.exports = internship;
