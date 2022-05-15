import Eris from "eris";
import { Colors, hexRegex } from "../../utils/colors";
import { Embed } from "../../utils/embed";
import { pmention,prole } from "../../utils/parse";
import { Permission } from "../../utils/permissionInt";


exports.run = async (client:Eris.Client , message:any,args:any[]) => {
    let em = new Embed()
.setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
if (!args[0]) {
    em.setDescription("Please Provide a User To Remove The Role To")
    return message.channel.createMessage({ embed: em })
  }
  if (!args[1]) {
    em.setDescription(`Please Specify The Role To Be Removed`)
    return message.channel.createMessage({ embed: em })
  }


  
///////////////////////////////
  //        0     1      2    3
  //-role add @wumpy @762672 idk
  //let reason;
  let ruser: any = pmention(args[0], client)//user
  let rrole = prole(message, args[1])
  let rreason;
  if(!args[2]){
    rreason = "Not Specified"
  }else{
      args.splice(0,2)
    rreason = args.join(" ")
  }

  try { message.member?.guild.removeMemberRole(ruser.id, rrole, rreason) }
  catch (error) { console.error(error); }
  finally {
    em.setDescription(`Removed The Role ${args[1]} From ${ruser?.mention}`)
    message.channel.createMessage({ embed: em })
  }
}
exports.help = {
    name: "removeRole",
    description: "removes role from the specified user",
    usage: "-removeRole <@user> <role> [reason]",
    example: "-removeRole @wumpy @762672 He Deserves It",
    perms:[Permission.MANAGE_ROLES]
  };
  
  exports.conf = {
    aliases: ['rr','subtractRole'],
    cooldown: 5 // Seconds
  };
  