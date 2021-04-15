const Discord = require('discord.js');
const { translate } = require('bing-translate-api');
const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
  name: "translate",
  aliases: ["t"],
  category: "Utility",
  description: "Traduit dans votre langue préférée",
  example: `${config.Prefix}translate english Hola`,

  run: async (client, message, args) => {

    if (args.length < 2) {
    return message.reply(`Vous avez manqué une dispute **\`${config.Prefix}translate [langue que vous voulez traduire] Word\`** par exemple **\`${config.Prefix}translate spanish Hello\`**`)
    }
  
    try {

      const result = await translate(args.slice(1).join(' '), null, args[0]);
      
      const embed = new Discord.MessageEmbed()
  
      .setTitle('Traducteur')
      .setColor(message.guild.me.displayHexColor)
      .addField('Traduit de', `\`\`\`${result.text}\`\`\``)
      .addField('Traduit à', `\`\`\`${result.translation}\`\`\``)
      .setTimestamp()
      message.channel.send(embed)
    }  catch (err) {
      message.channel.send(`${emoji.Error} Échec de la traduction **${args[1]}** à **${args[0]}**`);
    }
  }
}
