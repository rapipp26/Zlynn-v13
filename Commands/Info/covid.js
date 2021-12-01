const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'covid', 
    description: 'Information about covid in worldwide or specified country.',
    options: [
        {
            name: "all",
            description: "Shows covid-19 status worldwide",
            type: "SUB_COMMAND"
        },
        {
            name: "country",
            description: "Shows covid-19 at the provided country",
            type: "SUB_COMMAND",
            options:[{ name: "country_name", description: "Provide the country", type: "STRING", required: true }]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const axios = require('axios');
        const embed = new MessageEmbed()
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        const subc = interaction.options.getSubcommand();

        try {
            switch(subc) {
                case "all" : {
                    const response2 = await axios.get(`https://disease.sh/v3/covid-19/all`);
        
                    embed.setAuthor("Covid Cases Worldwide 🦠", client.user.avatarURL({ format: "png" }))
                    .setColor("DARK_BLUE")
                    .setThumbnail("https://c.tenor.com/Aqe8V3wni4QAAAAC/covid19-coronavirus.gif")
                    .addFields(
                        {
                            name: "Total Cases",
                            value: `\`\`\`${response2.data.cases.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Today Cases",
                            value: `\`\`\`${response2.data.todayCases.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Total Death",
                            value: `\`\`\`${response2.data.deaths.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Today Deaths",
                            value: `\`\`\`${response2.data.todayDeaths.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Active",
                            value: `\`\`\`${response2.data.active.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Critical",
                            value: `\`\`\`${response2.data.critical.toLocaleString()}\`\`\``
                        },
                        {
                            name: "World Population",
                            value: `\`\`\`${response2.data.population.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Last Updated",
                            value: `<t:${parseInt(response2.data.updated / 1000 )}:F>`
                        },
                    )
        
                    interaction.reply({ embeds: [embed] })
                }
                case "country" : {
                    const cnt = await interaction.options.getString("country_name")
                    const resp = await axios.get(`https://disease.sh/v3/covid-19/countries/${cnt}`)

                    embed.setAuthor(`${resp.data.country} Covid-19 Information 🦠`)
                    .setColor("DARK_RED")
                    .addFields(
                        {
                            name: "Country Iso",
                            value: `${resp.data.countryInfo.iso3}`,
                            inline: true
                        },
                        {
                            name: "Country Continent",
                            value: `${resp.data.continent}`,
                            inline: true
                        },
                        {
                            name: "Total Cases",
                            value: `\`\`\`${resp.data.cases.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Today Cases",
                            value: `\`\`\`${resp.data.todayCases.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Total Death",
                            value: `\`\`\`${resp.data.deaths.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Today Deaths",
                            value: `\`\`\`${resp.data.todayDeaths.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Active",
                            value: `\`\`\`${resp.data.active.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Critical",
                            value: `\`\`\`${resp.data.critical.toLocaleString()}\`\`\``
                        },
                        {
                            name: "Last Updated",
                            value: `<t:${parseInt(resp.data.updated / 1000 )}:F>`
                        },
                    )
                    .setImage(`${resp.data.flag}`)
                    interaction.reply({ embeds: [embed] })

                    
                }
            }
    } catch (error) {
                embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(`${error}`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
    }
    }
}