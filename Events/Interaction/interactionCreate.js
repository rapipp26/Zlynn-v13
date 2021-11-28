const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { true1, false1, arrow, reply1, reply2 } = require ("../../Structures/config.json")

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor("NAVY")
                .setDescription(`${false1} **|** *An error occured while running this command ╰（‵□′）╯*`)
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }

        if (interaction.isSelectMenu()) {
            console.log(interaction)
            if (interaction.customId === 'select') {
                if(interaction.value === '1') {
                    interaction.update({ content: "Lmao banget ngap 😱"})
                }
                if(interaction.value === '2') {
                    interaction.update({ content: "Anjime banget ngap 😱"})
                }
            }
        }
    }
}