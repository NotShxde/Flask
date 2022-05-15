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
const index_1 = require("../../database/index");
const embed_1 = require("../../utils/embed");
const permissionInt_1 = require("../../utils/permissionInt");
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let embed = new embed_1.Embed()
        .setAuthor("Flask: Uptime", "https://invite.giveawayboat.com/", client.user.avatarURL);
    ////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////
    //0 - set,
    //1 - <prefix>
    if (!args[0]) {
        embed.setDescription("Please Enter The Prefix You Want To Set For The Server");
        return message.channel.createMessage({ embed: embed });
    }
    if (args[0]) {
        if (args[0].length > 5) {
            embed.setDescription("Prefix Must Be Of Maximuim Of 5 Charecters");
            return message.channel.createMessage({ embed: embed });
        }
        const updatedprefix = (yield index_1.db.query(`
                UPDATE guild_data
                SET prefix = '${args[0]}'
                WHERE guild_id = ${message.guildID};
                `));
        const getprefix = (yield index_1.db.query(`
                SELECT * FROM guild_data 
                WHERE guild_id = ${message.guildID};
                `)).rows[0].prefix;
        embed.setDescription(`Sucessfully set prefix to ${getprefix}`);
        yield message.channel.createMessage({ embed: embed });
        return;
    }
});
exports.help = {
    name: "setPrefix",
    description: "Displays Bots Prefix",
    usage: "-setPrefix",
    example: "-setPrefix !",
    perms: [permissionInt_1.Permission.MANAGE_GUILD, permissionInt_1.Permission.ADMINISTRATOR]
};
exports.conf = {
    aliases: ["sp"],
    cooldown: 5
};
