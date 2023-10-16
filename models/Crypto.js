const { Schema, Types, model, default: mongoose } = require("mongoose");

const cryptoSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true }, //ADJUST PROPERTIES ACCORDING TO THE TASK
  description: { type: String, required: true },
  paymentMethod: {
    type: String,
    required: true,
  },
  buys: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: { type: Types.ObjectId, ref: "User" },
});
//DONT FORGER TO CHANGE NAMES ACCORDING TO TASK

const Crypto = model("Crypto", cryptoSchema);
module.exports = Crypto;
