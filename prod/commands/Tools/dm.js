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
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let em = new embed_1.Embed()
        .setAuthor("Flask: DM", "https://invite.giveawayboat.com/", client.user.avatarURL);
    let j = message.mentions[0];
    if (!j) {
        em.setDescription("Please Provide a User To Dm");
        return message.channel.createMessage({ embed: em });
    }
    let memberDm = yield client.getDMChannel(j.id);
    let useless = args.splice(0, 1);
    let la = args.join(" ");
    if (!la) {
        em.setDescription("Please Provide Message To Send");
        return message.channel.createMessage({ embed: em });
    }
    client.createMessage(memberDm.id, { content: la });
    em.setDescription(`Succesfully Sent DM to ${j.mention}`);
    message.channel.createMessage({ embed: em });
});
exports.help = {
    name: "dm",
    description: "dms a user",
    usage: "-dm <@user>",
    example: "-dm @wumpy",
    perms: [permissionInt_1.Permission.MANAGE_MESSAGES]
};
exports.conf = {
    aliases: [],
    cooldown: 5 // Seconds
};
