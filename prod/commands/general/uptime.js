"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../../utils/embed");
const permissionInt_1 = require("../../utils/permissionInt");
const ms = require("ms");
exports.run = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    let embed = new embed_1.Embed()
        .setAuthor("Flask: Uptime", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .addField("**Active For**:", ms(client.uptime, { long: true }))
        .addField("**Total Shards**", `${client.shards.size}`)
        .setColor("#15f153")
        .setFooter("Flask", client.user.avatarURL)
        .setTimestamp(new Date());
    message.channel.createMessage({ embed: embed });
});
exports.help = {
    name: "uptime",
    description: "shows how long bot has been active",
    usage: "!uptime",
    example: "!uptime",
    perms: [permissionInt_1.Permission.SEND_MESSAGES]
};
exports.conf = {
    aliases: ["up"],
    cooldown: 5 // Seconds
};
