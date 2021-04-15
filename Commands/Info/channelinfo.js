const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const moment = require('moment');

const channelType = {
    dm: 'DM',
    text: `${emoji.TextChannnel} \`Texte\``,
    voice: `${emoji.VoiceChannel} \`Vocal\``,
    category: `${emoji.Category} \`Categorie\``,
    news: `${emoji.AnnouncementChannel} \`Annonce\``,
    store: `${emoji.StoreChannel} \`Store\``
};



module.exports = {
    name: "channelinfo",
    aliases: ["channel"],
    description: "Donne les informations d'une chaîne !!",
    category: "Info",
    example: `${config.Prefix}channelinfo #general`,

    run: async (client, message, args) => {

        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;

        if(!channel)
        return message.reply(`${emoji.Error} Fournissez un canal valide ou un canal de ce serveur et non d'un autre serveur !! **\`${config.Prefix}channelinfo [Channel Form this server]\`**`)

        const totalUsers = channel.members.size;
        const bots = channel.members.array().filter(b => b.user.bot).length;
        const humans = channel.members.size - bots;
        const NFSW = {
            true: 'Oui',
            false: 'Non'
        }
        
        const embed = new Discord.MessageEmbed()
        .setTitle('Informations sur le salon!!')
        .addField('Nom', channel, true)
        .addField('ID', `\`${channel.id}\``, true)
        .addField('Type', channelType[channel.type], true)
        .addField('Personnes', `\`${totalUsers}\` Users`, true)
        .addField('Humans', `\`${humans}\` Users`, true)
        .addField('Bots', `\`${bots}\` Users`, true)
        .addField('Creation Date', `\`${moment(channel.createdAt).format('DD/MMM/YYYY')}\``, true)
        .addField('NSFW ', `\`${NFSW[channel.nsfw]}\``, true)
        .setColor(message.guild.me.displayHexColor)
        .setTimestamp()

        message.channel.send(embed)

    }

}