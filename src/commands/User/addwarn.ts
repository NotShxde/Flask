import Eris from "eris";
import ms from "ms";
import { db } from "../../database";
import { Colors } from "../../utils/colors";
import { Embed } from "../../utils/embed";

exports.run = async (client:Eris.Client, message:Eris.Message,args:any[]) => {
    let embed = new Embed()
.setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
.setTimestamp(new Date())
.setColor(Colors.DEFAULT_EMBED_COLOR)
//id | issuedms | guild_id | gwarn_id | user_id | reason
//        0   1   
//warn @user reason
embed.setFooter("Flask ",client.user.avatarURL)
if(!args[0]){
  embed.setDescription("Please Mention a User To Warn");
  message.channel.createMessage({embed:embed})
}
let reason = "Not Specified"
if(args[1]){
  let v = args.splice(0,1)
  console.log(args)
  reason = args.join(" ");
}
var date = new Date();// some mock date
//@ts-ignore
let milliseconds = Math.floor(new Date().getTime() / 1000)
console.log(milliseconds);

let usertobewarned:any = message.mentions[0];
if(!usertobewarned){
  
    embed.setDescription("Please Mention A User To Warn")
    return message.channel.createMessage({embed:embed})
  }

let memberDm = await client.getDMChannel(usertobewarned.id);

  await db.query(`
  INSERT INTO warn_data(issuedms,guild_id,user_id,reason)
  VALUES('${milliseconds}','${message.guildID}','${usertobewarned.id}','${reason}');
  
  `).catch(console.error).finally(() => {
    //@ts-ignore
    let j = client.guilds.get(message.guildID)
  
    embed.setDescription(`You Have Been Warned in \`${j?.name}\``)
    embed.addField("__**Reason: **__",reason,true)
    
    client.createMessage(memberDm.id,{embed:embed})
  
    embed.setDescription(`Warned User ${usertobewarned.mention}`)
  message.channel.createMessage({embed:embed})
  })
};

exports.help = {
  name: "addWarn",
  description: "Add Warn To User",
  usage: "-addwarn <@user> [reason]",
  example: "-ban @wumpus 7 stealing my cake",
  perms:[]
};

exports.conf = {
  aliases: ['warn','w'],
  cooldown: 5 // Seconds
};
