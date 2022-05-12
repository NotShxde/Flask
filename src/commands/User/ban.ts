import Eris from "eris";
import { Colors } from "../../utils/colors";
import { Embed } from "../../utils/embed";

exports.run = async (client:any, message:any,args:any[]) => {
    let embed = new Embed()
.setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
.setTimestamp(new Date())
.setColor(Colors.DEFAULT_EMBED_COLOR)
  //-ban @wumpus  stealing my cake 7
  //       0          2,3,4,5,6,7  pop()

  let usertobebanned = message.mentions[0];
  if(!usertobebanned){
    embed.setDescription("Please Provide The User You Want To Ban")   
    return message.channel.createMessage({embed:embed});
  }
  

  try{
    const n = args
      let uselwss = n.shift()
      let daystobem = n.join(" ");
  if(!daystobem) daystobem = 'No Reason Specified';
      let memberDm = await client.getDMChannel(usertobebanned.id)
      .catch(console.error)
    let j = client.guilds.get(message.guildID)
        embed.setDescription(`You Have Been Banned From \`${j?.name}\``)
        embed.addField("__**Reason: **__",daystobem,true)
      client.createMessage(memberDm.id,{embed:embed})
      .catch(console.error)
        embed.setDescription(`User ${usertobebanned.mention} Have Been Banned From ${j?.name}`)
        await client.banGuildMember(message.guildID,usertobebanned.id,0,daystobem)
      return message.channel.createMessage({embed:embed})
  }catch(err){console.error(err)}
};

exports.help = {
  name: "ban",
  description: "Ban the user",
  usage: "-ban <@user> [deleteMessageDays] [reason]",
  example: "-ban @wumpus 7 stealing my cake",
  perms:[]
};

exports.conf = {
  aliases: ['bean'],
  cooldown: 5 // Seconds
};
