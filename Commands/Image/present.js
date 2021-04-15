const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const DIG = require("discord-image-generation");

module.exports = {
    name: "present",
    aliases: ["presentation"],
    category: "Image",
    description: "Convertit l'avatar d'un utilisateur au format inversé !!",
    example: `${config.Prefix}invert @Dinav`,

    run: async (client, message, args) => {

        const presentation = args.join(" ");

        if(!presentation)
        return message.reply(`${emoji.Error}  Fournir un utilisateur valide   !!`)

        let presented = await new DIG.LisaPresentation().getImage(presentation);

        let attach = new Discord.MessageAttachment(presented, "invert.png");

        message.channel.send(attach)
    }
}