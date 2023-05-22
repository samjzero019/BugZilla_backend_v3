const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token =
    req.get("authorization") ||
    req.get("Authorization") ||
    req.get("x-auth-token");
  if (!token) {
    return res.status(400).json({
      message: "Token not Found!",
      PossibleSolution: "YOu might forgot to login!",
    });
  }
  token = token.split(" ")[1];
  try {
    var payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Failed to verify Token!", error.message);
    return res.status(400).json({ message: "Token has Expired" });
  }
  req.current_user = payload.user;
  next();
};
