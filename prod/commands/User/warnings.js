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
const database_1 = require("../../database");
const colors_1 = require("../../utils/colors");
const embed_1 = require("../../utils/embed");
const permissionInt_1 = require("../../utils/permissionInt");
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let embed = new embed_1.Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setColor(colors_1.Colors.DEFAULT_EMBED_COLOR);
    //id | issuedms | guild_id | gwarn_id | user_id | reason
    //        0   1   
    //warn @user reason
    let j = message.mentions[0];
    if (!j) {
        embed.setDescription("Please Mention A USer");
        return message.channel.createMessage({ embed: embed });
    }
    const getprefix = (yield database_1.db.query(`
  SELECT * FROM warn_data
  WHERE user_id = ${j.id}
  `));
    console.log(getprefix);
    let totlafound = getprefix.rowCount;
    getprefix.rows.forEach((u) => {
        embed.addField("*—> *", "\u200b", true);
        embed.addField("**UUID**: ", `\`${u.id}\``, true);
        embed.addField('**Issued Date**: ', `<t:${u.issuedms}:D>`), true;
        embed.addField(`**Reason**: `, `\`${u.reason}\``, true);
    });
    embed.setDescription(`${totlafound} Warns Found`);
    message.channel.createMessage({ embed: embed });
});
exports.help = {
    name: "warns",
    description: "Shows Warnings of User Have",
    usage: "-warns <@user>",
    example: "-warns @wumpus",
    perms: [permissionInt_1.Permission.MANAGE_MESSAGES, permissionInt_1.Permission.ADMINISTRATOR]
};
exports.conf = {
    aliases: ['warnings'],
    cooldown: 5 // Seconds
};
