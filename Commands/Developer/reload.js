const config = require('../../config.json');
const emoji = require('../../Utils/emoji.json');

module.exports = {
    name: "reload",
    aliases: ["load"],
    category: "Developer",
    description: "Rechargement de la commande fournie !!",
    example: `${config.Prefix}reload Fun pp`,

    run: async (client, message, args) => {
        
        if (message.author.id !== config.Owner) {
            return;
        }

        if(!args[0]) return message.reply(`${emoji.Error} Fournissez la catégorie et les commandes à recharger !! \`${config.Prefix}reload [Category] [Command]\``)
        if(!args[1]) return message.reply(`${emoji.Error} Fournissez une commande pour recharger !! \`${config.Prefix}reload [Category] [Command]\``)

        let category = args[0].toLowerCase()
        let command = args[1].toLowerCase()

        try {
            delete require.cache[require.resolve(`../../Commands/${category}/${command}.js`)];
            client.commands.delete(command);

            const pull = require(`../../Commands/${category}/${command}.js`)
            client.commands.set(command, pull)

            return message.channel.send(`${emoji.Approved} Commande rechargée: **\`${command}\`**`)

        } catch (error) {
            return message.reply(`${emoji.Error} Impossible de recharger: **\`${command}\`**\`\`\`${error}\`\`\``)
        }

    }
}
