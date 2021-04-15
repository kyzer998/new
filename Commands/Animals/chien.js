const Discord = require('discord.js');
const fetch = require('node-fetch');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
    name: "chien",
    aliases: ["chienne"],
    category: "Animals",
    description: "Envoie une image de chien aléatoire pour faire plaisir à votre esprit !!",
    example: `${config.Prefix}dog`,

    run: async (client, message, args) => {
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const img = (await res.json()).message;
        const embed = new Discord.MessageEmbed()
          .setTitle(`${emoji.DoggoLul} Chien !! ${emoji.DoggoLul}`)
          .setImage(img)
          .setFooter(`Demander par ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    }
}