const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuth(req, res, next) {
  const accessToken = (req.headers.authorization || "").replace(/Bearer\s/, "");
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token missing" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError" && refreshToken) {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.TOKEN_REF_SECRET_KEY
        );

        const newAccessToken = jwt.sign(
          { id: decodedRefresh.id },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "1m" }
        );

        res.setHeader("Authorization", `Bearer ${newAccessToken}`);

        req.userId = decodedRefresh.id;
        return next();
      } catch (refreshError) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    }

    return res.status(401).json({ message: "Invalid or expired access token" });
  }
}

module.exports = { checkAuth };
