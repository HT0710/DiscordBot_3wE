const fs = require("fs");
const { connection } = require("mongoose");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsFolder = fs.readdirSync("./src/events");
    for (const folder of eventsFolder) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));
      switch (folder) {
        case "client": {
          const clientFolder = fs.readdirSync(`./src/events/${folder}`);
          for (const clientTypeFolders of clientFolder) {
            const clientTypeFolder = fs.readdirSync(
              `./src/events/${folder}/${clientTypeFolders}`
            );
            for (const file of clientTypeFolder) {
              const event = require(`../../events/${folder}/${clientTypeFolders}/${file}`);
              if (event.once) {
                client.once(event.name, (...args) =>
                  event.execute(...args, client)
                );
              } else {
                client.on(event.name, (...args) =>
                  event.execute(...args, client)
                );
              }
            }
          }
          break;
        }

        case "mongo": {
          for (const file of eventFiles) {
            const event = require(`../../events/${folder}/${file}`);
            if (event.once)
              connection.once(event.name, (...args) =>
                event.execute(...args, client)
              );
            else
              connection.on(event.name, (...args) =>
                event.execute(...args, client)
              );
          }
        }

        default: {
          break;
        }
      }
    }
  };
};
