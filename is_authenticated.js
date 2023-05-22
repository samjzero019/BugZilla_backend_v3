const jwt = require("jsonwebtoken");
const JWT_SECRET = "XUujoj6D/qgko5MZ3xXidZOS5iR1P9BmzwzAgkFlOaI=";

module.exports = (req, res, next) => {
  let token =
    req.get("Authorization") ||
    req.get("authorization") ||
    req.get("x-auth-token");
  if (!token) {
    return res.status(400).json({ message: "JWT Token is missing!" });
  }
  token = token.split(" ")[1];

  try {
    var payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.log("Failed to verify Token!", error.message);
    return res.status(400).json({ message: "Token has Expired" });
  }
  req.current_user = payload.user;
  next();
};
