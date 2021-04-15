const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "panda",
    category: "Animals",
    description: "Envoie une image de panda aléatoire pour faire plaisir à votre esprit !!",
    example: `${config.Prefix}panda`,

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/panda');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.Panda} Panda !!! ${emoji.Panda}`)
    .setImage(img)
    .setFooter(`Demander par ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}