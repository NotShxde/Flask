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
const ms_1 = __importDefault(require("ms"));
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const colors_1 = require("../../utils/colors");
const embed_1 = require("../../utils/embed");
const permissionInt_1 = require("../../utils/permissionInt");
const parseTime = require("parse-duration").default;
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let embed = new embed_1.Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setColor(colors_1.Colors.DEFAULT_EMBED_COLOR);
    let member = message.mentions;
    if (member.length < 1) {
        embed.setDescription("Mention The User First");
        return message.channel.createMessage({ embed: embed });
    }
    let time = args.slice(1).join(" ");
    if (!time) {
        embed.setDescription("Specify The Time");
        return message.channel.createMessage({ embed: embed });
    }
    let parsedTime = parseTime(time);
    if (parsedTime < (0, ms_1.default)("1ms") || parsedTime > (0, ms_1.default)("28d")) {
        embed.setDescription("Please Keep Input Between `1 millisecond` and `28 Day's`");
        return message.channel.createMessage({ embed: embed });
    }
    let combineData = new Date(Date.now() + parsedTime);
    let estimation = combineData.getTime() - Date.now();
    let tkn = `Bot ${process.env.SECRET}`;
    const superagent = require('superagent');
    return superagent.patch(`https://discord.com/api/v9/guilds/${message.guildID}/members/${member[0].id}`)
        .send({ communication_disabled_until: combineData })
        .set({ "Authorization": tkn })
        .then(() => {
        embed.setDescription(`User __\`${member[0].username}\`__ has been put on a \`TimeOut\` for about \`${(0, pretty_ms_1.default)(estimation, { verbose: true })}\` `);
        return message.channel.createMessage({ embed: embed });
    })
        .catch((err) => {
        console.error(err);
        embed.setDescription(`An Error Occured: ${err} `);
        return message.channel.createMessage({ embed: embed });
    });
});
exports.help = {
    name: "timeout",
    description: "Set Timeout For The User",
    usage: "-",
    example: "-ban @wumpus 7 stealing my cake",
    perms: [permissionInt_1.Permission.MANAGE_MESSAGES, permissionInt_1.Permission.MANAGE_EMOJI_AND_STICKERS]
};
exports.conf = {
    aliases: ['tm'],
    cooldown: 5 // Seconds
};
