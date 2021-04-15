const Discord = require('discord.js')
const config = require('../../config.json')
const emoji = require('../../Utils/emoji.json');
const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = {
  name: "leaveserver",
  aliases: ["leaveguild", "ls"],
  description: "Le bot quitte le serveur mais c'est uniquement pour mon développeur",
  example: `${config.Prefix}leaveserver [guildID]`,
  category: "Developer",

  run: async (client, message, args) => {

    if (message.author.id !== config.Owner) {
    return;
    }

    const guildId = args[0] || message.guild;
    if (!rgx.test(guildId))
    return;

    const guild = message.client.guilds.cache.get(guildId);

    if (!guild) return;
    await guild.leave();

    await message.channel.send(`${emoji.Approved} A quitté le serveur **\`${guild.name}\`** avec **\`${guild.memberCount}\`** membres👋`);
  }
}