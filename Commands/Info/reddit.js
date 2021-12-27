const { CommandInteraction, MessageEmbed }     = require("discord.js");
const axios                                    = require("axios");
const { true1, false1, arrow, reply1, reply2, thumbsdown, thumbsup } = require ('../../Structures/config.json');

module.exports = {
    name: "reddit",
    cooldown: 10,
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
                    .setFooter("🔞")
                    .setTimestamp();
                return interaction.reply({embeds: [embed], ephemeral: true});
            }
            
            embed.setColor("RANDOM")
                .addFields(
                    {
                        name: "Post Title",
                        value: `${reply1} ${response.data.title}`
                    },
                    {
                        name: "Post Author",
                        value: `${reply1} ${response.data.author}`
                    },
                    {
                        name: "Post Upvotes",
                        value: `${reply1} ${response.data.ups.toLocaleString()}`
                    }
                )
                .setImage(response.data.url)
                .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            const reply = await interaction.reply({ embeds: [embed], fetchReply: true });
            reply.react(`${thumbsup}`);
            reply.react(`${thumbsdown}`);
        } catch (error) {
            if (error.response.data.message) {
                embed.setTitle("⚠ An error occurred ⚠")
                    .setColor("YELLOW")
                    .setDescription(error.response.data.message)
                    .setFooter("🔍")
                    .setTimestamp();
                return interaction.reply({embeds: [embed], ephemeral: true});
            }

            embed.setTitle("⚠ An error occurred ⚠")
                .setColor("YELLOW")
                .setDescription(`${error}`)
                .setFooter("🔍")
                .setTimestamp();
            interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}