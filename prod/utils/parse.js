"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prole = exports.pmention = void 0;
function getUserFromMention(mention, client) {
    if (!mention)
        return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return client.users.get(mention);
    }
}
exports.pmention = getUserFromMention;
function getRoleFromMention(message, roleMention) {
    if (!roleMention)
        return;
    const RoleRegex = /<@&(\d{17,19})>/gm;
    const m = roleMention.matchAll(RoleRegex).next().value;
    if (!m)
        return console.log("No Role Specified");
    const roleid = m[1];
    //let role = message.member?.guild.roles.find((r:any) => r.id === roleid)
    return roleid;
}
exports.prole = getRoleFromMention;
