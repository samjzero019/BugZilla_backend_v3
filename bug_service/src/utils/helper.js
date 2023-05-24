// http://localhost:8002/api/v1/user/:id?


const axios = require("axios");
module.exports = async (id, token) => {
  try {
    var result = await axios.get(`${process.env.USER_SERVICE_URL}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.log(`failed to fetch User Record From User Service!`, error.message);
  }
  if (!result) {
    console.log(`Something Went Wrong! Check if userID is valid!`);
    return false;
  }
  return true;
};
