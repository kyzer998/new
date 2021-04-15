const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "roll",
    aliases: ["dice"],
    category: "Fun",
    description: "Lance un dé pour toi !!",
    example: `${config.Prefix}roll`,

    run: async (client, message, args) => {
    let limit = args[0];
    if (!limit) limit = 6;

    const result = Math.floor(Math.random() * limit + 1);

    const embed = new Discord.MessageEmbed()
      .setTitle(`${emoji.Dice} Lancer de dés ${emoji.Dice}`)
      .setDescription(`${message.member} (\`${message.member.user.tag}\`) Vous avez lancé un dé et vous avez **${result}** !!`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
     message.channel.send(embed);
    }
}
