const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let { token } = req.body;
  
  if (!token) {
    return res.status(400).json({
      message: "Token not Found!",
      PossibleSolution: "Check if header is 'x-auth-token'",
    });
  }
  token = token.split(" ")[1];
  try {
    var payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Failed to verify Token!", error.message);
    return res.status(400).json({ message: "Token has Expired" });
  }

  return res
    .status(200)
    .json({ message: `JWT has been validated!`, current_user: payload.user });
};
