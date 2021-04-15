const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {

    name: "lesbianrate",
    description: "Donne le taux lesbienne de l'utilisateur !!",
    example: `${config.Prefix}lesbianrate @Dinav`,
    aliases: ["howlesbian", "lesbian", "lr"],
    category: "Fun",

    run: async (client, message, args) => {

        const user =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const lesbianrate = Math.floor(Math.random() * 101)

        if(!user)
        return message.reply(`${emoji.Error} Fournissez un utilisateur valide de ce serveur !!`)

        const embed = new Discord.MessageEmbed()
        .setTitle(`${emoji.Lesbian} Tarif lesbienne !!`)
        .setDescription(`${user} (\`${user.user.tag}\`) est ${lesbianrate} % lesbienne !! ${emoji.Lesbian}`)
        .setTimestamp()

        message.channel.send(embed)
    }
}