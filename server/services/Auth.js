const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

class Auth {
  constructor(models) {
    this.models = models;
  }
  generateAccessToken(id, data) {
    return jwt.sign({ id, data }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1m",
    });
  }
  generateRefreshToken(id) {
    return jwt.sign({ id }, process.env.TOKEN_REF_SECRET_KEY, {
      expiresIn: "2d",
    });
  }
  async register(body) {
    const doc = await this.models.users(body);
    const user = await doc.save();

    const { password, __v, ...userData } = user._doc;

    console.log();

    return { ...userData };
  }
  async login(body) {
    const user = await this.models.users.findOne({ email: body.email });

    if (!user) {
      return "Invalid email";
    }

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      return "Invalid Password";
    }

    const { password, __v, ...userData } = user._doc;

    const accessToken = this.generateAccessToken(user._id, userData);
    const refreshToken = this.generateRefreshToken(user._id);

    return { ...userData, accessToken, refreshToken };
  }
  async authMe(id) {
    const user = await this.models.users.findById(id);

    const { password, __v, ...userData } = user._doc;

    return { ...userData };
  }
}

module.exports = Auth;
