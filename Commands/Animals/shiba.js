const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');
const fetch = require('node-fetch');

module.exports = {
    name: "shiba",
    category: "Animals",
    description: "Envoie une image de shiba aléatoire pour faire plaisir à votre esprit !!",
    example: `${config.Prefix}shibe`,

    run: async (client, message, args) => {

        try {
            const res = await fetch('http://shibe.online/api/shibes');
            const img = (await res.json())[0];

            const embed = new Discord.MessageEmbed()
            .setTitle(`${emoji.Doggy} Shiba !! ${emoji.Doggy}`)
            .setImage(img)
            .setColor(message.guild.me.displayHexColor)
            .setFooter(`Demander par ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

            message.channel.send(embed)

        } catch (err) {
            message.reply(`${emoji.Error} Couldn't find a shibe pls try again after a few time !!`)
        }

    }
}