const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
    name: "embed",
    category: "Utility",
    dscription: "Envoie un message dans l'embed",
    example: `${config.Prefix}embed Hi`,

    run: async (client, message ,args) => {

        if (args.length <= 0)
        return message.reply(`${emoji.Error} Oh allez mec, dis quelque chose pour que je puisse le fournir au format embed !!`)
        .then(msg => {
            msg.delete({ timeout: 10000 })
        });

        if (message.content.includes("discord.gg"))
        return message.reply(`${emoji.Error} Vous n'essayez pas de publier le lien du serveur en m'utilisant !!!`)
        .then(msg => {
            msg.delete({ timeout: 15000 })
        });

        const embed = new Discord.MessageEmbed()
        .setDescription(args.join(" "))
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)

    }
}