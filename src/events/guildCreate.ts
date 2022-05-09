
module.exports = async (client:any,guild:any) => {
    const arr = Array.from(client.commands.values())
    arr.forEach((k:any)=>{
        let cmdname = k.help.name
        let desc = k.help.description
        console.log(guild.id)
        client.createGuildCommand(guild.id,{
            name: cmdname,
            description: desc,
            type:1
        }).then(()=> console.log(`created ${k.help.name}`))
        .catch(console.error)
    })
}
   
  