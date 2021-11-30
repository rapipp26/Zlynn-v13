const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const config = require ('../../Structures/config.json');
const anime = require("anime-actions");
const axios = require("axios");
module.exports = { 
    name: 'anime', 
    description: 'Get some gifs, picture, and sentence from an anime character',
    options: [
        {
            name: "baka",
            description: "Send a baka gif",
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

        try {
            switch(subc) {
                case "baka" : {
                    embed.setAuthor("Baka! >,<", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.baka())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "bite" : {
                    embed.setAuthor("Yummy~ 🦷", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.bite())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "blush" : {
                    embed.setAuthor("Shy~ (/▽＼)", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.blush())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "bonk" : {
                    embed.setAuthor("Bonk! 🪓😡", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.bonk())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "cuddle" : {
                    embed.setAuthor("Ahh yes~ §(*￣▽￣*)§", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.cuddle())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "dance" : {
                    embed.setAuthor("Letsgoo~ 💃🕺", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.dance())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "hug" : {
                    embed.setAuthor("So comfy~ (∪.∪ )...zzz", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.hug())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "quote" : {
                    const r1 = await axios.get(`https://some-random-api.ml/animu/quote`);

                    embed.setAuthor("Anime quotes <3!", client.user.avatarURL({ format: "png" }))
                    .addFields(
                        {
                            name: "Character",
                            value: `${response.data.character}`,
                            inline: true
                        },
                        {
                            name: "Anime",
                            value: `${response.data.anime}`,
                            inline: true
                        }, 
                        {
                            name: "Sentence",
                            value: `${response.data.sentence}`
                        }
                    )
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "sad" : {
                    embed.setAuthor("Crying~ 😢", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.cry())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "slap" : {
                    embed.setAuthor("You naughty!! 😡🤚", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.slap())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "waifu" : {
                    embed.setAuthor("Here's your waifu 💘", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.smile())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
                case "wallpaper" : {
                    embed.setAuthor("Here's your wallpaper 🖼", client.user.avatarURL({ format: "png" }))
                    .setImage(await anime.wallpaper())
                    .setColor("RANDOM")
                    .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    interaction.reply({ embeds: [embed] })
                }
            }
        } catch (e) {
            embed.setTitle("⚠ An error occurred ⚠")
            .setColor("YELLOW")
            .setDescription(`${error}`)
            .setFooter("🔍")
            .setTimestamp();
        interaction.editReply({embeds: [embed], ephemeral: true});
        }
    }
}
