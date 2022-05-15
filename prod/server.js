"use strict";
/*
  Reference:
  - https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
  - https://abal.moe/Eris/docs/reference
*/
const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flask = void 0;
const eris_1 = require("eris");
const bot = require("./handler/Client.js");
require('dotenv').config();
const client = new bot(`Bot ${process.env.SECRET}`, {
    intents: ["guilds", "guildMembers", "guildMessages", "guildPresences"],
    messageLimit: 100,
    maxShards: "auto"
});
require("../prod/handler/Module.js")(client);
require("../prod/handler/Event.js")(client);
process.on('unhandledRejection', (error) => {
    if (error instanceof eris_1.DiscordRESTError)
        return;
    console.error('Uncaught Promise Error: ', error);
});
client.connect();
exports.Flask = bot;
