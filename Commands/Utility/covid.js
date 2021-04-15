const Discord = require('discord.js');
const fetch = require('node-fetch');
const emoji = require('../../Utils/emoji.json');
const config = require('../../config.json');

module.exports = {
    name: "covid",
    category: "Utility",
    aliases: ["corona", "rona"],
    description: "Vous donne les statistiques du covid avec votre code fourni",
    example: `${config.Prefix}covid Canada`,

    run: async (client, message, args) => {
        let countries = args.join(" ");
        
        if(!countries) return message.channel.send(`${emoji.Error} Fournir un pays !!`);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Statistiques mondiales sur le COVID-19 🌎`)
                .addField('Cas confirmés', confirmed)
                .addField('rétablie', recovered)
                .addField('Morts', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 Stats pour **${countries}**`)
                .addField('Cas confirmés', confirmed)
                .addField('rétablie', recovered)
                .addField('Morts', deaths)
                .setFooter(`Demander par ${message.author.username}`,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send(`${emoji.Error} Pays fourni non valide`)
            })
        }
    }
}
