const { readdirSync } = require("fs");
const name = "embedModals";

module.exports = client = {
  data: {
    name: name,
  },
  execute(modals) {
    const embedButtons = readdirSync(`./src/components/modals/${name}`);

    for (const file of embedButtons) {
      const modal = require(`../../components/modals/${name}/${file}`);
      modals.set(modal.data.name, modal);
    }
  },
};
