const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "koala",
    category: "Animals",
    description: "Envoie une image de koala aléatoire pour faire plaisir à votre esprit !!",
    example: `${config.Prefix}koala`,

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/koala');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.Koala} Koala !!! ${emoji.Koala}`)
    .setImage(img)
    .setFooter(`Demander par ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}