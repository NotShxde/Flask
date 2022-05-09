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
module.exports = (client, guild) => __awaiter(void 0, void 0, void 0, function* () {
    const arr = Array.from(client.commands.values());
    arr.forEach((k) => {
        let cmdname = k.help.name;
        let desc = k.help.description;
        console.log(guild.id);
        client.createGuildCommand(guild.id, {
            name: cmdname,
            description: desc,
            type: 1
        }).then(() => console.log(`created ${k.help.name}`))
            .catch(console.error);
    });
});
