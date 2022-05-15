let channelHex =  /<#(\d{17,19})>/g;
const channel = "<#894952036955721728>"
const k = channel.matchAll(channelHex).next()
console.log(k.value[1])
