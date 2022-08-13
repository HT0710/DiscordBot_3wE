const errorHandle = require("../handlers/errorHandle");

module.exports = async (error) => {
  errorHandle("shardError", error);
};
