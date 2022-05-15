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
const database_1 = require("../database");
const embed_1 = require("../utils/embed");
module.exports = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(message);
    let em = new embed_1.Embed();
    em.setFooter(`ID: ${message[0].id}`, client.user.avatarURL)
        .setAuthor("Message Deleted", "https://invite.giveawayboat.com/", client.user.avatarURL);
    let toggle = (yield database_1.db.query(`
        SELECT enabled FROM audit_log WHERE guild_id = ${message[0].guildID}
        `)).rows[0];
    if (toggle == "f") {
        return;
    }
    let d = (yield database_1.db.query(`
        SELECT audit_id FROM audit_log WHERE guild_id = ${message[0].guildID}
        `)).rows[0].audit_id;
    console.log(d);
    /*
    em.setDescription(`Message Deleted in ${message.channel.mention} by ${message.author.mention} \n ${message.content}`)
    em.setAuthor(`Message Deleted`,"https://invite.giveawayboat.com/",message.author.avatarURL)
        return client.createMessage(d,{embed:em})
*/
});
