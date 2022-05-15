
import { db } from "../../database/index";
import { Embed } from "../../utils/embed";
import { Permission } from "../../utils/permissionInt";

exports.run = async (client:any , message:any,args:any[]) => {
    let embed = new Embed()
    .setAuthor("Flask: Uptime","https://invite.giveawayboat.com/",client.user.avatarURL)
    ////////////////////////////////////////////////////////////////
            
        
        
 ///////////////////////////////////////////////////////////////////
    //0 - set,
    //1 - <prefix>
    if(!args[0]){
        embed.setDescription("Please Enter The Prefix You Want To Set For The Server")
        return message.channel.createMessage({embed:embed})
    }
    if(args[0]){
        if(args[0].length > 5 ){
            embed.setDescription("Prefix Must Be Of Maximuim Of 5 Charecters")
            return message.channel.createMessage({embed:embed})}
            const updatedprefix = (
                await db.query(`
                UPDATE guild_data
                SET prefix = '${args[0]}'
                WHERE guild_id = ${message.guildID};
                `)
            );
            const getprefix = (
                await db.query(`
                SELECT * FROM guild_data 
                WHERE guild_id = ${message.guildID};
                `)
            ).rows[0].prefix

        embed.setDescription(`Sucessfully set prefix to ${getprefix}`)
        await message.channel.createMessage({embed:embed})
        return;
}
}
exports.help = {
    name: "setPrefix",
    description: "Displays Bots Prefix",
    usage: "-setPrefix" ,
    example: "-setPrefix !",
    perms: [Permission.MANAGE_GUILD,Permission.ADMINISTRATOR]
  }
  
  exports.conf = {
    aliases: ["sp"],
    cooldown: 5
  }