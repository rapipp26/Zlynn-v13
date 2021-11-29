const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
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
                if(interaction.values[0] === '1') {
                    interaction.update({ content: "Lmao banget ngap 😱"})
                }
                if(interaction.values[0] === '2') {
                    interaction.update({ content: "Anjime banget ngap 😱"})
                }
            }
            const menu = new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Nothing selected')
            .setDisabled(true)
            .addOptions([
                {
                    label: 'Select me',
                    description: 'This is a description',
                    value: '1',
                },
                {
                    label: 'You can select me too',
                    description: 'This is also a description',
                    value: '2',
                },
            ]);
    
            const row = new MessageActionRow()
                .addComponents([ menu ]);

            setTimeout(() => {
				interaction.editReply({ content: "Test", components: [row] })
			}, 3000)
        }
    }
}