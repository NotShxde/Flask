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
const parse_1 = require("../../utils/parse");
const permissionInt_1 = require("../../utils/permissionInt");
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let usr = args[0];
    if (!usr) {
        usr = message.author.mention;
    }
    let user = (0, parse_1.pmention)(usr, client);
    let em = new embed_1.Embed()
        .setAuthor("Flask: Avatar", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setImage(user.dynamicAvatarURL("webp", 256))
        .setFooter("Flask ", client.user.avatarURL);
    message.channel.createMessage({ embed: em });
});
exports.help = {
    name: "avatar",
    description: "Displays Avatar",
    usage: "-avatar @user",
    example: "-avatar @wumpus",
    perms: [permissionInt_1.Permission.SEND_MESSAGES]
};
exports.conf = {
    aliases: ["av"],
    cooldown: 2 // Seconds
};
