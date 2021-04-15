const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "clear",
    aliases: ["purge", "nuke", "clean"],
    category: "Moderation",
    description: "Efface le chat",
    example: `${config.Prefix}clear 69`,
    
    run: async (client, message, args) => {

        const perms = ["MANAGE_MESSAGES" || "ADMINSTRATOR"]

        if (message.deletable) {
            message.delete();
        }
    
        if (!message.member.hasPermission(perms)) {
            return message.reply(`${emoji.Error} Vous ne pouvez pas supprimer les messages. Puisque vous n'êtes pas autorisé à le faire, demandez à l'administrateur ou au propriétaire de vous donner l'autorisation **\`MANAGE_MESSAGES\`** !!`)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (!message.guild.me.hasPermission(perms)) {
            return message.reply(`${emoji.Error} Désolé ... Je ne peux pas supprimer les messages Je n'ai pas l'autorisation de le faire, veuillez activer l'autorisation **\`MANAGE_MESSAGES\`**`)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply(`${emoji.Error} Veuillez fournir un nombre entre 1 et 100 plutôt qu'un alphabet, un espace vide ou 0`)
            .then(msg => {
                msg.delete({ timeout: 15000 })
              })
        }

        if (parseInt(args[0]) > 100) 
        return message.reply(`${emoji.Error} help, je ne peux effacer que 100 messages maximum`)
        .then(msg => {
            msg.delete({ timeout: 15000 })
        })

        let deleteAmount = parseInt(args[0]);  

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`${emoji.Approved} Je effacer \`${deleted.size}\` messages.`))
            .then(msg => {
                msg.delete({ timeout: 3000 })
              })
            
    }
}