class ErrorMessage {
  static sendError(res, message, statusCode = 400) {
    res.status(statusCode).json({
      success: false,
      error: message,
    });
  }
  static regErrorMessege(res, error) {
    if (error.isJoi) {
      this.sendError(res, error.message, 400);
    } else if (error.code === "USER_EXISTS") {
      this.sendError(res, "User already exists", 409);
    } else {
      this.sendError(res, "Internal server Error", 500);
    }
  }

  static loginErrorMessage(res, error) {
    if (error.isJoi) {
      this.sendError(res, error.message, 400);
    } else if (error.code === "INVALID_CREDENTIALS") {
      this.sendError(res, "Wrong Email or Password", 401);
    } else {
      this.sendError(res, "Internal server Error", 500);
    }
  }
  static authMeErrorMessage(res, error) {
    if (
      error.message === "jwt malformed" ||
      error.message === "invalid token"
    ) {
      this.sendError(res, "Invalid  token", 401);
    } else if (error.message === "jwt expired") {
      this.sendError(res, "Token has expired", 401);
    } else if (error.message === "No token provided") {
      this.sendError(res, "Authorization token missing", 403);
    } else {
      this.sendError(res, "Internal server error", 500);
    }
  }
}

module.exports = ErrorMessage;
