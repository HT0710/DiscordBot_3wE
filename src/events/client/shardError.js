module.exports = {
  name: "shardError",
  async execute(error, client) {
    console.error("A websocket connection encountered an error:", error);
  },
};
