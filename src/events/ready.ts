import Eris from "eris";
import { Flask } from "../server"
module.exports = (client: Eris.Client) => {
  console.log("The bot is ready!");


  client.editStatus("dnd",{name:"justice",type:2});
}
