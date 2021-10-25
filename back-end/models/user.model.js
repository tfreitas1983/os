const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    nome: String,
    email: String,
    password: String,
    unidade: String,
    status: Boolean,
    area: { type: [String], index: true },    
    roles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
    ]
  })
);


module.exports = User;