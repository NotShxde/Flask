import Eris from "eris";
 let ttlcmdiisue: number = 0;
exports.run = async (client: any, message:any) => {
  
  const arr = Array.from(client.commands.values())
  arr.forEach((k:any)=>{
    (() => {
      let cmdname = k.help.name
        let desc = k.help.description
        client.createCommand({
            name: cmdname,
            description: desc,
            type:1
        })
        .then(()=> ttlcmdiisue + 1)
        .catch(console.error)
        
    })()
     
  })
  console.log(ttlcmdiisue)
  const ttlguild = client.guilds.size
  message.channel.createMessage({content: `Issued  A Total Of ${ttlcmdiisue} Across ${ttlguild}`})
};

exports.help = {
  name: "gcr",
  description: "Global Command Registerar",
  usage: "!gcr",
  example: "!gcr"
};

exports.conf = {
  aliases: ['gcr'],
  cooldown: 60 // Seconds
};
