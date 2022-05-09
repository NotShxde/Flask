"use strict";
/*
  Reference:
  - https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
  - https://abal.moe/Eris/docs/reference
*/
const bot = require("../handler/Client");
require('dotenv').config();
const client = new bot(`Bot ${process.env.SECRET}`, {
    intents: ["guilds", "guildMembers", "guildMessages", "guildPresences"],
    messageLimit: 100,
    maxShards: "auto"
});
require("../../prod/handler/Module.js")(client);
//require("../../prod/handler/Event.js")(client);
client.connect();
client.commands.forEach((element) => {
    client.createCommand({
        name: element.help.name,
        description: element.help.description
    }).then(() => console.log(`created ${element.help.name}`))
        .catch(console.error);
});
