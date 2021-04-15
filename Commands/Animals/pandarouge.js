const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "pandarouge",
    aliases: ["pr"],
    category: "Animals",
    description: "Envoie une image de panda aléatoire pour faire plaisir à votre esprit !!",
    example: `${config.Prefix}pandarouge`,

    run: async (client, message, args) => {

    const res = await fetch('https://some-random-api.ml/img/red_panda');
    const img = (await res.json()).link;

    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.RedPanda} Panda rouge !!! ${emoji.RedPanda}`)
    .setImage(img)
    .setFooter(`Demander par ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
}