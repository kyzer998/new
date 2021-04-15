const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');

module.exports = {
    name: "ratonlaveur",
    aliases: ["rl"],
    category: "Animals",
    description: "Envoie une image de raton laveur aléatoire pour faire plaisir à votre esprit !!",
    example: `${config.Prefix}ratonlaveur`,

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/racoon');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`🦝 Raton laveur !! 🦝`)
    .setImage(img)
    .setFooter(`Demander par ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}
