import Eris from "eris"

exports.run = async (client:Eris.Message, message:Eris.Message, args:any[]) => {
  const startTime = Date.now();
  const messageSent = await message.channel.createMessage('ping');
  return messageSent.edit(`~~Baguette~~ Pong | \`${Date.now() - startTime}\`ms`);
  /*
  message.channel.createMessage({content: "pinging..."}).then((m:any) =>{
      let ping = m.createdAt - message.createdAt
      let choices = ["Is this really my ping?" , "Is it ok?I cant look" , "I hope it isn't bad"]
      let responce:any = [Math.floor(Math.random()* choices.length)]

      m.edit(`${choices[responce]}\n**Bot Latency**:${ping}\n**Api Latency**:${client.author.}`)
  })
  **/
}

exports.help = {
  name: "ping",
  description: "Displays Bots Ping",
  usage: "Ping" ,
  example: "!ping"
}

exports.conf = {
  aliases: [],
  cooldown: 5
}