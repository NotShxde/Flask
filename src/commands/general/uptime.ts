import Eris from "eris";
import { Embed } from "../../utils/embed";
import { Permission } from "../../utils/permissionInt";
const ms = require("ms");
exports.run = async (client: Eris.Client, message:any) => {
    let embed = new Embed()
    .setAuthor("Flask: Uptime","https://invite.giveawayboat.com/",client.user.avatarURL)
    .addField("**Active For**:",ms(client.uptime, {long : true}))
    .addField("**Total Shards**",`${client.shards.size}`)
    .setColor("#15f153")
    .setFooter("Flask",client.user.avatarURL)
    .setTimestamp(new Date())
    
    message.channel.createMessage({embed:embed});
};

exports.help = {
  name: "uptime",
  description: "shows how long bot has been active",
  usage: "!uptime",
  example: "!uptime",
  perms: [Permission.SEND_MESSAGES]
};

exports.conf = {
  aliases: ["up"],
  cooldown: 5 // Seconds
};
