const { CommandInteraction, MessageEmbed, Client, MessageActionRow, MessageButton } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'role-list', 
    description: 'Shows all role list in the server.',
    
    async execute(interaction, client) {
        let i0 = 0;
        let i1 = 10;
        let page = 1;

        let description =
        `**_Roles :_**\n` +
        interaction.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r)
            .slice(i0, i1)
            .join("\n");

        let embed = new MessageEmbed()
            .setAuthor("Role information :-3", client.user.avatarURL({ dynamic: true }))
            .setTitle(`Page・${page}`)
            .setDescription(description)
            .setColor("RANDOM")
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();


        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("previous")
                .setStyle("PRIMARY")
                .setLabel("◄"),
            new MessageButton()
                .setCustomId("next")
                .setStyle("PRIMARY")
                .setLabel("►")
        )
        client.on("interactionCreate", async interaction => {
            if (interaction.customId === 'previous') {
                await interaction.deferUpdate();

                i0 = i0 - 10;
                i1 = i1 - 10;
                page = page - 1;

                let description =
                    `**_Roles :_**\n` +
                    interaction.guild.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(r => r)
                        .slice(i0, i1)
                        .join("\n");

                embed.setTitle(`Page・${page}`)
                embed.setDescription(description)
                embed.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                embed.setTimestamp();
                
                await interaction.editReply({ embeds: [embed], components: [buttons] });
            }
            if (interaction.customId === 'next') {
                await interaction.deferUpdate();

                i0 = i0 + 10;
                i1 = i1 + 10;
                page = page + 1;

                let description =
                    `**_Roles :_**\n` +
                    interaction.guild.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map(r => r)
                        .slice(i0, i1)
                        .join("\n");

                embed.setTitle(`Page・${page}`)
                embed.setDescription(description)
                embed.setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                embed.setTimestamp();

                await interaction.editReply({ embeds: [embed], components: [buttons] });
            }
        })
        interaction.followUp({ embeds: [embed], components: [buttons] });
    }
}