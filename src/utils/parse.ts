import Eris from "eris";

function getUserFromMention(mention: string,client:any) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}

export const pmention = getUserFromMention
function getRoleFromMention(message:any,roleMention:string){
	if(!roleMention) return;
	const RoleRegex = /<@&(\d{17,19})>/gm

	const m = roleMention.matchAll(RoleRegex).next().value
	if(!m) return console.log("No Role Specified");
	const roleid = m[1];
	//let role = message.member?.guild.roles.find((r:any) => r.id === roleid)

	return roleid
	
}
export const prole = getRoleFromMention