const client = require("../../index");
const { MessageEmbed } = require("discord.js");
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, human, piano, setting } = require ('../../Structures/config.json');

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Now Playing")
    .addFields(
    )
    .setDescription(`${client.config.play} **|** Playing \`${song.name}\` - \`${song.formattedDuration}\`\n${client.config.control} **|** ${status(queue)}\n${client.config.user} **|** Requested by: ${song.user}`)
    .setColor("BLURPLE")
    .setFooter("▶")
    .setTimestamp() ] }))

    .on("addSong", (queue, song) => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Added to queue")
    .setDescription(`${client.config.play} **|** Added \`${song.name}\` - \`${song.formattedDuration}\`\n${client.config.user} **|** Requested by: ${song.user}`)
    .setColor("BLURPLE")
    .setFooter("➕")
    .setTimestamp() ] }))

    .on("addList", (queue, playlist) => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Added Playlist")
    .setDescription(`${client.config.play} **|** Added \`${playlist.name}\` To the queue\n${client.config.control} **|** ${status(queue)}\n ${client.config.user} **|** Requested by: ${song.user}`)
    .setColor("BLURPLE")
    .setFooter("➕")
    .setTimestamp()]}))

    .on("error", (channel, e) => {
        channel.send({ embeds: [new MessageEmbed()
        .setAuthor("⚠ An error occurred ⚠")
        .setColor("YELLOW")
        .setDescription(`${e}`)
        .setFooter("⛔")
        .setTimestamp()]})
    })

    .on("empty", queue => queue.textChannel.send({ content: `${client.config.off} **|** Voice channel is empty! Leaving the channel...` }))

    .on("searchNoResult", message => message.channel.send({ embeds: [new MessageEmbed()
        .setAuthor("⚠ An error occurred ⚠")
        .setColor("YELLOW")
        .setDescription(`No result found!`)
        .setFooter("⛔")
        .setTimestamp()]}))

    .on("finish", queue => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Music finished")
    .setColor("#303136")
    .setDescription(`Queue finished! leaving the channel... ${client.config.off}`)
    .setFooter("🏁")
    .setTimestamp()]}))