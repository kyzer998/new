const config = require('../../config.json');
const Discord = require("discord.js");


module.exports = {
    name: "policy",
    category: "Info",
    example: `${config.Prefix}policy`,
    aliases: ["privacypolicy"],

    run: async (client, message, args) => {

        const embed = new Discord.MessageEmbed()

        .setTitle('__Notre politique__')
        .setDescription(`\`\`\`Nous ne stockons ni ne partageons aucun type de détails personnels sur aucun serveur et utilisateur. La commande snipe ne récupère que le message texte et aucune image et l'intégration ne seront snipées !! \`\`\`\`\`\` Nous suivons tous les termes de service de Discord, Youtube et IMDb.\`\`\`\`\`\``)
        .setFooter(`Requested by ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()
        
        message.channel.send(embed) 
    }
}
