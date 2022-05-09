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
exports.run = (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
    const startTime = Date.now();
    const messageSent = yield message.channel.createMessage('ping');
    return messageSent.edit(`~~Baguette~~ Pong | \`${Date.now() - startTime}\`ms`);
    /*
    message.channel.createMessage({content: "pinging..."}).then((m:any) =>{
        let ping = m.createdAt - message.createdAt
        let choices = ["Is this really my ping?" , "Is it ok?I cant look" , "I hope it isn't bad"]
        let responce:any = [Math.floor(Math.random()* choices.length)]
  
        m.edit(`${choices[responce]}\n**Bot Latency**:${ping}\n**Api Latency**:${client.author.}`)
    })
    **/
});
exports.help = {
    name: "ping",
    description: "Displays Bots Ping",
    usage: "Ping",
    example: "!ping"
};
exports.conf = {
    aliases: [],
    cooldown: 5
};
