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
            name: "choices",
            description: "Select the choices",
            type: "STRING",
            required: true,
            choices: [
                { name: "baka", value: "baka" },
                { name: "dance", value: "dance" },
                { name: "blush", value: "blush" },
                { name: "bite", value: "bite" },
                { name: "bonk", value: "bonk" },
                { name: "cuddle", value: "cuddle" },
                { name: "hug", value: "hug" },
                { name: "quote", value: "quote" },
                { name: "sad", value: "sad" },
                { name: "slap", value: "slap" },
                { name: "waifu", value: "waifu" },
                { name: "wallpaper", value: "wallpaper" },
            ]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const subc = interaction.options.getString("choices");
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