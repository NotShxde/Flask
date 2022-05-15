import Eris from "eris";
import { Embed } from "../../utils/embed";
import { pmention } from "../../utils/parse";
import { Permission } from "../../utils/permissionInt";

exports.run = async (client: Eris.Client, message:Eris.Message,args:any) => {
  let usr = args[0];
  if(!usr){
      usr = message.author.mention;
  }
  let user = pmention(usr,client)
  let em = new Embed()
      .setAuthor("Flask: Avatar","https://invite.giveawayboat.com/",client.user.avatarURL)
      .setTimestamp(new Date())
      .setImage(user.dynamicAvatarURL("webp",256))
      .setFooter("Flask ",client.user.avatarURL)
      message.channel.createMessage({embed:em})
};

exports.help = {
  name: "avatar",
  description: "Displays Avatar",
  usage: "-avatar @user",
  example: "-avatar @wumpus",
  perms:[Permission.SEND_MESSAGES]
};

exports.conf = {
  aliases: ["av"],
  cooldown: 2 // Seconds
};
