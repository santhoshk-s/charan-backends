const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  applyId: {
    type: String,
  },
  type: {
    type: String,
  },
  coverLetter: {
    type: String,
  },
  acceptanceStatus: {
    type: String,
    default:'pending'
  },
  paymentStatus: {
    type: String,
    default:'paid'
  },
  
},
{
  timestamps: true,
}
);

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
