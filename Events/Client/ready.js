module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Successfully connected to ${client.user.tag}!`)
    }
}