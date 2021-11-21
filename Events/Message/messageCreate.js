module.exports = {
    name: "messageCreate",
    execute(client, message) {
        if (message.mentions.has(client.user)) { 
            message.channel.send('All command is using slash command.')
             }
    }
}