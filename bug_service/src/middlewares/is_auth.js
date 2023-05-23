const axios = require("axios");

module.exports = (req, res, next) => {
  const token = req.get("Authorization") || req.get("authorization");
  axios
    .post(AUTH_SERVICE_URL, {
      token: token,
    })
    .then((resp) => {
      if (!resp.data.current_user) {
        return res.status(401).json({ message: "Invalid Token!" });
      }
      req.current_user = resp.data.current_user;
      next();
    })
    .catch((err) => {
      console.log("Failed to verify JWT from Auth-service", err.message);
      return res.status(401).json({
        message: `Failed to verify token from auth-service`,
        error: err.message,
      });
    });
};
