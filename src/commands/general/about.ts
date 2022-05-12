import Eris from "eris";
import { Colors } from "../../utils/colors";
import { Embed } from "../../utils/embed";
import { pmention } from "../../utils/parse";
import { Permission } from "../../utils/permissionInt";

exports.run = async (client: Eris.Client, message:Eris.Message,args:any) => {
  let usr = client.user.id;
  let em = new Embed()
      .setAuthor("Flask: About","https://invite.giveawayboat.com/",client.user.avatarURL)
      .setTimestamp(new Date())
      .setFooter("Flask ",client.user.avatarURL)
      .setColor(Colors.DEFAULT_EMBED_COLOR)
      .setDescription("`Flask`, A Clean And Neat Moderation Bot For All Your Server Need's\n **Hassle Free And Easily**")
      .addField("Created By NotShade#1300",`<t:1624303861:D> `)
      .addField(`Using Eris v${Eris.VERSION}`,`Running Node ${process.version}`)
      .addField("**Links**","[Support](https://discord.gg/xGr2raC) | [Website](https://discord.com)")

      //.setImage( client.user.dynamicAvatarURL("png",256))

      message.channel.createMessage({embed:em})
};

exports.help = {
  name: "about",
  description: "Displays About Section",
  usage: "-about",
  example: "-about",
  perms:[Permission.SEND_MESSAGES]
};

exports.conf = {
  aliases: ["botinfo"],
  cooldown: 1 // Seconds
};
