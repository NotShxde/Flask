import Eris from "eris";
import { db } from "../../database";
import { channelHex } from "../../utils/colors";

import { Embed } from "../../utils/embed";
import { Permission } from "../../utils/permissionInt";
exports.run = async (client:Eris.Client , message:Eris.Message,args:any[]) => {
    let em = new Embed()
    .setAuthor("Role Added", "https://invite.giveawayboat.com/", client.user.avatarURL)

    if(!args[0]){
em.setDescription(" Please Enter A Sub Command \n `enable / disable`")
        return message.channel.createMessage({embed:em})    }
        
    let toggle = ["enable",'disable'];
    if(!toggle.includes(args[0])){
        em.setDescription(" Please Provide A Valid Sub Command \n `enable / disable`")
        return message.channel.createMessage({embed:em})
    }
    
    if(args[0] == "enable"){
        let channel:string = args[1];
        if(!channel){
            em.setDescription("Please Enter The Channel To Be Used As Audit Log")
            return message.channel.createMessage({embed:em})
        }
       if (channelHex.test(channel) == true){
        let ch =  /<#(\d{17,19})>/g;
        const k = channel.matchAll(ch).next()
        console.log(k)
         await db.query(`
        UPDATE audit_log
        SET enabled = TRUE,
        audit_id = ${k.value[1]}
        WHERE guild_id = ${message.guildID};
        
        `,(err,res)=>{
            if(err) throw err;
            res;
        })
        em.setDescription(`The Audit Log Had Been Enabled For ${channel}`)
        message.channel.createMessage({embed:em})
       }else{
        em.setDescription("Invalid Channel.")
        return message.channel.createMessage({embed:em})
       }
       
    }else{
        let toggle = (await db.query(`
        SELECT enabled FROM audit_log WHERE audit_id = ${message.guildID}
        `)).rows[0]
        if(toggle == "f"){
            em.setDescription("Already Disabled")
            return message.channel.createMessage({embed:em})
        }
        await db.query(`
        UPDATE audit_log SET enabled = FALSE WHERE guild_id = ${message.guildID}
        `)
        em.setDescription("DISABLED SUCESSFULLY")
            return message.channel.createMessage({embed:em})
    }
   
}

exports.help = {
    name: "auditlog",
    description: "command related to audit log",
    usage: "-auditlog <enable/disable> <channel>",
    example: "-auditlog enable #lounge \n - auditlog disable #lounge",
    perms:[Permission.MANAGE_GUILD,Permission.ADMINISTRATOR]
  };
  
  exports.conf = {
    aliases: ['audit','log'],
    cooldown: 5 // Seconds
  };
  