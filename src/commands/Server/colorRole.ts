import Eris from "eris";
import { Colors, hexRegex } from "../../utils/colors";
import { Embed } from "../../utils/embed";
import { pmention,prole } from "../../utils/parse";
import { Permission } from "../../utils/permissionInt";
exports.run = async (client:Eris.Client , message:any,args:any[]) => {
    let hex:string = "";
    let em = new Embed()
if (!args[0]) {
    em.setDescription("Please Provide a Role To Be Colored")
    return message.channel.createMessage({ embed: em })
  }
  if (!args[1]) {
    em.setDescription(`Type \`-role color @role <Color / Hexcode>\` \n  Example \`#5865F2\` - Blurple `)
    em.setFooter("Use Hexcode or Colors Given Above ",client.user.avatarURL)
    Object.keys(Colors).forEach((color:any)=>{
      //@ts-ignore
      em.addField( `${Colors[color]}`,`\`${color}\``,false)
    })
    return message.channel.createMessage({ embed: em })
  }
  
  let creason;
  
  if(args[1]){
    if(args[1].startsWith("#")){
      const c = hexRegex.test(args[2]);
    if(c == false){
      em.setDescription("Invalid Hex Code / Color, Please Check Again!")
      em.setColor(Colors.DEFAULT_EMBED_COLOR)
      return message.channel.createMessage({embed:em})
    }else{
       hex = args[1];
    }
    }else{
      const cc:any = Object.keys(Colors).map((clr:any)=> clr === args[1].toUpperCase())
      if(cc == false){
        em.setDescription("The Color You Entered Is Wring, Please Check Again")
        return message.channel.createMessage({embed:em})
      }else{
         // @ts-ignore:next-line
         hex = Colors[args[1].toUpperCase()]
      }
    }
  }
  let hextobedone = hex.replace("#","0x");
  let k =parseInt(hextobedone,16)
  let crole = prole(message, args[0])
  if(!args[2]){
    creason = "Not Specified"
  }else{
      args.splice(0,2)
    creason = args.join(" ")
  }
  try {
    console.log(message.guildID + crole )
    client.editRole(message.guildID,crole,{
    color: k
  },creason)
  } catch (error) {
    console.error(error)
  }finally{
    em.setDescription(`Edited Role <@&${crole}> to the color ${hex} `)
    return message.channel.createMessage({embed:em})
  }
  
    
}
exports.help = {
    name: "colorRole",
    description: "adds color to the specified role",
    usage: "-colorRole <@role> <color>",
    example: "-colorRole @7282 RED",
    perms:[Permission.MANAGE_ROLES]
  };
  
  exports.conf = {
    aliases: ['cr','grafittirole'],
    cooldown: 5 // Seconds
  };
  