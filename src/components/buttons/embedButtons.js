const { readdirSync } = require("fs");
const name = "embedButtons";

module.exports = client = {
  data: {
    name: name,
  },
  execute(buttons) {
    const embedButtons = readdirSync(`./src/components/buttons/${name}`);

    for (const file of embedButtons) {
      const button = require(`../../components/buttons/${name}/${file}`);
      buttons.set(button.data.name, button);
    }
  },
};
