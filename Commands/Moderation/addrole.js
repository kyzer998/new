const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "addrole",
    category: "Moderation",
    aliases: ["ar", "giverole"],
    description: "Adds the role to the mentioned user or ID with mentioned role or ID !!",
    example: `${config.Prefix}addrole @Dinav @Mod`,

    run: async (client, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const perms = ["MANAGE_ROLES" || "ADMINSTRATOR"];
        const doggo = message.guild.members.cache.get(client.user.id);
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`-`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';

        if(!message.member.hasPermission(perms)) 
        return message.reply(`${emoji.Error} Vous n'avez pas la permission de faire ça lol essayez de demander à un membre du personnel de vous donner la permission **\`MANAGE_ROLES\`** ou **\`ADMINISTRATOR\`**`)
        .then(msg => {
            msg.delete({ timeout: 20000 })
        });

        
        if(!doggo.hasPermission(perms))
        return message.reply(`${emoji.Error} Je n'ai pas l'autorisation d'ajouter un rôle, veuillez activer l'autorisation **\`MANAGE_ROLES\`** or **\`ADMINSTRATOR\`** for me`)

        if (!user)
        return message.reply(`${emoji.Error} Veuillez spécifier la personne à qui vous souhaitez attribuer le rôle!! **\`${config.Prefix}addrole [User] [Role Mention or Role ID]\`**`)

        if (!role)
        return message.reply(`${emoji.Error} Veuillez mentionner un rôle ou fournir un ID de rôle valide`);

        if (user.roles.highest.position >= message.member.roles.highest.position)
        return message.reply(`${emoji.Error}Vous ne pouvez pas donner un rôle à quelqu'un qui est supérieur ou égal à votre rôle`)

        if (user.roles.highest.position >= doggo.roles.highest.position)
        return message.reply(`${emoji.Error} Vous ne pouvez pas donner un rôle à quelqu'un qui est supérieur ou égal à mon rôle`)

        else if (user.roles.cache.has(role.id))
        return message.reply(`${emoji.Error} L'utilisateur a déjà le rôle fourni`);

        else {
            try {

                await user.roles.add(role);

                const embed = new Discord.MessageEmbed()
                .setTitle('Add Role !!')
                .setDescription(`${emoji.Approved} ${role}(\`${role.id}\`) a été donné avec succès à <@${user.id}>(\`${user.user.tag}\`)`)
                .addField('Given By', `<@${message.member.id}>\n(\`${message.member.user.tag}\`)`, true)
                .addField('To', `<@${user.id}>\n(\`${user.user.tag}\`)`, true)
                .addField('Role', `${role}\n(\`${role.id}\`)`, true)
                .addField('Reason', reason)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);

                await message.channel.send(embed);
      
            } catch (err) {
            return message.reply(`${emoji.Error} Veuillez vérifier la position du rôle`, err.message);
            }
        }
    
    }      
        
}


