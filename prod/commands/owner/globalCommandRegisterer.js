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
let ttlcmdiisue = 0;
exports.run = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    const arr = Array.from(client.commands.values());
    arr.forEach((k) => {
        (() => {
            let cmdname = k.help.name;
            let desc = k.help.description;
            client.createCommand({
                name: cmdname,
                description: desc,
                type: 1
            })
                .then(() => ttlcmdiisue + 1)
                .catch(console.error);
        })();
    });
    console.log(ttlcmdiisue);
    const ttlguild = client.guilds.size;
    message.channel.createMessage({ content: `Issued  A Total Of ${ttlcmdiisue} Across ${ttlguild}` });
});
exports.help = {
    name: "gcr",
    description: "Global Command Registerar",
    usage: "!gcr",
    example: "!gcr"
};
exports.conf = {
    aliases: ['gcr'],
    cooldown: 60 // Seconds
};
