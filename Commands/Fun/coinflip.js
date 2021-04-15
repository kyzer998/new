const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "coinflip",
    aliases: ["flip", "toss", "cointoss"],
    category: "Fun",
    description: "Lancez une pièce pour vous !!",
    example: `${config.Prefix}coinflip`,

    run: async (client, message, args) => {

        const n = Math.floor(Math.random() * 2);
        let result;
        if (n === 1) result = 'Heads';
        else result = 'Tails';
        const embed = new Discord.MessageEmbed()
          .setTitle(`${emoji.Coin} Coinflip ${emoji.Coin}`)
          .setDescription(`${message.member} (\`${message.member.user.tag}\`) J'ai retourné une pièce que tu as **\`${result}\`**!`)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        message.channel.send(embed);
    }
}