const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
  name: "oiseaux",
  category: "Animals",
  description: "Envoie une image d'oiseau aléatoire pour faire plaisir à votre esprit !!",
  example: `${config.Prefix}oiseaux`,

  run: async (client, message, args) => {

    const res = await fetch('http://shibe.online/api/birds');
    const img = (await res.json())[0];
    const embed = new Discord.MessageEmbed()
    .setTitle(`${emoji.Bird} Un oiseau !! ${emoji.Bird}`)
    .setImage(img)
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  } 
}
