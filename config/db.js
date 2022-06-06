const { connect } = require("mongoose");
const { CLOUD_MONGODB_URL, NODE_ENV } = require("./index");
const { success, error} = require("consola");

exports.CloudDBConnection = async (req, res) => {
  try {
    if (NODE_ENV === 'hotStarDevelopment') {
      await connect(CLOUD_MONGODB_URL);
      console.log("connected to cloud");
    } else {
      console.log("Not conected to cloud");
    }
    
  } catch (err) {
      error(err);
      console.log(err);
  }
};
