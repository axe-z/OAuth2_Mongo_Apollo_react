const mongoose = require("mongoose");

const PinSchema = new mongose.Schema(
  {
    title: String,
    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: { type: mongose.Schema.ObjectId, ref: "User" },
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
        author: { type: mongose.Schema.ObjectId, ref: "User" }
      }
    ]
  },
  { timestamps: true }
); //ajoute le createdAt

module.exports = mongoose.model("Pin", PinSchema);
