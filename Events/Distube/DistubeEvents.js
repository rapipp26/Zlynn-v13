const client = require("../../index");
const { MessageEmbed } = require("discord.js");
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, human, piano, setting } = require ('../../config.json');

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Playing")
    .setDescription(`${true1} **|** Playing \`${song.name}\` - \`${song.formattedDuration}\`\n${setting} **|** ${status(queue)}\n${human} **|** Requested by: ${song.user}`)
    .setColor("BLURPLE")
    .setFooter("▶")
    .setTimestamp() ] }))

    .on("addSong", (queue, song) => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Added new song to the queue.")
    .setDescription(`${true1} **|** Added \`${song.name}\` - \`${song.formattedDuration}\`\n${human} **|** To the queue by ${song.user}`)
    .setColor("BLURPLE")
    .setFooter("➕")
    .setTimestamp() ] }))

    .on("addList", (queue, playlist) => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Added Playlist")
    .setDescription(`${true1} **|** Added \`${playlist.name} To the queue\`\n${setting} **|** ${status(queue)}`)
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

    .on("empty", channel => channel.send({ content: `${false1} **|** Voice channel is empty! Leaving the channel...` }))

    .on("searchNoResult", message => message.channel.send({ embeds: [new MessageEmbed()
        .setAuthor("⚠ An error occurred ⚠")
        .setColor("YELLOW")
        .setDescription(`No result found!`)
        .setFooter("⛔")
        .setTimestamp()]}))

    .on("finish", queue => queue.textChannel.send({ embeds: [new MessageEmbed()
    .setAuthor("Music finished")
    .setColor("#303136")
    .setDescription("Queue finished! leaving the channel...")
    .setFooter("🏁")
    .setTimestamp()]}))