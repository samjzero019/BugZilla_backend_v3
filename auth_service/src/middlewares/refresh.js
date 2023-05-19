const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // verify refresh token and return new IDtoken and  refresh token!
  let prevToken =
    req.get("authorization") ||
    req.get("Authorization") ||
    req.get("x-auth-token");
  if (!prevToken) {
    return res.status(400).json({ message: "Token not Found!" });
  }
  prevToken = prevToken.split(" ")[1];
  try {
    var payload = jwt.verify(prevToken, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Failed to verify Token!", error.message);
    return res.status(400).json({ message: "Token has Expired" });
  }

  const newToken = jwt.sign(payload.user, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  const refreshToken = jwt.sign(payload.user, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });

  res.status(200).json({
    message: "Auth Token has been refreshed!",
    token: newToken,
    refreshToken,
  });
};
