module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Successfully connected to ${client.user.tag}!`)
        client.user.setActivity('Please mention me for more information!', { type: 'PLAYING' });
        client.user.setStatus('idle');

        require("../../Systems/chatFilter");
    }
}