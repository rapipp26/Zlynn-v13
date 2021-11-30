const { default: axios } = require('axios');
const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'covid', 
    description: 'Information about covid in worldwide or specified country.',
    options: [
        {
            name: "country",
            description: "Provide a country to check",
            type: "STRING",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const c = await interaction.options.getString("country");
        const response2 = await axios.get(`https://disease.sh/v3/covid-19/all`)
        const embed = new MessageEmbed()

        try {
        if(!c) {
            const response2 = await axios.get(`https://disease.sh/v3/covid-19/all`)

            embed.setAuthor("Covid-19 Information ^0^", client.user.avatarURL({ format: "png" }))
            .setColor("DARK_BLUE")
            .setDescription(
               `\`\`\`\css`
                +
                "Covid Cases Worldwide 🦠"
                +
                "\n\n"
                +
                `[ Total Cases ] : ${response2.data.cases.toLocaleString()}`
                `[ Today Cases ] : ${response2.data.todayCases}`
                +
                "\n"
                +
                `[ Total Deaths ] : ${response2.data.deaths.toLocaleString()}`
                `[ Today Deaths] : ${response2.data.todayDeaths.toLocaleString()}`
                +
                `[ Total Recovered ] : ${response2.data.recovered.toLocaleString()}`
                `[ Today Recovered] : ${response2.data.todayRecovered.toLocaleString()}`
                +
                `[ Active ] : ${response2.data.active.toLocaleString()}`
                `[ Critical] : ${response2.data.critical.toLocaleString()}`
                +
                `[ World Population ] : ${response2.data.population.toLocaleString()}`
                `\`\`\``
            )
            .addField("Last Updated", `<t:${parseInt(response2.data.updated)}:F>`)
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
        } else if(c) {
            const response = await axios.get(`https://disease.sh/v3/covid-19/countries/${country}`)
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