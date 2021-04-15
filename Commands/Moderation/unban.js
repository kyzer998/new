const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "unban",
    category: "Moderation",
    description: "Annuler l'exclusion de l'utilisateur banni avec l'ID utilisateur fourni",
    example: `${config.Prefix}unban 4389334384384323 Innocent`,

    run: async (client, message, args) => {

        const id = args[0];
        const Banned = await message.guild.fetchBans();
        const user = Banned.get(id).user;
        const Perms = ["BAN_MEMBERS" || "ADMINSTRATOR"] 
        const doggo = message.guild.members.cache.get(client.user.id);

        
        if(!message.member.hasPermission(Perms)) 
        return message.reply(`${emoji.Error} Vous n'êtes pas autorisé à le faire pour annuler le bannissement d'une personne dont vous devez avoir l'autorisation **\`BAN_MEMBERS\`** ou **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(Perms))
        return message.reply(`${emoji.Error} Je n'ai pas l'autorisation d'annuler l'exclusion des utilisateurs, veuillez activer l'autorisation **\`BAN_MEMBERS\`** or **\`ADMINSTRATOR\`** pour moi`)

        if(!user)
        return message.reply(`${emoji.Error} Veuillez fournir un identifiant d'utilisateur d'une personne bannie afin de bannir cet utilisateur **\`${config.Prefix}unban [Banned User's ID] [Reason]\`**`)

        if(user === client.user.id)
        return message.reply(`${emoji.Error} Attends quoi ??!! suis-je même banni de ce serveur ?!!!`)

        if(!user === message.author.id) 
        return message.reply(`${emoji.Error} Si vous êtes banni,vous pouvez demander a quelqu'un de vous debannir !!`)

        const reason = args.slice(1).join(" ");

        await message.guild.members.unban(user, reason);

        const embed = new Discord.MessageEmbed()
        .setTitle('Unban !!')
        .setDescription(`${emoji.Approved} Unbanned **\`${user.tag}\`**`)
        .addField('Reason', `${reason != "" ? reason : "-"}`, true)
        .addField('Unbanned By', `<@${message.member.id}> `, true)
        .setTimestamp()

        message.channel.send(embed)

    }

}