/*
  Reference:
  - https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
  - https://abal.moe/Eris/docs/reference
*/

const bot = require("./handler/Client.js");
require('dotenv').config();

const client = new bot(`Bot ${process.env.SECRET}`, { // https://abal.moe/Eris/docs/Client
  intents: ["guilds", "guildMembers", "guildMessages", "guildPresences"],
  messageLimit: 100,
  maxShards: "auto"
});

require("../prod/handler/Module.js")(client);
require("../prod/handler/Event.js")(client);

client.connect();

export const Flask =  bot
export default { Flask: Flask } 