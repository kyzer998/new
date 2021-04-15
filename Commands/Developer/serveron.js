const {MessageEmbed, guild} = require('discord.js')
const config = require('../../config.json');
module.exports = {
    name: "serveuron",
    category: "Developer",
    aliases: ["on"],
    dscription: "on le serveur",
    example: `${config.Prefix}serveron`,

    run: async (client, message ,args) => {

        const embed = new MessageEmbed()
        .setAuthor(`Demender par ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true })) 
        .setDescription(`||@everyone||**Le serveur `+ message.guild.name + ` est ON , pour vous connectez appuyez sur F8 dans fivem puis collez le message entre gimet  :

        "__connect frenchliferoleplay.capriceserv.com:30850__"**`)
        .setFooter(`L'équipe de ${message.guild.name} vous souhaite un bon jeu et une bonne journée !`)
        .setColor(`#00FF87`)
        .setImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1CPVSJgXwLFgkkXLM1hKDWLCx1q_UJHzgrv75Qv7kXK3kW6F9Sf4rebziF8E4Wdy5aQ&usqp=CAU')
        message.channel.send(embed)

    }
}