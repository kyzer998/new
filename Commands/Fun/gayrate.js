const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {

    name: "gayrate",
    category: "Fun",
    description: "Donne le taux gay de l'utilisateur !!",
    aliases: ["howgay"],
    example: `${config.Prefix}gayrate @Dinav`,

    run: async (client, message, args) => {

        const user =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const gayrate = Math.floor(Math.random() * 101)

        if(!user)
        return message.reply(`${emoji.Error} Fournissez un utilisateur valide de ce serveur !!`)

        const embed = new Discord.MessageEmbed()
        .setTitle(`${emoji.Gay} Tarif guy !!`)
        .setDescription(`${user} (\`${user.user.tag}\`) est ${gayrate} % gars !! ${emoji.Gay}`)
        .setTimestamp()

        message.channel.send(embed)
    }
}