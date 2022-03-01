module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`Successfully connected to ${client.user.tag}!`)
        await client.user.setActivity('Mention me for more information! 🐸', { type: 'PLAYING' });
        await client.user.setStatus('idle');
        await client.channels.cache.get("948060231156498466").send({ content: "Im ready."})

        require("../../Systems/chatFilter");
    }
}