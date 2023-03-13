const { readdirSync } = require("fs");
const name = "embedModals";

module.exports = client = {
  data: {
    name: name,
  },
  execute(modals) {
    const embedModals = readdirSync(`./src/components/modals/${name}`);

    for (const file of embedModals) {
      const modal = require(`../../components/modals/${name}/${file}`);
      modals.set(modal.data.name, modal);
    }
  },
};
