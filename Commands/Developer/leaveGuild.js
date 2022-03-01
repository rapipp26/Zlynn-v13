const { MessageEmbed } = require(`discord.js`)
const cool = ["800882692219994123", "495488613811879946"];
module.exports = {
    name: "guild-leave",
    description: "Developer command for force the bot to leave a server",
    options: [
        {
            name: "guildid",
            description: "Provide the guild id",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(!cool.includes(interaction.user.id)) return interaction.reply({ content: "You cant use this command."})

        const guildId = interaction.options.getString("guildid")
        const guild = client.guilds.cache.get(guildId)
        if(!guild) return interaction.reply({ content: "I cant find that guild"})


        try {
            await guild.leave();
            interaction.reply({ content: "Successfully leave the guild."})
        } catch (e) {
            interaction.reply({ content: `${e}` })
        }
    }
}