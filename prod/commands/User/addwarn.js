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
const colors_1 = require("../../utils/colors");
const embed_1 = require("../../utils/embed");
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let embed = new embed_1.Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setColor(colors_1.Colors.DEFAULT_EMBED_COLOR);
    //-ban @wumpus  stealing my cake 7
    //       0          2,3,4,5,6,7  pop()
    let usertobebanned = message.mentions[0];
    if (!usertobebanned) {
        embed.setDescription("Please Provide The User You Want To Ban");
        return message.channel.createMessage({ embed: embed });
    }
    try {
        const n = args;
        let uselwss = n.shift();
        let daystobem = n.join(" ");
        if (!daystobem)
            daystobem = 'No Reason Specified';
        let memberDm = yield client.getDMChannel(usertobebanned.id)
            .catch(console.error);
        let j = client.guilds.get(message.guildID);
        embed.setDescription(`You Have Been Banned From \`${j === null || j === void 0 ? void 0 : j.name}\``);
        embed.addField("__**Reason: **__", daystobem, true);
        client.createMessage(memberDm.id, { embed: embed })
            .catch(console.error);
        embed.setDescription(`User ${usertobebanned.mention} Have Been Banned From ${j === null || j === void 0 ? void 0 : j.name}`);
        yield client.banGuildMember(message.guildID, usertobebanned.id, 0, daystobem);
        return message.channel.createMessage({ embed: embed });
    }
    catch (err) {
        console.error(err);
    }
});
exports.help = {
    name: "addWarn",
    description: "Add Warn To User",
    usage: "-addwarn <@user> [reason]",
    example: "-ban @wumpus 7 stealing my cake",
    perms: []
};
exports.conf = {
    aliases: ['bean'],
    cooldown: 5 // Seconds
};
