const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
});

UserSchema.pre("save", async function () {
  const hashPassword = await bcrypt.hash(this.password, 12);
  this.password = hashPassword;
});

module.exports = mongoose.model("users", UserSchema);
