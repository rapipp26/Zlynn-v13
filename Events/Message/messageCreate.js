module.exports = {
    name: "messageCreate",
    execute(client, message) {
        if (message.mentions.has(client.user.id)) {
            message.channel.send("Hello there!"); 
            };
    }
}