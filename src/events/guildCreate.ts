import Eris from "eris"
import { db } from "../database"

module.exports = async (client:any,guild:Eris.Guild) => {
   const addid = (
  
        await db.query(`
        INSERT INTO guild_data (guild_id,prefix)
        VALUES ('${guild.id}','-');
        `)
    
   )
    
}
   
  