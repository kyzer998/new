const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const DIG = require("discord-image-generation");

module.exports = {
    name: "kiss",
    category: "Image",
    description: "Vous poste vous et le membre mentionné en train de vous embrasser !!",
    example: `${config.Prefix}blink @Dinav`,

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if(!user)
        return message.reply(`${emoji.Error}  Fournir un utilisateur valide   !!`)

        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });

        new DIG.Kiss().getImage(avatar, message.member.user.displayAvatarURL({dynamic: false, format: 'png', size: 1024}));

        let img = await new DIG.Kiss().getImage(avatar, message.member.user.displayAvatarURL({dynamic: false, format: 'png', size: 1024}));

        let attach = new Discord.MessageAttachment(img, "blink.png");

        message.channel.send(attach)
    }
}