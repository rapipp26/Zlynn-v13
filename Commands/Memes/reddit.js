const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios");
const { true1, false1, arrow, reply1, reply2 } = require ('../../config.json');

module.exports = {
    name: "reddit",
    description: "request a meme from reddit via subreddits.",
    options: [
        {
            name: "subreddit",
            description: "Provide a name of the subreddit.",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { options } = interaction;

        const url = "https://meme-api.herokuapp.com/gimme/";

        const name = options.getString("subreddit");

        const meme = url+name;

        const errorEmbed = new MessageEmbed()
        .setColor("RED")

        let data, response;

        try {
            response = await axios.get(meme);
            data = response.data;
        } catch (e) {
            if(e){
                if(e.message.startsWith("Request failed with status code")) {
                    errorEmbed.setDescription(`${false1} **|** Subreddit \`${name}\` does not exist`)
                    interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                } else if(e) {
                    errorEmbed.setDescription(`${false1} **|** An error was occured\n\`${e}\``)
                    interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                } 
            }
        }
        async function ResponseEmbed() {
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
    
        const message = await interaction.reply({ embeds: [Response], fetchReply: true })
        message.react(`${true1}`)
        message.react(`${false1}`)
        }

        if(data === null) return;
        if(interaction.channel.nsfw && data.nsfw === true) return ResponseEmbed();
        if(!interaction.channel.nsfw && data.nsfw === true) return interaction.reply({ embeds: [errorEmbed.setDescription(`${false1} **|** We dont serving nsfw content here, please move to channel where nsfw is enabled.`)], ephemeral: true });
        
    }
}