const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
    name: "snipe",
    category: "Fun",
    description: "Récupère le dernier message texte supprimé !!",
    example: `${config.Prefix}snipe`,

    run: async (client, message, args) => {

        try {

            const msg = client.snipes.get(message.channel.id)

            const embed = new Discord.MessageEmbed()
    
            .setTitle('Vous avez été snipé !!')
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL({ dynamic: true }))
            .addField('Contenu', msg.content)
            .addField('Auteur', `<@${msg.author.id}> (\`${msg.author.tag}\`)`)
            .setFooter(`Demander par ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
    
            message.channel.send(embed)

        } catch (err) {
            message.reply(`${emoji.Error} Je ne pouvais pas sniper ce message !!`)
        }
    } 
    
}