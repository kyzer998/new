const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const {MessageEmbed} = require('discord.js')

module.exports = {

    name: "ping",
    category: "Info",
    aliases: ["latency", "ms"],
    description: "Renvoie la latence et le ping d'API",
    cooldown: 10000,
    example: `${config.Prefix}ping`,
    
    run: async (client, message, args) => {
        const pinger = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setDescription(`**Latance:** **\`${Date.now()-message.createdTimestamp}\`** ms\n
            **API Latance:** **\`${Math.round(client.ws.ping)}\`** ms`)

        const msg = await message.channel.send(pinger);
        msg.edit(pinger);
    }
}    