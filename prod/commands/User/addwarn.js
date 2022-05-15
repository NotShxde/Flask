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
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let embed = new embed_1.Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setColor(colors_1.Colors.DEFAULT_EMBED_COLOR);
    //id | issuedms | guild_id | gwarn_id | user_id | reason
    //        0   1   
    //warn @user reason
    embed.setFooter("Flask ", client.user.avatarURL);
    if (!args[0]) {
        embed.setDescription("Please Mention a User To Warn");
        message.channel.createMessage({ embed: embed });
    }
    let reason = "Not Specified";
    if (args[1]) {
        let v = args.splice(0, 1);
        console.log(args);
        reason = args.join(" ");
    }
    var date = new Date(); // some mock date
    //@ts-ignore
    let milliseconds = Math.floor(new Date().getTime() / 1000);
    console.log(milliseconds);
    let usertobewarned = message.mentions[0];
    if (!usertobewarned) {
        embed.setDescription("Please Mention A User To Warn");
        return message.channel.createMessage({ embed: embed });
    }
    let memberDm = yield client.getDMChannel(usertobewarned.id);
    yield database_1.db.query(`
  INSERT INTO warn_data(issuedms,guild_id,user_id,reason)
  VALUES('${milliseconds}','${message.guildID}','${usertobewarned.id}','${reason}');
  
  `).catch(console.error).finally(() => {
        //@ts-ignore
        let j = client.guilds.get(message.guildID);
        embed.setDescription(`You Have Been Warned in \`${j === null || j === void 0 ? void 0 : j.name}\``);
        embed.addField("__**Reason: **__", reason, true);
        client.createMessage(memberDm.id, { embed: embed });
        embed.setDescription(`Warned User ${usertobewarned.mention}`);
        message.channel.createMessage({ embed: embed });
    });
});
exports.help = {
    name: "addWarn",
    description: "Add Warn To User",
    usage: "-addwarn <@user> [reason]",
    example: "-ban @wumpus 7 stealing my cake",
    perms: []
};
exports.conf = {
    aliases: ['warn', 'w'],
    cooldown: 5 // Seconds
};
