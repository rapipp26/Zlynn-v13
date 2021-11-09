const { CommandInteraction, MessageEmbed } = require("discord.js");
const { false1 } = require ("../../config.json");
const axios = require("axios");

module.exports = { 
    name: "zoo", 
    description: "Gives images and facts about certain animals.",
    options: [
        {
            name: "animal",
            description: "Choose an animal.",
            type: "STRING",
            required: true,
            choices: [
                { name: "Bird", value: "birb" },
                { name: "Cat", value: "cat" },
                { name: "Dog", value: "dog" },
                { name: "Panda", value: "panda" },
                { name: "Fox", value: "fox" },
                { name: "Red Panda", value: "red_panda" },
                { name: "Koala", value: "koala" },
                { name: "Raccoon", value: "raccoon" },
                { name: "Kangaroo", value: "kangaroo" },
            ],
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const animal      = interaction.options.getString("animal");
        const capitalised = animal.replaceAll("_", " ").replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
        const embed       = new MessageEmbed();

        try {
            const response = await axios.get(`https://some-random-api.ml/animal/${animal}`);
                embed.setAuthor(`${capitalised} facts`, interaction.user.displayAvatarURL({dynamic: true}))
                .setDescription(response.data.fact)
                .setColor("RANDOM")
                .setImage(response.data.image)
                .setFooter(`Executed by ${interaction.user.tag}`)
                .setTimestamp();
            interaction.reply({embeds: [embed]})
        } catch (error) {
            console.log(error);
            embed.setTitle("⚠ An error occured ⚠")
            .setColor("YELLOW")
            .setDescription("The API that we're using is probably undergoing maintenance.")
            .setFooter("🚧")
            interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}