const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: 'slowmode',
    aliases: ['slow', 'sm'],
    category: 'Moderation',
    description: 'Configure le mode lent à tout moment',
    example: `${config.Prefix}slowmode 2`,

    run: async (client, message, args) => {

        const perms = ["MANAGE_CHANNELS" || "ADMINSTRATOR"];
        const doggo = message.guild.members.cache.get(client.user.id);

        if(!message.member.hasPermission([perms])) 
        return message.reply(`${emoji.Error} Vous n'avez pas l'autorisation de configurer le mode lent, vous devez avoir des autorisations **\`MANAGE_CHANNELS\`** ou **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(perms)) 
        return message.reply(`${emoji.Error} Je n'ai pas l'autorisation de configurer le mode lent pour cette chaîne, veuillez activer l'autorisation **\`MANAGE_CHANNELS\`** ou **\`ADMINISTRATOR\`** pour moi`);
        

        if (isNaN(args[0]) || parseInt(args[0]) < 0) {
            return message.reply(`${emoji.Error} Veuillez indiquer la durée à pour configurer le mode lent exemple :**\`${config.Prefix}slowmode 69\`**`)
        }

        if (parseInt(args[0]) > 21600) 
        return message.reply(`${emoji.Error} Je ne peux configurer que jusqu'à \`21600\` secondes maximum, soit 6 heures !!`)

        const duration = args[0]

        message.channel.setRateLimitPerUser(duration)

        const embed = new Discord.MessageEmbed()
        .setTitle('Slowmode Setup Sucessfully !!')
        .setDescription(`${emoji.Approved} Le mode lent a été configuré pour **\`${duration}\`** Seconds\n\n **\`!!slowmode 0\`**`)
        .addField('Channel', `<#${message.channel.id}>`, true)
        .addField('Setup By', `<@${message.author.id}>`, true)
        .setTimestamp()
        .setFooter(`Setup by ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))

        message.channel.send(embed)
        
    }
}