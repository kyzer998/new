const {MessageEmbed, guild} = require('discord.js')
const config = require('../../config.json');
module.exports = {
    name: "serveuroff",
    category: "Developer",
    aliases: ["off"],
    dscription: "off le serveur",
    example: `${config.Prefix}serveroff`,

    run: async (client, message ,args) => {

        const embed = new MessageEmbed()
        .setAuthor(`Demender par ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true })) 
        .setDescription(`||@everyone|| **Le serveur ` + message.guild.name + `est Off, pour vous connectez veuiller attendre un autre jour.**`)
        .setFooter(`L'équipe de ${message.guild.name} vous souhaite une bonne journée !`)
        .setColor(`#00FF87`)
        .setImage('https://www.serenne.com/resources/library/0/0.RIEL041.Panneau-danger-electrique-etat-installation-ferme.jpg')
        message.channel.send(embed)
    }
}