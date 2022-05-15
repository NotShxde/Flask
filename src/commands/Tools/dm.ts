import Eris from "eris";
import { Colors, hexRegex } from "../../utils/colors";
import { Embed } from "../../utils/embed";
import { pmention,prole } from "../../utils/parse";
import { Permission } from "../../utils/permissionInt";


exports.run = async (client:Eris.Client , message:Eris.Message,args:any[]) => {
    let em = new Embed()
.setAuthor("Flask: DM", "https://invite.giveawayboat.com/", client.user.avatarURL)
let j = message.mentions[0]
if(!j) {em.setDescription("Please Provide a User To Dm")
return message.channel.createMessage({embed:em})}
let memberDm = await client.getDMChannel(j.id)
let useless = args.splice(0,1)
let la = args.join(" ");
if(!la) {em.setDescription("Please Provide Message To Send")
return message.channel.createMessage({embed:em})}
client.createMessage(memberDm.id,{content: la})
em.setDescription(`Succesfully Sent DM to ${j.mention}`)
message.channel.createMessage({embed:em})
}
exports.help = {
    name: "dm",
    description: "dms a user",
    usage: "-dm <@user>",
    example: "-dm @wumpy",
    perms:[Permission.MANAGE_MESSAGES]
  };
  
  exports.conf = {
    aliases: [],
    cooldown: 5 // Seconds
  };
  