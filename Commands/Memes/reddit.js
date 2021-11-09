const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios                                = require("axios");

module.exports = {
    name: "reddit",
    description: "Request random content from Reddit via subreddits.",
    options: [
        {
            name: "subreddit",
            description: "Provide a subreddit to request content from.",
            type: "STRING",
            required: false
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const subreddit = interaction.options.getString("subreddit") || "";
        const errorEmbed = new MessageEmbed()
        .setColor("RED")
            
        try {
            const response = await axios.get(`https://meme-api.herokuapp.com/gimme/${subreddit}`);

            if (response.data.nsfw && !interaction.channel.nsfw) {
                errorEmbed.setDescription(`${false1} **|** We dont serving nsfw content here, please move to channel where nsfw is enabled.`)
                return interaction.reply({embeds: [errorEmbed], ephemeral: true});
            }
            
            const Response = new MessageEmbed()

            .addFields(
                {
                    name: "Reddit Title",
                    value: `${reply1} ${data.title}`
                },
                {
                    name: "Post Link",
                    value: `${reply1} ${data.postLink}`
                },
                {
                    name: "Post Author",
                    value: `${reply1} ${data.author}`
                }
            )
            .setImage(data.url)
            .setFooter(`Executed by ${interaction.user.tag}`)
            .setTimestamp()
            .setColor("RANDOM")

            const reply = await interaction.reply({ embeds: [Response], fetchReply: true });
            reply.react("🟢");
            reply.react("🔴");
        } catch (error) {
            if (error.response.data.message) {
                errorEmbed.setDescription(`${false1} **|** Unable to finde subreddit\n\`\`\`${error.response.data.message}\`\`\``)
                return interaction.reply({embeds: [errorEmbed], ephemeral: true});
            }

            errorEmbed.setDescription(`${false1} **|** The connection to the API could not be established.`)
            interaction.reply({embeds: [errorEmbed], ephemeral: true});
        }
    }
}