import Eris from "eris";
import ms from "ms";
import { db } from "../../database";
import { Colors } from "../../utils/colors";
import { Embed } from "../../utils/embed";
import { Permission } from "../../utils/permissionInt";

exports.run = async (client:Eris.Client, message:Eris.Message,args:any[]) => {
    let embed = new Embed()
.setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
.setTimestamp(new Date())
.setColor(Colors.DEFAULT_EMBED_COLOR)
//id | issuedms | guild_id | gwarn_id | user_id | reason
//        0   1   
//warn @user reason
let j = message.mentions[0]
if(!j){
    embed.setDescription("Please Mention A USer")
    return message.channel.createMessage({embed:embed})
    
}
const getprefix = (
  await db.query(`
  SELECT * FROM warn_data
  WHERE user_id = ${j.id}
  `)
)
                
console.log(getprefix);
let totlafound = getprefix.rowCount
  getprefix.rows.forEach((u:any)=>{
    embed.addField("*—> *","\u200b",true)
    embed.addField("**UUID**: ",`\`${u.id}\``,true)
    embed.addField('**Issued Date**: ',`<t:${u.issuedms}:D>`),true
    embed.addField(`**Reason**: `,`\`${u.reason}\``, true)
  })
  embed.setDescription(`${totlafound} Warns Found`)

  message.channel.createMessage({embed:embed})
}
exports.help = {
  name: "warns",
  description: "Shows Warnings of User Have",
  usage: "-warns <@user>",
  example: "-warns @wumpus",
  perms:[Permission.MANAGE_MESSAGES,Permission.ADMINISTRATOR]
};

exports.conf = {
  aliases: ['warnings'],
  cooldown: 5 // Seconds
};
