import Eris from "eris";
import ms from "ms";
import prettyMilliseconds from "pretty-ms";
import { Colors } from "../../utils/colors";
import { Embed } from "../../utils/embed";
import { Permission } from "../../utils/permissionInt";
const parseTime = require("parse-duration").default;

exports.run = async (client: any, message: any, args: any[]) => {
    let embed = new Embed()
        .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)
        .setTimestamp(new Date())
        .setColor(Colors.DEFAULT_EMBED_COLOR)

    let member = message.mentions;
    if (member.length < 1) { embed.setDescription("Mention The User First") 
return message.channel.createMessage({embed:embed})}

    let time  = args.slice(1).join(" ");
    if (!time) { embed.setDescription("Specify The Time") 
return message.channel.createMessage({embed:embed})}
let parsedTime = parseTime(time);

if(parsedTime < ms("1ms") || parsedTime > ms("28d")){
    embed.setDescription("Please Keep Input Between `1 millisecond` and `28 Day's`") 
return message.channel.createMessage({embed:embed})
}
let combineData = new Date(Date.now() + parsedTime)
let estimation = combineData.getTime() - Date.now();
let tkn = `Bot ${process.env.SECRET}`

const superagent = require('superagent');
return superagent.patch(`https://discord.com/api/v9/guilds/${message.guildID}/members/${member[0].id}`)
.send({communication_disabled_until: combineData})

.set({"Authorization": tkn})
.then(()=>{
    embed.setDescription(`User __\`${member[0].username}\`__ has been put on a \`TimeOut\` for about \`${prettyMilliseconds(estimation, {verbose:true})}\` ` ) 
    return message.channel.createMessage({embed:embed})
})
.catch((err:any) => {
    console.error(err);
    embed.setDescription(`An Error Occured: ${err} `);
    return message.channel.createMessage({embed:embed})
})
};

exports.help = {
    name: "timeout",
    description: "Set Timeout For The User",
    usage: "-",
    example: "-ban @wumpus 7 stealing my cake",
    perms: [Permission.MANAGE_MESSAGES,Permission.MANAGE_EMOJI_AND_STICKERS]
};

exports.conf = {
    aliases: ['tm'],
    cooldown: 5 // Seconds
};
