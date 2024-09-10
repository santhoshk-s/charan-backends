const mongoose = require("mongoose");

const ApplicationSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  applyId: {
    type: String,
  },
  acceptanceStatus: {
    type: String,
  },
  paymentStatus: {
    type: String,
  },

},
{
  timestamps: true,
}
);

const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
