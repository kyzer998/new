const Discord = require('discord.js');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
  name: "nickname",
  aliases: ["setnickname", "nick"],
  description: "Définit un surnom pour l'utilisateur mentionné ou l'ID fourni par ce serveur",
  example: `${config.Prefix}nickname @Dinav Cool or !!nickname @Dinav "Cool"`,
  category: "Moderation",

   run: async (client, message, args) => {
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const perms = ["MANAGE_NICKNAMES" || "ADMINSTRATOR"];
    const doggo = message.guild.members.cache.get(client.user.id);
    let nickname = args[1];

    if(!message.member.hasPermission(perms)) 
    return message.reply(`${emoji.Error} Vous n'avez pas la permission de faire ça lol essayez de demander à un membre du personnel de vous donner la permission **\`MANAGE_NICKNAMES\`** ou **\`ADMINISTRATOR\`**`)
    .then(msg => {
      msg.delete({ timeout: 20000 })
    });

    if(!doggo.hasPermission(perms))
    return message.reply(`${emoji.Error} Je n'ai pas l'autorisation de modifier le pseudo des utilisateurs, veuillez activer l'autorisation **\`MANAGE_NICKNAMES\`** pour moi`);

    if(!user)
    return message.reply(`${emoji.Error} Veuillez mentionner ou fournir l'identifiant de l'utilisateur à partir de ce serveur !! **\`${config.Prefix}nickname [Mention or ID] [The Nickname]\`**`)

    if (!args[1]) 
    return message.reply(`${emoji.Error} Veuillez fournir un surnom !!`);

    if (nickname.startsWith('"')) {
    nickname = message.content.slice(message.content.indexOf(args[1]) + 1);

    if (!nickname.includes('"')) 
    return message.reply(`${emoji.Error} Veuillez vous assurer que le surnom est entouré de guillemets ""`);

    if (user.roles.highest.position > message.member.roles.highest.position)
    return message.reply(`${emoji.Error} Vous ne pouvez pas modifier le pseudo de quelqu'un avec un rôle égal ou supérieur à vous !!! ou si vous êtes propriétaire, soyez vous-même dans une position plus élevée`)
    
    
    if (user.roles.highest.position > doggo.roles.highest.position)
    return message.reply(`${emoji.Error} Vous ne pouvez pas bannir quelqu'un avec un rôle égal ou supérieur à moi !!`)

    nickname = nickname.slice(0, nickname.indexOf('"'));
    if (!nickname.replace(/\s/g, '').length)
    return message.reply(`${emoji.Error} Veuillez fournir un surnom à donner à quelqu'un !`);
    }

    if (nickname.length > 32) {
    return message.reply(`${emoji.Error} Si le surnom est trop grand, veuillez fournir un surnom de moins de 32 caractères !!`);


    } else {

      let reason;
      if (args[1].startsWith('"'))
      reason = message.content.slice(message.content.indexOf(nickname) + nickname.length + 1);
      else reason = message.content.slice(message.content.indexOf(nickname) + nickname.length);

      if (!reason) reason = '`-`';
      if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
      
      try {
      
        const oldNickname = user.nickname || user.user.username;
        const changelog = `From \`${oldNickname}\` to \`${nickname}\``;

        await user.setNickname(nickname);

        const embed = new Discord.MessageEmbed()
          .setTitle('Nickname Changed !!')
          .setDescription(`${emoji.Approved} <@${user.id}> (\`${user.user.tag}\`) nickname has been successfully changed !!`)
          .addField('Changed By', `<@${message.member.id}>\n(\`${message.member.user.tag}\`)`, true)
          .addField('Changed User', `<@${user.id}>\n(\`${user.user.tag}\`)`, true)
          .addField('Changelog', changelog, true)
          .addField('Reason', reason)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        await message.channel.send(embed);
      
      } catch (err) {
        message.reply(`${emoji.Error} Veuillez vérifier la position du rôle !!`, err.message);
      }
    }  
  }
}
