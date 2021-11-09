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
            required: true
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const subreddit = interaction.options.getString("subreddit") || "";
        const embed     = new MessageEmbed();
            
        try {
            const response = await axios.get(`https://meme-api.herokuapp.com/gimme/${subreddit}`);

            if (response.data.nsfw && !interaction.channel.nsfw) {
                embed.setTitle("🔞 NSFW content 🔞")
                    .setDescription("No **NSFW** content allowed in this channel. Go to a channel where **NSFW** is *enabled*.")
                    .setColor("RED");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
            
            embed.setColor("RANDOM")
                .setTitle(response.data.title)
                .setImage(response.data.url)
                .setFooter(`Posted by ${response.data.author} in r/${response.data.subreddit} with ${response.data.ups} upvotes`)
                .setTimestamp();

            const reply = await interaction.reply({ embeds: [embed], fetchReply: true });
            reply.react("🟢");
            reply.react("🔴");
        } catch (error) {
            if (error.response.data.message) {
                embed.setTitle("🔍 Unable to find subreddit 🔎")
                    .setDescription(error.response.data.message);
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

            embed.setTitle("🔍 Unable to reach API 🔎")
                .setDescription(`The connection to the API could not be established.`);
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}