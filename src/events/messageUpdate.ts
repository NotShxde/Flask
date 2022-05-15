import { db } from "../database"

import Eris from "eris"
import { Embed } from "../utils/embed"

module.exports = async (client:any,message:any,oldMessage:any) => {
    let em = new Embed()
    em.setFooter(`ID: ${message.id}`,client.user.avatarURL)
    .setAuthor("Message Edited", "https://invite.giveawayboat.com/", client.user.avatarURL)
   let toggle = (await db.query(`
        SELECT enabled FROM audit_log WHERE guild_id = ${message.guildID}
        `)).rows[0]
        if(toggle == "f"){
            return;
        }
        let d = (await db.query(`
        SELECT audit_id FROM audit_log WHERE guild_id = ${message.guildID}
        `)).rows[0].audit_id
        console.log(d)
        
        
        em.setDescription(`Message Edited in ${message.channel.mention} by ${message.author.mention} \n Before: ${oldMessage.content} \nAfter: ${message.content}`)
        em.setAuthor(`Message Edited`,"https://invite.giveawayboat.com/",message.author.avatarURL)
            return client.createMessage(d,{embed:em})
    
}
   
  
