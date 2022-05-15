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
    let em = new embed_1.Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL);
    if (!args[0]) {
        em.setDescription(" Please Enter A Sub Command \n `enable / disable`");
        return message.channel.createMessage({ embed: em });
    }
    let toggle = ["enable", 'disable'];
    if (!toggle.includes(args[0])) {
        em.setDescription(" Please Provide A Valid Sub Command \n `enable / disable`");
        return message.channel.createMessage({ embed: em });
    }
    if (args[0] == "enable") {
        let channel = args[1];
        if (!channel) {
            em.setDescription("Please Enter The Channel To Be Used As Audit Log");
            return message.channel.createMessage({ embed: em });
        }
        if (colors_1.channelHex.test(channel) == true) {
            let ch = /<#(\d{17,19})>/g;
            const k = channel.matchAll(ch).next();
            console.log(k);
            yield database_1.db.query(`
        UPDATE audit_log
        SET enabled = TRUE,
        audit_id = ${k.value[1]}
        WHERE guild_id = ${message.guildID};
        
        `, (err, res) => {
                if (err)
                    throw err;
                res;
            });
            em.setDescription(`The Audit Log Had Been Enabled For ${channel}`);
            message.channel.createMessage({ embed: em });
        }
        else {
            em.setDescription("Invalid Channel.");
            return message.channel.createMessage({ embed: em });
        }
    }
    else {
        let toggle = (yield database_1.db.query(`
        SELECT enabled FROM audit_log WHERE audit_id = ${message.guildID}
        `)).rows[0];
        if (toggle == "f") {
            em.setDescription("Already Disabled");
            return message.channel.createMessage({ embed: em });
        }
        yield database_1.db.query(`
        UPDATE audit_log SET enabled = FALSE WHERE guild_id = ${message.guildID}
        `);
        em.setDescription("DISABLED SUCESSFULLY");
        return message.channel.createMessage({ embed: em });
    }
});
exports.help = {
    name: "auditlog",
    description: "command related to audit log",
    usage: "-auditlog <enable/disable> <channel>",
    example: "-auditlog enable #lounge \n - auditlog disable #lounge",
    perms: [permissionInt_1.Permission.MANAGE_GUILD, permissionInt_1.Permission.ADMINISTRATOR]
};
exports.conf = {
    aliases: ['audit', 'log'],
    cooldown: 5 // Seconds
};
