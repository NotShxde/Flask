/*
  Reference:
  - https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
  - https://abal.moe/Eris/docs/reference
*/

import { DiscordRESTError } from "eris";
const express = require('express');

const app = express();


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const bot = require("./handler/Client.js");
require('dotenv').config();

const client = new bot(`Bot ${process.env.SECRET}`, { // https://abal.moe/Eris/docs/Client
  intents: ["guilds", "guildMembers", "guildMessages", "guildPresences"],
  messageLimit: 100,
  maxShards: "auto"
});

require("../prod/handler/Module.js")(client);
require("../prod/handler/Event.js")(client);

process.on('unhandledRejection', (error) => {
  if (error instanceof DiscordRESTError) return;

  console.error('Uncaught Promise Error: ', error);
});

client.connect();

export const Flask =  bot
