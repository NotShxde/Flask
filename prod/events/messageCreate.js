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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eris_1 = __importDefault(require("eris"));
const database_1 = require("../database");
const embed_1 = require("../utils/embed");
module.exports = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (message.author.bot)
        return;
    if (message.channel.type === 1)
        return; // DM channel. More info: https://github.com/abalabahaha/eris/blob/master/lib/Constants.js
    const getprefix = (yield database_1.db.query(`
    SELECT * FROM guild_data 
    WHERE guild_id = ${message.guildID};
    `)).rows[0].prefix;
    let prefix = getprefix || client.config.prefix;
    if (!message.content.startsWith(prefix))
        return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let msg = message.content.toLowerCase();
    let cmd = args.shift().toUpperCase();
    let sender = message.author;
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!commandFile)
        return;
    let permissionRequired = commandFile.help.perms;
    let sh = (_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions;
    let em = new embed_1.Embed()
        .setAuthor("Flask: Permissions", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setDescription(`The Following Permissions Are Require For Executing This Command`);
    if (permissionRequired) {
        console.log(sh);
        let permsnothave = 0;
        permissionRequired.forEach((p) => {
            //@ts-ignore
            if (!sh.has(p)) {
                //@ts-ignore
                em.addField(`Permission Integer ${eris_1.default.Constants.Permissions[p]}`, `${p}`, false);
                permsnothave = permsnothave + 1;
                console.log("one perm missing ");
            }
            else {
                permsnothave = permsnothave + 0;
                console.log("haha");
            }
        });
        if (permsnothave > 0) {
            permissionRequired = 0;
            return message.channel.createMessage({ embed: em });
        }
    }
    if (!client.cooldowns.has(commandFile.help.name))
        client.cooldowns.set(commandFile.help.name, client.cooldowns);
    const member = message.member, now = Date.now(), timestamps = client.cooldowns.get(commandFile.help.name), cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;
    if (!timestamps.has(member.id)) {
        if (!client.config.owners.includes(message.author.id)) {
            timestamps.set(member.id, now);
        }
    }
    else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.createMessage(`Calm down dude, please wait **${timeLeft.toFixed(1)}** seconds to try the command again.`);
        }
        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    }
    ;
    try {
        if (!commandFile)
            return;
        commandFile.run(client, message, args);
        console.log(args);
    }
    catch (error) {
        console.log(error.message);
    }
    finally {
        console.log(`${sender.username}#${sender.discriminator} ran a command: ${cmd}`);
    }
});
