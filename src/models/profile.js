const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bio: { type: String, required: true },
  skills: { type: [String], required: true },
  location: { type: String, required: false },
  experience: { type: String, required: false },
});

module.exports = mongoose.model("Profile", profileSchema);
