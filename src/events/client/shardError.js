module.exports = {
  name: "shardError",
  async(error) {
    console.error("A websocket connection encountered an error:", error);
  },
};
