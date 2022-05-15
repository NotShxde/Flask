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
    var _a;
    let hex = "";
    let em = new embed_1.Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL);
    if (!args[0]) {
        em.setDescription("Please Provide a User To Add The Role To");
        return message.channel.createMessage({ embed: em });
    }
    if (!args[1]) {
        em.setDescription(`Please Specify The Role To Be Added`);
        return message.channel.createMessage({ embed: em });
    }
    let areason;
    //////////////////////////////////////
    let auser = yield (0, parse_1.pmention)(args[0], client); //user
    let arole = yield (0, parse_1.prole)(message, args[1]);
    //           0      1    2
    //-role  @wumpy @762672 idk
    if (!args[2]) {
        areason = "Not Specified";
    }
    else {
        args.splice(0, 2);
        areason = args.join(" ");
    }
    try {
        (_a = message.member) === null || _a === void 0 ? void 0 : _a.guild.addMemberRole(auser.id, arole, areason);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        em.setDescription(`Added The Role ${args[1]} To ${auser === null || auser === void 0 ? void 0 : auser.mention}`);
        message.channel.createMessage({ embed: em });
    }
});
exports.help = {
    name: "addRole",
    description: "adds role to the specified user",
    usage: "-addRole <@user> <role> [reason]",
    example: "-addRole @wumpy @762672 He Deserves It",
    perms: [permissionInt_1.Permission.MANAGE_ROLES]
};
exports.conf = {
    aliases: ['ar', 'giveRole'],
    cooldown: 5 // Seconds
};
