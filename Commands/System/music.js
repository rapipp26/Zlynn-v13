const { CommandInteraction, MessageEmbed, Client, Interaction } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../Structures/config.json');

module.exports = { 
    name: 'music', 
    description: 'Complete music system',
    cooldown: 5,
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
            name: "seek",
            description: "Seeks to the specified position.",
            value: "seek",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "time",
                    description: "Provide a position (in seconds) to seek.",
                    type: "NUMBER",
                    required: true
                },
            ]

        },
        {
            name: "settings",
            description: "Select an option",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select an option", type: "STRING", required: true,
            choices: [
                { name: "π’ View Queue", value: "queue"},
                { name: "β­οΈ Skip Song", value: "skip"},
                { name: "βΈοΈ Pause Song", value: "pause"},
                { name: "βΆοΈ Resume Song", value: "resume"},
                { name: "βΉοΈ Stop Music", value: "stop"},
                { name: "π Shuffle Queue", value: "shuffle"},
                { name: "π Toggle AutoPlay Modes", value: "AutoPlay"},
                { name: "π Add a Related Song", value: "RelatedSong"},
                { name: "π Toggle Repeat Modes", value: "RepeatMode"},
                { name: "β?οΈ Previous Song ", value: "previous"}
        ]}]
        },
        {
            name: "filters",
            description: "Toggle filters",
            type: "SUB_COMMAND",
            options: [{ name: "set", description: "Choose a filter", type: "STRING", required: true,
            choices: [
                {name: "π Turn off all filters", value: "false"},
                {name: "π£ Toggle 8d filter", value: "8d"},
                {name: "π£ Toggle bassboost filter", value: "bassboost"},
                {name: "π£ Toggle echo filter", value: "echo"},
                {name: "π£ Toggle nightcore filter", value: "nightcore"},
                {name: "π£ Toggle surround filter", value: "surround"},
                {name: "π£ Toggle karaoke filter", value: "karaoke"},
                {name: "π£ Toggle vaporwave filter", value: "vaporwave"},
                {name: "π£ Toggle flanger filter", value: "flanger"},
                {name: "π£ Toggle gate filter", value: "gate"},
                {name: "π£ Toggle haas filter", value: "haas"},
                {name: "π£ Toggle reverse filter", value: "reverse"},
                {name: "π£ Toggle mcompand filter", value: "mcompand"},
                {name: "π£ Toggle phaser filter", value: "phaser"},
                {name: "π£ Toggle tremolo filter", value: "tremolo"},
                {name: "π£ Toggle earwax filter", value: "earwax"},
        
            ]}]
        },
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
        .setTitle("β  An error occurred β ")
        .setColor("YELLOW")
        .setTimestamp();
 
        if(!VoiceChannel)
        return interaction.reply({ embeds: [errorEmbed.setDescription("You must be in a voice channel to be able to use the music commands").setFooter("π€")] })

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({ embeds: [errorEmbed.setDescription(`I'm already playing music in <#${guild.me.voice.channelId}>`).setFooter("π€")] })

        try {
            const queue = await client.distube.getQueue(VoiceChannel);

            switch(options.getSubcommand()) {
                case "play" : {
                    client.distube.playVoiceChannel( VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({ content: "πΌ Request recieved" })
                }
                case "volume" : {
                    const Volume = options.getNumber("percent")
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({ embeds: [errorEmbed.setDescription("You have to specify a number between 1 and 100").setFooter("πΆ")] })

                    client.distube.setVolume(VoiceChannel, Volume);
                    return interaction.reply({ content: `πΆ Volume has been set to \`${Volume}%\``});
                } 
                case "seek" : {
                    const queue = await client.distube.getQueue(VoiceChannel);
                    const Time = options.getNumber("time");

                    if(!queue)
                    return interaction.reply({ embeds: [errorEmbed.setDescription("There is no queue").setFooter("β")] })

                    await queue.seek(Time);
                    return interaction.reply({content: `β­οΈ Seeked to \`${Time}\``});
                }
                case "settings" : {
                    if(!queue) 
                    return interaction.reply({ embeds: [errorEmbed.setDescription("There is no queue").setFooter("β")] })

                    switch(options.getString("options")) {
                        case "skip" : 
                        await queue.skip(VoiceChannel);
                        return interaction.reply({ content: "β© Song has been skipped." });

                        case "stop" :
                        await queue.stop(VoiceChannel);
                        return interaction.reply({ content: "βΉ Music has been stopped." });

                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({ content: "βΈ Song has been paused." });

                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({ content: "β― Song has been resumed." });

                        case "shuffle" :
                        await queue.shuffle(VoiceChannel);
                        return interaction.reply({ content: "π The queue has been shuffled." });

                        case "AutoPlay" :
                        let mode = await queue.toggleAutoplay(VoiceChannel);
                        return interaction.reply({ content: `π Autoplay mode is set to : ${mode ? "On" : "Off"}` });

                        case "RelatedSong" :
                        await queue.addRelatedSong(VoiceChannel);
                        return interaction.reply({ content: "π A related song has been added to the queue." });

                        case "RepeatMode" :
                        let mode2 = client.distube.setRepeatMode(queue);
                        return interaction.reply({ content: `π Repeat mode has been set to : **${mode2 = mode2 ? mode2 == 2 ? "Queue" : "Song" : "Off" }**` });

                        case "previous" :
                            await queue.previous(VoiceChannel);
                            return interaction.reply({ content: `β?οΈ Playing previous song.` });

                        case "queue" :
                        return interaction.reply({ embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`Top 10 Songs in ${guild.name} Queue`, guild.iconURL({ dynamic: true }))
                        .setDescription(`${queue.songs.slice(0, 10).map(
                            (song, id) => `\n**${id + 1}**. [${song.name}](${song.url})γ»\`${song.formattedDuration}\` - ${song.user}\n`)}`)
                        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true }))]});
                    }
                    return;
                }
                case "filters" : {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({ embeds: [errorEmbed.setDescription("There is no queue").setFooter("β")] })

                    switch(options.getString("set")) {
                        case "false" : 
                        await queue.setFilter(false);
                        return interaction.reply({content: `β Disabled all filters.`});

                        case "8d" : 
                        await queue.setFilter(`3d`);
                        return interaction.reply({content: `β Toggled the 8D filter.`});

                        case "karaoke" : 
                        await queue.setFilter(`karaoke`);
                        return interaction.reply({content: `β Toggled the karaoke filter.`});
                        
                        case "vaporwave" : 
                        await queue.setFilter(`vaporwave`);
                        return interaction.reply({content: `β Toggled the vaporwave filter.`});

                        case "flanger" : 
                        await queue.setFilter(`flanger`);
                        return interaction.reply({content: `β Toggled the flanger filter.`});

                        case "gate" : 
                        await queue.setFilter(`gate`);
                        return interaction.reply({content: `β Toggled the gate filter.`});

                        case "haas" : 
                        await queue.setFilter(`haas`);
                        return interaction.reply({content: `β Toggled the haas filter.`});

                        case "reverse" : 
                        await queue.setFilter(`reverse`);
                        return interaction.reply({content: `β Toggled the reverse filter.`});

                        case "mcompand" : 
                        await queue.setFilter(`mcompand`);
                        return interaction.reply({content: `β Toggled the mcompand filter.`});

                        case "phaser" : 
                        await queue.setFilter(`phaser`);
                        return interaction.reply({content: `β Toggled the phaser filter.`});

                        case "tremolo" : 
                        await queue.setFilter(`tremolo`);
                        return interaction.reply({content: `β Toggled the tremolo filter.`});

                        case "earwax" : 
                        await queue.setFilter(`earwax`);
                        return interaction.reply({content: `β Toggled the earwax filter.`});

                        case "bassboost" : 
                        await queue.setFilter(`bassboost`);
                        return interaction.reply({content: `β Toggled the bassboost filter.`});
                        
                        case "echo" : 
                        await queue.setFilter(`echo`);
                        return interaction.reply({content: `β Toggled the echo filter.`});
                        
                        case "nightcore" : 
                        await queue.setFilter(`nightcore`);
                        return interaction.reply({content: `β Toggled the nightcore filter.`});
                        
                        case "surround" : 
                        await queue.setFilter(`surround`);
                        return interaction.reply({content: `β Toggled the surround filter.`});
                        
                    }
                }
            }
        } catch (e) {
            errorEmbed.setDescription(`${e}`)
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true  })
        }
    }
}