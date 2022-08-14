const errorHandle = require("../errorHandle");

module.exports = async (error) => {
  errorHandle("shardError", error);
};
