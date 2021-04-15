const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const DIG = require("discord-image-generation");

module.exports = {
    name: "stonk",
    category: "Image",
    description: "Convertit l'avatar d'un utilisateur en stonk meme !!",
    example: `${config.Prefix}stonk @Dinav`,

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if(!user)
        return message.reply(`${emoji.Error} Fournir un utilisateur valide !!`)

        const avatar = user.user.displayAvatarURL({ dynamic: false, format: 'png', size: 1024 });

        let img = await new DIG.Stonk().getImage(avatar);

        let attach = new Discord.MessageAttachment(img, "stonk.png");

        message.channel.send(attach)
    }
}