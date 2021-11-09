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
                embed.setTitle("⚠ An error occured ⚠")
                    .setDescription("No **NSFW** content allowed in this channel. Go to a channel where **NSFW** is *enabled*.")
                    .setColor("RED")
                    .setFooter("🔞 No NSFW Content 🔞");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
            
            embed.setColor("RANDOM")
                .addFields(
                    {
                        name: "Post Title",
                        value: `${response.data.title}`,
                        inline: true
                    },
                    {
                        name: "Post Author",
                        value: `${response.data.author}`,
                        inline: true
                    },
                    {
                        name: "Post Upvotes",
                        value: `${response.data.ups.toLocaleString()}`,
                        inline: true
                    }
                )
                .setImage(response.data.url)
                .setFooter(`Executed by ${interaction.user.tag}`)
                .setTimestamp();

            const reply = await interaction.reply({ embeds: [embed], fetchReply: true });
            reply.react("🟢");
            reply.react("🔴");
        } catch (error) {
            if (error.response.data.message) {
                embed.setTitle("⚠ An error occured ⚠")
                    .setDescription(error.response.data.message)
                    .setFooter("Unable to find the subreddit 🔍");
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

            embed.setTitle("⚠ An error occured ⚠")
                .setDescription(`The connection to the API could not be established.`)
                .setFooter("Unable to find the subreddit 🔍");
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}