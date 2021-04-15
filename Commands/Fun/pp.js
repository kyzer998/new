const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

const pp = [
    '8D',
    '8=D',
    '8==D',
    '8===D',
    '8====D',
    '8=====D',
    '8======D',
    '8=======D',
    '8========D',
    '8=========D',
    '8==========D',
    '8===========D',
    '8============D',
    '8=============D',
    '8==============D',
    '8===============D',
    '8================D',
    '8=================D',
    '8==================D',
    '8===================D',
    '8====================D',
    '8=====================D',
    '8======================D',
    '8=======================D',
    '8========================D',
    '8=========================D'
];

module.exports = {
    name: 'pp',
    aliases: ['ppsize', 'penis'],
    category: 'Fun',
    description: 'gives the pp size of the mentioned user or provided ID',
    example: `${config.Prefix}pp @Dinav`,
    
    run: async (client, message, args) => {

      const member =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

      if(!member)
      return message.reply(`${emoji.Error} Mentionnez quelqu'un ou fournissez son identifiant pour obtenir sa taille PP`)

      const embed = new Discord.MessageEmbed()
      .setTitle('Détecteur de taille PP')
      .setDescription(`${member.displayName}a une PP si grande\n\`\`\`${pp[Math.floor(Math.random() * pp.length)]}\`\`\``)
      .setFooter(`Demander par ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(member.displayHexColor);

      await message.channel.send(embed)
    }
}