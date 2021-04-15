const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const moment = require('moment');

module.exports = {
    name: "roleinfo",
    aliases: ['roleinformation', "role"],
    category: "Info",
    description: 'Donne les informations du rôle fourni !!',
    example: "!!roleinfo @Mod",

    run: async (client, message, args) => {

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

        if(!role)
        return message.reply(`${emoji.Error} Fournir un rôle!! \`${config.Prefix}roleinfo [Role]\``)

        const embed = new Discord.MessageEmbed()
        
        .setTitle(`Role Info !!`)
        .addField('Nom', role, true)
        .addField('ID', `\`${role.id}\``, true)
        .addField('Couleur', `\`${role.hexColor.toUpperCase()}\``, true)
        .addField('Utilisateurs avec ce rôle', `\`${role.members.size}\` nombre`, true)
        .addField('Date de création du compte discord', `\`${moment(role.createdAt).format('DD/MMM/YYYY')}\``, true)

        message.channel.send(embed)

        
    }
}