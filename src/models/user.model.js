const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_Name: { type: String, required: true },
    last_Name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pincode: { type: String, required: true }, 
    age: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"]
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);