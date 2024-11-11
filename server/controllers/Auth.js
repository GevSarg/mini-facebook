const ErrorMessage = require("../errors/error");
const { loginValidation } = require("../validation/loginValidation");
const { registerValidation } = require("../validation/registerValidation");

class Auth {
  async register(req, res) {
    try {
      const validUser = await registerValidation.validateAsync(req.body);
      const user = await req.app.locals.services.users.register(validUser);
      res.status(201).json(user);
    } catch (error) {
      ErrorMessage.regErrorMessege(res, error);
    }
  }

  async login(req, res) {
    try {
      const validUser = await loginValidation.validateAsync(req.body);
      const user = await req.app.locals.services.users.login(validUser);

      const { accessToken, refreshToken, ...userData } = user;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000 * 2,
      });
      res.status(200).json({ accessToken, userData });
    } catch (error) {
      ErrorMessage.loginErrorMessage(res, error);
    }
  }

  async authMe(req, res) {
    try {
      const user = await req.app.locals.services.users.authMe(req.userId);
      res.status(200).json(user);
    } catch (error) {
      ErrorMessage.authMeErrorMessage(res, error);
    }
  }
  async logout(req, res) {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  }
}

module.exports = Auth;
