const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bannit l\'utilisateur mentionné ou l\'utilisateur auquel vous avez fourni l\'ID du serveur lol',
    example: `${config.Prefix}ban @Dinav Being Rude`,

    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const perms = ["BAN_MEMBERS" || "ADMINSTRATOR"];
        const doggo = message.guild.members.cache.get(client.user.id);

        if(!message.member.hasPermission(perms)) 
        return message.reply(`${emoji.Error} Vous n'avez pas la permission de faire ça lol essayez de demander à un membre du personnel de vous donner la permission **\`BAN_MEMBERS\`** ou **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(perms))
        return message.reply(`${emoji.Error} Je n'ai pas l'autorisation d'exclure des utilisateurs, veuillez activer l'autorisation **\`BAN_MEMBERS\`** pour moi`)

        if (!user)
        return message.reply(`${emoji.Error} Veuillez indiquer une personne que vous souhaitez exclure. **\`${config.Prefix}ban <user> [reason]\`**`)
        
        if(user.id === message.author.id) 
        return message.reply(`${emoji.Error} Vous ne pouvez pas vous interdire idot`)

        if(user.id === client.user.id)
        return message.reply(`${emoji.Error} Attends quoi !!?? Je ne peux pas m'interdire !!`)        

        if (user.roles.highest.position > message.member.roles.highest.position)
        return message.reply(`${emoji.Error} Vous ne pouvez pas bannir quelqu'un avec un rôle égal ou supérieur à vous !!! ou si vous êtes propriétaire, soyez vous-même dans une position plus élevée`)
        

        if (!user.bannable)
        return message.reply(`${emoji.Error} À condition que l'utilisateur ne soit pas bannable car il / elle a un rôle plus élevé que moi ou égal à ma position :(`);


        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});
 
        const embed = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setTitle('Ban !!')
        .setDescription(`${emoji.Approved} <@${user.id}> (**\`${user.user.tag}\`**) a été banni de **${message.guild.name}**`)
        .addField('Reason', `**\`${reason != "" ? reason : "-"}\`**`, true)
        .addField('Banned By', `<@${message.member.id}> (**\`${message.member.user.tag}\`**)`, true)
        .setTimestamp()

        await message.channel.send(embed);
    }
}
