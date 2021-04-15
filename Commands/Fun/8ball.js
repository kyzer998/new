const Discord = require('discord.js');
const config = require('../../config.json');
const answers = [
    'Oh putain, oui',
    'bonjour non',
    'Oui je suppose ?',
    'Probablement faux', 
    'On ne sait jamais',
    'Je suppose ?',
    'Eh bien, je ne sais pas',
    'Euh peut-être?',
    'Nah',
    'Yupi',
    'J\'ai un doute',
    'Impossible de prédire maintenant',
    'Je peux le voir'
]

module.exports = {
    name: "8ball",
    category: "Fun",
    description: "Posez une question à la réponse de la volonté",
    example: `${config.Prefix}8ball FLRP est un bot cool?`,

    run: async (client, message, args) => {
        const question = args.join(' ');
        if (!question) 
        return message.reply('Veuillez fournir une question à poser');

        const embed = new Discord.MessageEmbed()
          .setTitle('8-Ball')
          .addField('Question', `\`\`\`${question}\`\`\``)
          .addField('Répondre', `\`\`\`${answers[Math.floor(Math.random() * answers.length)]}\`\`\``)
          .setFooter(`Demandé par ${message.member.displayName}`,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
        message.channel.send(embed);
    }
}
