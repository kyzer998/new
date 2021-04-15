const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
    name: "say",
    aliases: ["tell"],
    category: "Utility",
    description: "Says your input via the bot",
    example: `${config.Prefix}say Hello`,
    
    run: (client, message, args) => {

        
        if (message.content.includes("discord.gg/"))
        return message.reply(`${emoji.Error} Vous n'essayez pas de publier le lien du serveur en m'utilisant !!!`)
        .then(msg => {
            msg.delete({ timeout: 15000 })
        });

        if (args.length <= 0)
        return message.reply(`${emoji.Error} Allez mec dis quelque chose !!`)
        .then(msg => {
            msg.delete({ timeout: 10000 })
        });


    
        message.channel.send(yo);
        const yo = new Discord.MessageEmbed()
        .setDescription(args.join(" "))
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
    }
}
