const config = require('../config.json');
module.exports = async (client) => {
        
    process.on('unhandledRejection', err => console.log(err))
    console.log(`${client.user.tag} est enligne !!`)
    client.user.setActivity(`${config.Prefix}help | ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} membres`, {type: "LISTENING"}, {status: "dnd"})
    
}
