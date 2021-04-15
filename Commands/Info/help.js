const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');
const pagination = require('discord.js-pagination');

module.exports = {

    name: "help",
    aliases: ["h", "assist", "cmd", "commands"],
    category: "Info",
    description: "Montre toutes les commandes présentes en moi !!",
    example: `${config.Prefix}help or ${config.Prefix}help botinfo`,

    run: async(client, message, args) => {

        const Fun = `\`\`\`${client.commands.filter(cmd => cmd.category === "Fun").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ")}\`\`\``;
        const Info = `\`\`\`${client.commands.filter(cmd => cmd.category === "Info").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ")}\`\`\``;
        const Moderation = `\`\`\`${client.commands.filter(cmd => cmd.category === "Moderation").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ")}\`\`\``;
        const Image = `\`\`\`${client.commands.filter(cmd => cmd.category === "Image").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ")}\`\`\``;
        const Animals = `\`\`\`${client.commands.filter(cmd => cmd.category === "Animals").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ")}\`\`\``;
        const Misc = `\`\`\`${client.commands.filter(cmd => cmd.category === "Misc").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ")}\`\`\``;
        const Utility = `\`\`\`${client.commands.filter(cmd => cmd.category === "Utility").array().map(m => m.name.charAt(0).toUpperCase() + m.name.slice(1)).join(", ")}\`\`\``;
        const intro = new Discord.MessageEmbed()
        .setAuthor(client.user.tag, client.user.displayAvatarURL())
        .setTitle(`${emoji.Wave} Introduction !!`)
        .setDescription(`Hé je suis ${client.user.username} mon préfixe est **\`${config.Prefix}\`** et **envoyez-moi un ping si vous oubliez le préfixe**, si vous voulez obtenir la liste des commandes, réagissez aux emojis que j'ai déjà réagis alors, commençons !!`)
        .addField(`${emoji.Search} Pour obtenir une aide détaillée sur une commande`, `\`${config.Prefix}help [command name]\``)
        .addField('Nous avons des commandes pour:', `${emoji.Fun} \`Fun\`\n${emoji.Info} \`Info\`\n${emoji.Moderation} \`Moderation\`\n${emoji.Utility} \`Utility\`\n${emoji.Camera} \`Image\`\n${emoji.DoggoLul} \`Animals\`\n${emoji.Wink} \`Others\`\n${emoji.Misc} \`Misc\``)
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle(`${emoji.Fun} Fun`)
        .setDescription(Fun)
        .setTimestamp()

        const info = new Discord.MessageEmbed()
        .setTitle(`${emoji.Info} Info`)
        .setDescription(Info)
        .setTimestamp()

        const mod = new Discord.MessageEmbed()
        .setTitle(`${emoji.Moderation} Moderation`)
        .setDescription(Moderation)
        .setTimestamp()

        const image = new Discord.MessageEmbed()
        .setTitle(`${emoji.Camera} Image`)
        .setDescription(Image)
        .setTimestamp()

        const animals = new Discord.MessageEmbed()
        .setTitle(`${emoji.DoggoLul} Animals`)
        .setDescription(Animals)
        .setTimestamp()
        
        const utility = new Discord.MessageEmbed()
        .setTitle(`${emoji.Utility} Utility`)
        .setDescription(Utility)
        .setTimestamp()

        const misc = new Discord.MessageEmbed()
        .setTitle(`${emoji.Misc} Misc`)
        .setDescription(Misc)
        .setTimestamp()

        const pages = [
            intro,
            fun,
            info,
            mod,
            utility,
            image,
            animals,
            misc
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '7200000 '

        if(!args[0]) return pagination(message, pages, emojiList, timeout)

        let command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
    
        if(!command) return;

        const embed = new Discord.MessageEmbed()

        .setTitle('Command Info')
        .addField('Name', `\`\`\`${command.name}\`\`\``, true)
        .addField('Category', `\`\`\`${command.category}\`\`\``, true)
        .addField('Aliases', `\`\`\`${command.aliases ? command.aliases.join(", ") : "-"}\`\`\``, true)
        .addField('Example', `\`\`\`${command.example}\`\`\``, true)
        .addField('Description', `\`\`\`${command.description}\`\`\``)
        .setTimestamp()

        message.channel.send(embed)
    
    }
        
}
