const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'covid', 
    description: 'Information about covid in worldwide or specified country.',
    //ptions: [
    //   {
    //         name: "country",
    //        description: "Provide a country to check",
    //        type: "STRING",
    //        required: false
    //    }
    //],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const axios = require('axios');
        //const c = await interaction.options.getString("country") || "";
        const embed = new MessageEmbed()

        try {
            const response2 = await axios.get(`https://disease.sh/v3/covid-19/all`);
            console.log(response2.data.cases)

            embed.setAuthor("Covid Cases Worldwide 🦠", client.user.avatarURL({ format: "png" }))
            .setColor("DARK_BLUE")
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
                    value: `<t:${parseInt(response2.data.updated)}:F>`
                },
            )
            .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

            interaction.reply({ embeds: [embed] })
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