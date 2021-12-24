const { CommandInteraction, MessageEmbed, Client, Interaction } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../Structures/config.json');

module.exports = { 
    name: 'music', 
    description: 'Complete music system',
    options: [
        {
            name: "play",
            description: "Play a song",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Provide a name or a url for the song", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "Alter the volume",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "1- = 10%", type: "NUMBER", required: true}]
        },
        {
            name: "settings",
            description: "Select an option",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select an option", type: "STRING", required: true,
            choices: [
                { name: "🔢 View Queue", value: "queue"},
                { name: "⏭️ Skip Song", value: "skip"},
                { name: "⏸️ Pause Song", value: "pause"},
                { name: "▶️ Resume Song", value: "resume"},
                { name: "⏹️ Stop Music", value: "stop"},
                { name: "🔀 Shuffle Queue", value: "shuffle"},
                { name: "🔃 Toggle AutoPlay Modes", value: "AutoPlay"},
                { name: "🈁 Add a Related Song", value: "RelatedSong"},
                { name: "🔁 Toggle Repeat Modes", value: "RepeatMode"},
                { name: "⏮️ Previous Song ", value: "previous"}
        ]}]
        },
        {
            name: "filters",
            description: "Select a filter for music",
            type: "SUB_COMMAND",
            options: [{ name: "filters", description: "Select an option", type: "STRING", required: true,
            choices: [
                { name: "3️⃣ 3d", value: "3d"},
                { name: "🎸 Bass Boost", value: "bassboost"},
                { name: "✨ Echo", value: "echo"},
                { name: "🎤 Karaoke", value: "karaoke"},
                { name: "🌙 Night Core", value: "nightcore"},
                { name: "🌊 Vapor Wave", value: "vaporwave"},
                { name: "🚫 Off", value: "false"},
                { name: "🎊 Surround", value: "surround" }
        ]}]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;
        const errorEmbed = new MessageEmbed()
        .setTitle("⚠ An error occurred ⚠")
        .setColor("YELLOW")
        .setTimestamp();

        if(!VoiceChannel)
        return interaction.reply({ embeds: [errorEmbed.setDescription("You must be in a voice channel to be able to use the music commands").setFooter("🎤")] })

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({ embeds: [errorEmbed.setDescription(`I'm already playing music in <#${guild.me.voice.channelId}>`).setFooter("🎤")] })

        try {
            const queue = await client.distube.getQueue(VoiceChannel);

            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({ content: "🎼 Request recieved" })
                }
                case "volume" : {
                    const Volume = options.getNumber("percent")
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({ embeds: [errorEmbed.setDescription("You have to specify a number between 1 and 100").setFooter("📶")] })

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({ content: `📶 Volume has been set to \`${Volume}%\``});
                } 
                case "settings" : {
                    if(!queue) 
                    return interaction.reply({ embeds: [errorEmbed.setDescription("There is no queue").setFooter("⛔")] })

                    switch(options.getString("options")) {
                        case "skip" : 
                        await queue.skip(VoiceChannel);
                        return interaction.reply({ content: "⏩ Song has been skipped." });

                        case "stop" :
                        await queue.stop(VoiceChannel);
                        return interaction.reply({ content: "⏹ Music has been stopped." });

                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({ content: "⏸ Song has been paused." });

                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({ content: "⏯ Song has been resumed." });

                        case "shuffle" :
                        await queue.shuffle(VoiceChannel);
                        return interaction.reply({ content: "🔀 The queue has been shuffled." });

                        case "AutoPlay" :
                        let mode = await queue.toggleAutoplay(VoiceChannel);
                        return interaction.reply({ content: `🔃 Autoplay mode is set to : ${mode ? "On" : "Off"}` });

                        case "RelatedSong" :
                        await queue.addRelatedSong(VoiceChannel);
                        return interaction.reply({ content: "🈁 A related song has been added to the queue." });

                        case "RepeatMode" :
                        let mode2 = client.distube.setRepeatMode(queue);
                        return interaction.reply({ content: `🔃 Repeat mode has been set to : **${mode2 = mode2 ? mode2 == 2 ? "Queue" : "Song" : "Off" }**` });

                        case "previous" :
                            await queue.previous(VoiceChannel);
                            return interaction.reply({ content: `⏮️ Playing previous song.` });

                        case "queue" :
                        return interaction.reply({ embeds: [new MessageEmbed()
                        .setColor("DARK_AQUA")
                        .setAuthor(`Top 20 Songs in queue`)
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                        .setDescription(`${queue.songs.slice(0, 20).map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)
                        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }))]});
                    }
                    return;
                }
                case "filters" : {
                    if(!queue) 
                    return interaction.reply({ embeds: [errorEmbed.setDescription("There is no queue").setFooter("⛔")] })

                    switch(options.getString("filters")) {
                        case "false" : {
                            queue.setFilter(false);
                            return interaction.reply({ content: "🚫 All filters has been **disabled**" });
                        }
                        case "3d" : {
                            queue.setFilter(`3d`);
                            return interaction.reply({ content: "3️⃣ 3d filter has been **enabled**" });
                        }
                        case "bassboost" : {
                            queue.setFilter(`bassboost`);
                            return interaction.reply({ content: "🎸 Bass Boost filter has been **enabled**" });
                        }
                        case "echo" : {
                            queue.setFilter(`echo`);
                            return interaction.reply({ content: "✨ Echo filter has been **enabled**" });
                        }
                        case "nightcore" : {
                            queue.setFilter(`nightcore`);
                            return interaction.reply({ content: "🌙 Nightcore filter has been **enabled**" });
                        }
                        case "karaoke" : {
                            queue.setFilter(`karaoke`);
                            return interaction.reply({ content: "🎤 Karaoke filter has been **enabled**" });
                        }
                        case "vaporwave" : {
                            queue.setFilter(`vaporwave`);
                            return interaction.reply({ content: "🌊 Vapor Wave filter has been **enabled**" });
                        }
                        case "surround" : {
                            queue.setFilter(`surround`);
                            return interaction.reply({ content: "🎊 Surround filter has been **enabled**" });
                        }
                    }
                }
            }
        } catch (e) {
            errorEmbed.setDescription(`${e}`)
            return interaction.reply({ embeds: [errorEmbed] })
        }
    }
}