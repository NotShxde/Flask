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
const colors_1 = require("../../utils/colors");
const embed_1 = require("../../utils/embed");
const parse_1 = require("../../utils/parse");
const permissionInt_1 = require("../../utils/permissionInt");
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let hex = "";
    let em = new embed_1.Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL);
    //Understand Input
    switch (args[0]) {
        //add role
        case "add":
            ///////////////////////////////////
            if (!args[1]) {
                em.setDescription("Please Provide a User To Add The Role To");
                return message.channel.createMessage({ embed: em });
            }
            if (!args[2]) {
                em.setDescription(`Please Specify The Role To Be Added`);
                return message.channel.createMessage({ embed: em });
            }
            let areason;
            if (!args[3]) {
                areason = 'Not Specified';
            }
            else {
                areason = args[3];
            }
            //////////////////////////////////////
            let auser = (0, parse_1.pmention)(args[1], client); //user
            let arole = (0, parse_1.prole)(message, args[2]);
            //        0     1      2    3
            //-role add @wumpy @762672 idk
            try {
                (_a = message.member) === null || _a === void 0 ? void 0 : _a.guild.addMemberRole(auser.id, arole, areason);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                em.setDescription(`Added The Role ${args[2]} To ${auser === null || auser === void 0 ? void 0 : auser.mention}`);
                message.channel.createMessage({ embed: em });
            }
            break;
        /////
        case "remove":
            ///////////////////////
            if (!args[1]) {
                em.setDescription("Please Provide a User To Remove The Role To");
                return message.channel.createMessage({ embed: em });
            }
            if (!args[2]) {
                em.setDescription(`Please Specify The Role To Be Removed`);
                return message.channel.createMessage({ embed: em });
            }
            let reason;
            if (!args[3]) {
                reason = 'Not Specified';
            }
            else {
                reason = args[3];
            }
            ///////////////////////////////
            //        0     1      2    3
            //-role add @wumpy @762672 idk
            //let reason;
            let ruser = (0, parse_1.pmention)(args[1], client); //user
            let rrole = (0, parse_1.prole)(message, args[2]);
            let rreason;
            try {
                (_b = message.member) === null || _b === void 0 ? void 0 : _b.guild.removeMemberRole(ruser.id, rrole, rreason);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                em.setDescription(`Removed The Role ${args[2]} From ${ruser === null || ruser === void 0 ? void 0 : ruser.mention}`);
                message.channel.createMessage({ embed: em });
            }
            break;
        case 'color':
            //            0   1       2 
            //-role color @762672 color|built in 
            if (!args[1]) {
                em.setDescription("Please Provide a Role To Be Colored");
                return message.channel.createMessage({ embed: em });
            }
            if (!args[2]) {
                em.setDescription(`Type \`-role color @role <Color / Hexcode>\` \n  Example \`#5865F2\` - Blurple `);
                em.setFooter("Use Hexcode or Colors Given Above ", client.user.avatarURL);
                Object.keys(colors_1.Colors).forEach((color) => {
                    //@ts-ignore
                    em.addField(`${colors_1.Colors[color]}`, `\`${color}\``, false);
                });
                return message.channel.createMessage({ embed: em });
            }
            let creason;
            if (!args[3]) {
                creason = "Not Specified";
            }
            else {
                reason = args[3];
            }
            if (args[2]) {
                if (args[2].startsWith("#")) {
                    const c = colors_1.hexRegex.test(args[2]);
                    if (c == false) {
                        em.setDescription("Invalid Hex Code / Color, Please Check Again!");
                        em.setColor(colors_1.Colors.DEFAULT_EMBED_COLOR);
                        return message.channel.createMessage({ embed: em });
                    }
                    else {
                        hex = args[2];
                    }
                }
                else {
                    const cc = Object.keys(colors_1.Colors).map((clr) => clr === args[2].toUpperCase());
                    if (cc == false) {
                        em.setDescription("The Color You Entered Is Wring, Please Check Again");
                        return message.channel.createMessage({ embed: em });
                    }
                    else {
                        // @ts-ignore:next-line
                        hex = colors_1.Colors[args[2].toUpperCase()];
                    }
                }
            }
            let hextobedone = hex.replace("#", "0x");
            let k = parseInt(hextobedone, 16);
            let crole = (0, parse_1.prole)(message, args[1]);
            try {
                console.log(message.guildID + crole);
                client.editRole(message.guildID, crole, {
                    color: k
                });
            }
            catch (error) {
                console.error(error);
            }
            finally {
                em.setDescription(`Edited Role <@&${crole}> to the color ${hex} `);
                return message.channel.createMessage({ embed: em });
            }
    }
});
/*let em = new Embed()
.setAuthor("Nickname Edited","https://invite.giveawayboat.com/",client.user.avatarURL)
.setDescription(`Role ${roler} Was Added To User ${args[0]}`)
*/
exports.help = {
    name: "role",
    description: "add/remove/modify a role",
    usage: "-role <add/remove/modify> <user> <role> [reason]",
    example: "-role add @wumpus @admin",
    perms: [permissionInt_1.Permission.MANAGE_ROLES]
};
exports.conf = {
    aliases: ["r"],
    cooldown: 3 // Seconds
};
