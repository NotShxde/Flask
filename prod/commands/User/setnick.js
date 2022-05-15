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
//import {Flask} from "../../server"
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let name = args.join(" ");
    (_a = message.member) === null || _a === void 0 ? void 0 : _a.edit({ nick: name });
    let em = new embed_1.Embed()
        .setFooter("Flask ", client.user.avatarURL)
        .setAuthor("Nickname Edited", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setDescription(`Nick Name Sucessfuly Edited To '${name}'`);
    message.channel.createMessage({ embed: em });
});
exports.help = {
    name: "nick",
    description: "username",
    usage: "-nick <user> <nickname> [reason]",
    example: "",
    perms: [permissionInt_1.Permission.CHANGE_NICKNAME]
};
exports.conf = {
    aliases: ["n"],
    cooldown: 5 // Seconds
};
