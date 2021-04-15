const Discord = require('discord.js');
const moment = require('moment');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const region = {
    'us-central': `${emoji.flagUS} \`US Central\``,
    'us-east': `${emoji.flagUS} \`US East\``,
    'us-south': `${emoji.flagUS} \`US South\``,
    'us-west': `${emoji.flagUS} \`US West\``,
    'europe': `${emoji.flagUS} \`Europe\``,
    'singapore': `${emoji.flagSingapore} \`Singapore\``,
    'japan': `${emoji.flagJapan} \`Japan\``,
    'russia': `${emoji.flagRussia} \`Russia\``,
    'hongkong': `${emoji.flagHonkkong} \`Hong Kong\``,
    'brazil': `${emoji.flagBrazil} \`Brazil\``,
    'sydney': `${emoji.flagSydney} \`Sydney\``,
    'southafrica': `${emoji.flagSouthAfrica} \`South Africa\``,
    'india': `${emoji.flagIndia} \`India\``,
    'europe': `${emoji.flagEurope} \`Europe\``
};

const verificationLevels = {
    NONE: '`None`',
    LOW: '`Low`',
    MEDIUM: '`Medium`',
    HIGH: '`High`',
    VERY_HIGH: '`Very High`'
};

const notifications = {
    ALL: '`All`',
    MENTIONS: '`Mentions`'
};

module.exports = {
    name: "serverinfo",
    aliases: ["server", "si"],
    category: "Info",
    description: "Gives you the information of the server",
    example: `${config.Prefix}serverinfo`,

    run: async (client, message, args) => {
    const roleCount = message.guild.roles.cache.size - 1;
    const members = message.guild.members.cache.array();
    const memberCount = members.length;
    const online = members.filter((m) => m.presence.status === 'online').length;
    const offline =  members.filter((m) => m.presence.status === 'offline').length;
    const dnd =  members.filter((m) => m.presence.status === 'dnd').length;
    const afk =  members.filter((m) => m.presence.status === 'idle').length;
    const bots = members.filter(b => b.user.bot).length;
    const humans = memberCount - bots
    

    const channels = message.guild.channels.cache.array();
    const channelCount = channels.length - channels.filter(c => c.type === 'category').length;
    const textChannels = channels.filter(c => c.type === 'text').length;
    const voiceChannels = channels.filter(c => c.type === 'voice').length;
    const newsChannels = channels.filter(c => c.type === 'news').length;
    const storeChannel = channels.filter(c => c.type === 'store').length;
    const categoryChannels = channels.filter(c => c.type === 'category').length


    const embed = new Discord.MessageEmbed()
    
    .setThumbnail(message.guild.iconURL({dynamic: true, size: 1024}))
    .setTitle(`${message.guild.name}'s Info`)
    .addField('Nom', `\`${message.guild.name}\``, true)
    .addField('ID', `\`${message.guild.id}\``, true)
    .addField('nombres des membre', `\`${memberCount}\` Total Users\n\`${humans}\` Humans\n\`${bots}\` Bots`, true)
    .addField('Region', region[message.guild.region], true)
    .addField('Verification Level', verificationLevels[message.guild.verificationLevel], true)
    .addField('Date de création du serveur', `\`${moment.utc(message.guild.createdAt).format('DD/MMM/YYYY')}\``, true)
    .addField('salon système', (message.guild.systemChannel) ? `${message.guild.systemChannel}` : '`None`', true)
    .addField('Canal de règles', (message.guild.rulesChannel) ? `${message.guild.rulesChannel}` : '`None`', true)
    .addField('Nombre de rôles', `\`${roleCount}\` Roles`, true)
    .addField('Rôle le plus élevé', message.guild.roles.highest, true)
    .addField('Nombre d\'emojis', `\`${message.guild.emojis.cache.size}\` Emojis`, true)
    .addField('Propriétaire du serveur', `${message.guild.owner}`, true)
    .addField('Nombre de catégories', `\`${categoryChannels}\` Categories`, true)
    .addField('Partenaire', `\`${message.guild.partnered}\``, true)
    .addField('Vérifié', `\`${message.guild.verified}\``, true)
    .addField('Notifications par défaut', notifications[message.guild.defaultMessageNotifications], true)
    .addField('Salon AFK', (message.guild.afkChannel) ? `\`${message.guild.afkChannel.name}\` | \`${message.guild.afkChannel.id}\`` : '`None`', true)
    .addField('Délai AFK', (message.guild.afkChannel) ? `\`${moment.duration(message.guild.afkTimeout * 1000).asMinutes()} minutes\`` : '`None`', true)
    .addField('Nombre de canaux', `\`${channelCount}\` Total Channels || ${emoji.TextChannnel}\`${textChannels}\` | ${emoji.VoiceChannel}\`${voiceChannels}\` | ${emoji.AnnouncementChannel}\`${newsChannels}\` | ${emoji.StoreChannel}\`${storeChannel}\``)
    .addField('Statut de l\'utilisateur', `\`${online}\`${emoji.Online}  \`${afk}\`${emoji.Idle}  \`${dnd}\`${emoji.Dnd}  \`${offline}\`${emoji.Offline}`)
    .setFooter(`Demander par ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

    await message.channel.send(embed)


}}
