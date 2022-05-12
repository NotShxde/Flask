import { channel } from "diagnostics_channel";
import Eris, { GuildChannel } from "eris";
import { Embed } from "../../utils/embed";
import { Permission } from "../../utils/permissionInt";

  
exports.run = async (client: any, message: any,args:any) => {
    let em = new Embed()
      .setAuthor("Flask: Purge","https://invite.giveawayboat.com/",client.user.avatarURL)
      .setTimestamp(new Date())
      .setFooter("Flask ",client.user.avatarURL)

    let self = message.channel.permissionsOf(client.user.id);
    if(!self.manageMessages){
      em.setDescription("I Dont Have Permission `MANAGE_MESSAGES` to Do That")  
      let number = args[0];
      if(isNaN(number)){
        em.setDescription("That is Not An Number")
        return message.channel.createMessage({embed:em})

      }
      number = parseInt(number)
      if( !number || number <1 ||number > 100 ){
          em.setDescription("Please Keep The NUmber Between 1 - 100")
          return message.channel.createMessage({embed:em})
      }

      await message.delete()

      return message.channel.purge({limit: number})
      .then((amount:any) => {
        em.setDescription(`Deleted ${amount} Messages` )
        return message.channel.createMessage({embed:em})
      })
      .catch((err:any) => {
        console.log(err);
      })
};
}
exports.help = {
  name: "purge",
  description: "purges messages in a channel",
  usage: "-purge <messages to be removed>",
  example: "-purge 5",
  perms:[Permission.ADMINISTRATOR,Permission.MANAGE_MESSAGES]
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Seconds
};
