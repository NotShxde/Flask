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
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    let prefix = client.config.prefix;
    if (!args[0]) {
        // This will turn the folder (category) into array.
        let module = Array.from(client.helps);
        // This will hide a folder from display that includes "hide: true" in their module.json
        if (!client.config.owners.includes(message.author.id))
            module = Array.from(client.helps).filter((x) => !x.hide);
        console.log(module);
        const embed = new embed_1.Embed()
            .setColor(0x1d1d1d)
            .setTimestamp(new Date())
            .setDescription(`Type \`${prefix}help [command]\` to get more specific information about a command.`)
            .setAuthor("Flask: Help", `https://discord.gg/xGr2raC`, client.user.avatarURL)
            .setFooter(`Flask`, client.user.avatarURL);
        for (const mod of module) {
            console.log(mod[1].cmds);
            // You can change the .join(" | ") to commas, dots or every symbol.
            embed.addField(`${mod[1].name}`, mod[1].cmds.map((x) => `\`${x}\``).join(","));
        }
        return message.channel.createMessage({ embed: embed });
    }
    else {
        let cmd = args[0];
        // If the user type the [command], also with the aliases.
        if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            let name = command.help.name; // The command name.
            let desc = command.help.description; // The command description.
            let cooldown = command.conf.cooldown + " second(s)"; // The command cooldown.
            let aliases = command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "No aliases provided.";
            let usage = command.help.usage ? command.help.usage : "No usage provided.";
            let example = command.help.example ? command.help.example : "No example provided.";
            let embed = new embed_1.Embed()
                .setColor(0x1d1d1d)
                .setTitle(name)
                .setDescription(desc)
                .setThumbnail(client.user.avatarURL)
                .setFooter("[] optional, <> required. Don't includes these things while typing a command.", client.user.avatarURL)
                .addField("Cooldown", cooldown)
                .addField("Aliases", aliases, true)
                .addField("Usage", usage, true)
                .addField("Example", example, true);
            return message.channel.createMessage({ embed: embed });
        }
        else {
            // If the user type the wrong command.
            return message.channel.createMessage({ embed: { description: "Unknown command." } });
        }
    }
});
exports.help = {
    name: "help",
    description: "Displays Commands About THe Bit",
    usage: "-help",
    example: "-help ping"
};
exports.conf = {
    aliases: ['hp'],
    cooldown: 5 // Seconds
};
