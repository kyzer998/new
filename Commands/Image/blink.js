const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const DIG = require("discord-image-generation");

module.exports = {
    name: "blink",
    category: "Image",
    description: "Publie l'avatar de votre ami",
    example: `${config.Prefix}blink @Dinav`,

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if(!user)
        return message.reply(`${emoji.Error} Fournir un utilisateur valide !!`)

        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });

        new DIG.Blink().getImage(message.member.user.displayAvatarURL({dynamic: false, format: 'png', size: 1024}), avatar);

        let img = await new DIG.Blink().getImage(avatar, message.member.user.displayAvatarURL({dynamic: false, format: 'png', size: 1024}));

        let attach = new Discord.MessageAttachment(img, "blink.gif");

        message.channel.send(attach)
    }
}