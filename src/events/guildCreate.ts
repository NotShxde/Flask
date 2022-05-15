import Eris from "eris"
import { db } from "../database"

module.exports = async (client:any,guild:Eris.Guild) => {
   
  
        await db.query(`
        INSERT INTO guild_data (guild_id,prefix)
        VALUES ('${guild.id}','-');
        `)

        await db.query(`
        INSERT INTO audit_log (enabled,guild_id)
        VALUES (FALSE,${guild.id});
        `)

        

   
    
}
   
  