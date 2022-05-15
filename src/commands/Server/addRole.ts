import Eris from "eris";
import { Colors, hexRegex } from "../../utils/colors";
import { Embed } from "../../utils/embed";
import { pmention,prole } from "../../utils/parse";
import { Permission } from "../../utils/permissionInt";
exports.run = async (client:Eris.Client , message:any,args:any[]) => {
    let hex:string = "";
    let em = new Embed()
      .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)

      if (!args[0]) {
        em.setDescription("Please Provide a User To Add The Role To")
        return message.channel.createMessage({ embed: em })
      }
      if (!args[1]) {
        em.setDescription(`Please Specify The Role To Be Added`)
        return message.channel.createMessage({ embed: em })
      }
      let areason;

      //////////////////////////////////////
      let auser:any = await pmention(args[0], client)//user
      let arole = await prole(message, args[1])
      
      //           0      1    2
      //-role  @wumpy @762672 idk
      if(!args[2]){
        areason = "Not Specified"
      }else{
          args.splice(0,2)
        areason = args.join(" ")
      }
      try { message.member?.guild.addMemberRole(auser.id, arole, areason) }
      catch (error) { console.error(error); }
      finally {
        em.setDescription(`Added The Role ${args[1]} To ${auser?.mention}`)
        message.channel.createMessage({ embed: em })
      }

}

exports.help = {
    name: "addRole",
    description: "adds role to the specified user",
    usage: "-addRole <@user> <role> [reason]",
    example: "-addRole @wumpy @762672 He Deserves It",
    perms:[Permission.MANAGE_ROLES]
  };
  
  exports.conf = {
    aliases: ['ar','giveRole'],
    cooldown: 5 // Seconds
  };
  