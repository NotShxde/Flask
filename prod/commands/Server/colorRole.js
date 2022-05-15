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
    let hex = "";
    let em = new embed_1.Embed();
    if (!args[0]) {
        em.setDescription("Please Provide a Role To Be Colored");
        return message.channel.createMessage({ embed: em });
    }
    if (!args[1]) {
        em.setDescription(`Type \`-role color @role <Color / Hexcode>\` \n  Example \`#5865F2\` - Blurple `);
        em.setFooter("Use Hexcode or Colors Given Above ", client.user.avatarURL);
        Object.keys(colors_1.Colors).forEach((color) => {
            //@ts-ignore
            em.addField(`${colors_1.Colors[color]}`, `\`${color}\``, false);
        });
        return message.channel.createMessage({ embed: em });
    }
    let creason;
    if (args[1]) {
        if (args[1].startsWith("#")) {
            const c = colors_1.hexRegex.test(args[2]);
            if (c == false) {
                em.setDescription("Invalid Hex Code / Color, Please Check Again!");
                em.setColor(colors_1.Colors.DEFAULT_EMBED_COLOR);
                return message.channel.createMessage({ embed: em });
            }
            else {
                hex = args[1];
            }
        }
        else {
            const cc = Object.keys(colors_1.Colors).map((clr) => clr === args[1].toUpperCase());
            if (cc == false) {
                em.setDescription("The Color You Entered Is Wring, Please Check Again");
                return message.channel.createMessage({ embed: em });
            }
            else {
                // @ts-ignore:next-line
                hex = colors_1.Colors[args[1].toUpperCase()];
            }
        }
    }
    let hextobedone = hex.replace("#", "0x");
    let k = parseInt(hextobedone, 16);
    let crole = (0, parse_1.prole)(message, args[0]);
    if (!args[2]) {
        creason = "Not Specified";
    }
    else {
        args.splice(0, 2);
        creason = args.join(" ");
    }
    try {
        console.log(message.guildID + crole);
        client.editRole(message.guildID, crole, {
            color: k
        }, creason);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        em.setDescription(`Edited Role <@&${crole}> to the color ${hex} `);
        return message.channel.createMessage({ embed: em });
    }
});
exports.help = {
    name: "colorRole",
    description: "adds color to the specified role",
    usage: "-colorRole <@role> <color>",
    example: "-colorRole @7282 RED",
    perms: [permissionInt_1.Permission.MANAGE_ROLES]
};
exports.conf = {
    aliases: ['cr', 'grafittirole'],
    cooldown: 5 // Seconds
};
