// http://localhost:8001/api/v1/bug/:id?

const axios = require("axios");
module.exports = async (id, token) => {
  try {
    var result = await axios.get(`${process.env.BUG_SERVICE_URL}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (error) {
    console.log(`failed to fetch BugRecord From Bug Service!`, error.message);
  }
  console.log("result in helper!", result);
  if (!result) {
    console.log(`Something Went Wrong! Check if bugID is valid!`);
    return false;
  }
  return true;
};
