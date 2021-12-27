const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");
const axios = require("axios");
module.exports = { 
    name: 'anime', 
    description: 'Get some gifs, picture, and sentence from an anime character',
    cooldown: 10,
    options: [
        {
            name: "baka",
            description: "Send a baka gif",
            type: "SUB_COMMAND"
        },
        {
            name: "dance",
            description: "Send a dance gif",
            type: "SUB_COMMAND"
        },
        {
            name: "bite",
            description: "Send a bite gif",
            type: "SUB_COMMAND"
        },
        {
            name: "blush",
            description: "Send a blush gif",
            type: "SUB_COMMAND"
        },
        {
            name: "bonk",
            description: "Send a bonk gif",
            type: "SUB_COMMAND"
        },
        {
            name: "cuddle",
            description: "Send a cuddle gif",
            type: "SUB_COMMAND"
        },
        {
            name: "hug",
            description: "Send a hug gif",
            type: "SUB_COMMAND"
        },
        {
            name: "quote",
            description: "Send a quote from an anime character",
            type: "SUB_COMMAND"
        },
        {
            name: "sad",
            description: "Send a sad gif",
            type: "SUB_COMMAND"
        },
        {
            name: "slap",
            description: "Send a slap gif",
            type: "SUB_COMMAND"
        },
        {
            name: "waifu",
            description: "Send a waifu gif",
            type: "SUB_COMMAND"
        },
        {
            name: "wallpaper",
            description: "Send an anime wallpaper",
            type: "SUB_COMMAND"
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const subc = interaction.options.getSubcommand();
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        try {
            switch(subc) {
                case "baka" : 
                    embed.setAuthor("Baka! >,<", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.baka())
                    return interaction.reply({ embeds: [embed] })
                
                case "bite" : 
                    embed.setAuthor("Yummy~ 🦷", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.bite())
                    return interaction.reply({ embeds: [embed] })
                
                case "blush" : 
                    embed.setAuthor("Shy~ (/▽＼)", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.blush())
                    return interaction.reply({ embeds: [embed] })
                
                case "bonk" : 
                    embed.setAuthor("Bonk! 🪓😡", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.bonk())
                    return interaction.reply({ embeds: [embed] })
                
                case "cuddle" : 
                    embed.setAuthor("Ahh yes~ §(*￣▽￣*)§", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.cuddle())
                    return interaction.reply({ embeds: [embed] })
                
                case "dance" : 
                    embed.setAuthor("Letsgoo~ 💃🕺", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.dance())
                    return interaction.reply({ embeds: [embed] })
                
                case "hug" : 
                    embed.setAuthor("So comfy~ (∪.∪ )...zzz", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.hug())
                    return interaction.reply({ embeds: [embed] })
                
                case "quote" : 
                    const r1 = await axios.get(`https://some-random-api.ml/animu/quote`);

                    embed.setAuthor("Anime quotes <3!", client.user.avatarURL({ format: "png" }))
                    .addFields(
                        {
                            name: "Character",
                            value: `${r1.data.character}`,
                            inline: true
                        },
                        {
                            name: "Anime",
                            value: `${r1.data.anime}`,
                            inline: true
                        }, 
                        {
                            name: "Sentence",
                            value: `${r1.data.sentence}`
                        }
                    )
                    interaction.reply({ embeds: [embed] })
                
                case "sad" : 
                    embed.setAuthor("Crying~ 😢", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.cry())
                    return interaction.reply({ embeds: [embed] })
                
                case "slap" : 
                    embed.setAuthor("You naughty!! 😡🤚", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.slap())
                    return interaction.reply({ embeds: [embed] })
                
                case "waifu" : 
                    embed.setAuthor("Here's your waifu 💘", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.smile())
                    return interaction.reply({ embeds: [embed] })
                
                case "wallpaper" : 
                    embed.setAuthor("Here's your wallpaper 🖼", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.wallpaper())
                    return interaction.reply({ embeds: [embed] })
                
            }
        } catch (e) {
            embed.setTitle("⚠ An error occurred ⚠")
            .setColor("YELLOW")
            .setDescription(`${e}`)
            .setFooter("🔍")
            .setTimestamp();
        interaction.reply({embeds: [embed], ephemeral: true});
        }
    }
}