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
const colors_1 = require("../../utils/colors");
const embed_1 = require("../../utils/embed");
const permissionInt_1 = require("../../utils/permissionInt");
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let usr = client.user.id;
    let em = new embed_1.Embed()
        .setAuthor("Flask: About", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setFooter("Flask ", client.user.avatarURL)
        .setColor(colors_1.Colors.DEFAULT_EMBED_COLOR)
        .setDescription("`Flask`, A Clean And Neat Moderation Bot For All Your Server Need's\n **Hassle Free And Easily**")
        .addField("Created By NotShade#1300", `<t:1624303861:D> `)
        .addField(`Using Eris v${eris_1.default.VERSION}`, `Running Node ${process.version}`)
        .addField("**Links**", "[Support](https://discord.gg/xGr2raC) | [Website](https://discord.com)");
    //.setImage( client.user.dynamicAvatarURL("png",256))
    message.channel.createMessage({ embed: em });
});
exports.help = {
    name: "about",
    description: "Displays About Section",
    usage: "-about",
    example: "-about",
    perms: [permissionInt_1.Permission.SEND_MESSAGES]
};
exports.conf = {
    aliases: ["botinfo"],
    cooldown: 1 // Seconds
};
