const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kicks l\'utilisateur mentionné ou l\'utilisateur auquel vous avez fourni l`\'ID du serveur lol',
    example: `${config.Prefix}kick @Dinav Being Rude`,

    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const Perms = ["KICK_MEMBERS" || "ADMINSTRATOR"]
        const doggo = message.guild.members.cache.get(client.user.id);

        if(!message.member.hasPermission(Perms)) 
        return message.reply(`${emoji.Error} Vous n'avez pas la permission de faire ça lol essayez de demander à votre propriétaire ou administrateur de vous donner la permission **\`KICK_MEMBERS\`** ou **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        if(!doggo.hasPermission(Perms))
        return message.reply(`${emoji.Error} Je n'ai pas l'autorisation d'exclure des utilisateurs, veuillez activer l'autorisation **\`KICK_MEMBERS\`** pour moi`)

        if (!user)
        return message.reply(`${emoji.Error} Veuillez spécifier une personne à que vous souhaitez renvoyer, **\`${config.Prefix}kick <user mention / user ID> [reason]\`**`)
        
        if(user === client.user.id)
        return message.reply(`${emoji.Error} Attends quoi ??!! Je ne peux pas me donner un coup de pied !!!`)

        if(user.id === message.author.id) 
        return message.reply(`${emoji.Error} Vous ne pouvez pas vous kick`)
        

        if (user.roles.highest.position > message.member.roles.highest.position)
        return message.reply(`${emoji.Error} Vous ne pouvez pas kick quelqu'un avec un rôle égal ou supérieur à vous !!! ** ou ** si vous êtes propriétaire, soyez vous-même dans une position plus élevée`)
        

        if (!user.bannable)
        return message.reply(`${emoji.Error} À condition que l'utilisateur ne soit pas kickable car il / elle a un rôle plus élevé que moi ou égal à ma position :(`);


        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick({reason: reason});
 
        const embed = new Discord.MessageEmbed()
        .setColor("#00aaaa")
        .setTitle('Kick !!')
        .setDescription(`${emoji.Approved} <@${user.id}> (**\`${user.user.tag}\`**) a été banni de **${message.guild.name}**`)
        .addField('Reason', `**\`${reason != "" ? reason : "-"}\`**`, true)
        .addField('Kicked By', `<@${message.member.id}> (**\`${message.member.user.tag}\`**)`, true)
        .setTimestamp()
        await message.channel.send(embed);
    }
}
