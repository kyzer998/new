const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
    name: "simprate",
    aliases: ["simp", "howsimp"],
    category: "Fun",
    description: "Donne le tarif simpliciter de l'utilisateur !!",
    example: `${config.Prefix}simprate @Dinav`,

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const simprate = Math.floor(Math.random() * 101)

        if(!user)
        return message.reply(`${emoji.Error} Fournissez un utilisateur valide à partir de ce serveur !!`)

        const embed = new Discord.MessageEmbed()
        .setTitle(`${emoji.Simp} taux de simpliciter !!`)
        .setDescription(`${user} (\`${user.user.tag}\`) est ${simprate} % Simpliciter !! ${emoji.Simp}`)
        .setTimestamp()

        message.channel.send(embed)
    }
}