import Eris from "eris";
import { Embed } from "../../utils/embed";
import { Permission } from "../../utils/permissionInt";
//import {Flask} from "../../server"
exports.run = async (client:any, message:Eris.Message,args:any[]) => {
    let name = args.join(" ")
    message.member?.edit({nick: name})
    let em = new Embed()
    .setFooter("Flask ",client.user.avatarURL)
    .setAuthor("Nickname Edited","https://invite.giveawayboat.com/",client.user.avatarURL)
    .setDescription(`Nick Name Sucessfuly Edited To '${name}'`)
    message.channel.createMessage({embed: em})
};

exports.help = {
  name: "nick",
  description: "username",
  usage: "-nick <user> <nickname> [reason]",
  example: "",
  perms: [Permission.CHANGE_NICKNAME]
};

exports.conf = {
  aliases: ["n"],
  cooldown: 5 // Seconds
};
