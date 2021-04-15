const figlet = require('figlet');
const config = require('../../config.json');

module.exports = {
    name: "ascii",
    category: "Fun",
    description: "Convertit les textes en ASCII",
    example: `${config.Prefix}ascii Salut`,

    run: async (client, message, args) => {
        if(!args[0]) return message.channel.send('Veuillez fournir du texte');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Un problème est survenu');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Veuillez fournir un texte de moins de 2000 caractères')

            message.channel.send('```' + data + '```')
        })
    }
}
