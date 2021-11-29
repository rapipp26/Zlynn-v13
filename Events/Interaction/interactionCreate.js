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
                    const embed1 = new MessageEmbed()
                    .setAuthor("Anime commands! ヾ(≧▽≦*)o", client.user.avatarURL({ format: "png" }))
                    .setColor("BLURPLE")
                    .addFields(
                        {
                            name: "/baka",
                            value: "```/baka [target]```"
                        },
                        {
                            name: "/bite",
                            value: "```/bite [target]```"
                        },
                        {
                            name: "/blush",
                            value: "```/blush [target]```"
                        },
                        {
                            name: "/cuddle",
                            value: "```/cuddle [target]```"
                        },
                        {
                            name: "/dance",
                            value: "```/dance [target]```"
                        },
                        {
                            name: "/anime_quote",
                            value: "```/anime_quote```"
                        },
                        {
                            name: "/slap",
                            value: "```/slap [target]```"
                        },
                    )
                    .setImage("https://cdn.discordapp.com/attachments/848032759939203072/911567264011132938/Zlynn_Banner.png")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();
                    interaction.update({ embeds: [embed1] })
                }
                if(interaction.values[0] === '2') {
                    interaction.update({ content: "Anjime banget ngap 😱"})
                }
                if(interaction.values[0] === '3') {
                    interaction.update({ content: "Anjime banget ngap 😱"})
                }
                if(interaction.values[0] === '4') {
                    interaction.update({ content: "Anjime banget ngap 😱"})
                }
                if(interaction.values[0] === '5') {
                    interaction.update({ content: "Anjime banget ngap 😱"})
                }
            }
            const menu = new MessageSelectMenu()
            .setCustomId('kontol')
            .setPlaceholder('Select Module')
            .setDisabled(true)
            .addOptions([
                {
                    label: 'Select me',
                    description: 'This is a description',
                    value: '1',
                },
            ]);
    
            const row = new MessageActionRow()
                .addComponents([ menu ]);

            setTimeout(() => {
				interaction.editReply({ content: "Test", components: [row] })
			}, 15000)
        }
    }
}