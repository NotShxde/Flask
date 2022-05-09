"use strict";
/*
  Reference:
  - https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
  - https://abal.moe/Eris/docs/reference
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flask = void 0;
const bot = require("./handler/Client.js");
require('dotenv').config();
const client = new bot(`Bot ${process.env.SECRET}`, {
    intents: ["guilds", "guildMembers", "guildMessages", "guildPresences"],
    messageLimit: 100,
    maxShards: "auto"
});
require("../prod/handler/Module.js")(client);
require("../prod/handler/Event.js")(client);
client.connect();
exports.Flask = bot;
exports.default = { Flask: exports.Flask };
