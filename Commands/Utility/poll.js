const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "vote",
    category: "Utility",
    example: `${config.Prefix}vote Is Dinav hot ?`,

    run: async (client, message, args) => {

        if (args.length <= 0)
        return message.reply(`${emoji.Error} Oh allez mec dis quelque chose pour que je puisse interroger quelque chose !!`)
        .then(msg => {
            msg.delete({ timeout: 10000 })
        });

        if (message.content.includes("discord.gg"))
        return message.reply(`${emoji.Error} Vous n'essayez pas de publier le lien du serveur en m'utilisant !!!`)
        .then(msg => {
            msg.delete({ timeout: 15000 })
        });

        const embed = new Discord.MessageEmbed()
        .setTitle('Nouveaux Sondage !!')
        .setDescription(args.join(" "))
        .setFooter(`Sondage réalisé par ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        let msgEmbed = await message.channel.send(embed );
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')

    }
}