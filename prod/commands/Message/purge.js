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
        .setAuthor("Flask: Purge", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setFooter("Flask ", client.user.avatarURL);
    let self = message.channel.permissionsOf(client.user.id);
    if (!self.manageMessages) {
        em.setDescription("I Dont Have Permission `MANAGE_MESSAGES` to Do That");
        let number = args[0];
        if (isNaN(number)) {
            em.setDescription("That is Not An Number");
            return message.channel.createMessage({ embed: em });
        }
        number = parseInt(number);
        if (!number || number < 1 || number > 100) {
            em.setDescription("Please Keep The NUmber Between 1 - 100");
            return message.channel.createMessage({ embed: em });
        }
        yield message.delete();
        return message.channel.purge({ limit: number })
            .then((amount) => {
            em.setDescription(`Deleted ${amount} Messages`);
            return message.channel.createMessage({ embed: em });
        })
            .catch((err) => {
            console.log(err);
        });
    }
    ;
});
exports.help = {
    name: "purge",
    description: "purges messages in a channel",
    usage: "-purge <messages to be removed>",
    example: "-purge 5",
    perms: [permissionInt_1.Permission.ADMINISTRATOR, permissionInt_1.Permission.MANAGE_MESSAGES]
};
exports.conf = {
    aliases: [],
    cooldown: 5 // Seconds
};
