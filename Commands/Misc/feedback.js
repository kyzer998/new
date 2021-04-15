const Discord = require('discord.js');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');
const log = require('../../Utils/channels.json');

module.exports = {
    name: "feedback",
    category: "Misc",
    description: "Pour nous faire part de vos commentaires",
    example: `${config.Prefix}feedback Great Bot`,

    run: async (client, message, args) => {

    const Channel = message.client.channels.cache.get(log.Feeback);

    if (!args[0]) 
    return message.reply(`${emoji.Error}Veuillez fournir un commentaire à envoyer afin que nous puissions examiner !! **\`${config.Prefix}feedback [Your feedback]\`**`);

    let feedback = message.content.slice(message.content.indexOf(args[0]), message.content.length);

    const Embed = new Discord.MessageEmbed()
      .setTitle('__Feedback__')
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
      .setDescription(feedback) 
      .addField('User', `\`${message.member.user.tag}\` | \`${message.member.id}\``)
      .addField('Server', `\`${message.guild.name}\` | \`${message.guild.id}\``)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    Channel.send(Embed);

    await message.channel.send(embedd)

    }
}