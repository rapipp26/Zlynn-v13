const { CommandInteraction, MessageEmbed, Client, Interaction } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../config.json');

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
                { name: "queue", value: "queue"},
                { name: "skip", value: "skip"},
                { name: "pause", value: "pause"},
                { name: "resume", value: "resume"},
                { name: "stop", value: "stop"},
        ]}]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interacrion 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = Interaction;
        const VoiceChannel = member.voice.channel;
        const errorEmbed = new MessageEmbed()
        .setTitle("⚠ An error occured ⚠")
        .setColor("YELLOW")
        .setTimestamp();


        if(!VoiceChannel)
        return interaction.reply({ embeds: [errorEmbed.setDescription("You must be in a voice channel to be able to use the music commands").setFooter("🎤")] })

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({ embeds: [errorEmbed.setDescription(`I'm already playing music in <#${guild.me.voice.channelId}>`).setFooter("🎤")] })

        try {
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
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue) 
                    return interaction.reply({ embeds: [errorEmbed.setDescription("There is no queue").setFooter("⛔")] })

                    switch(options.getString("options")) {
                        case "skip" : 
                        await queue.skip(VoiceChannel);
                        return interaction.reply({ content: "⏩ Song has been skipped." })
                        case "stop" :
                        await queue.stop(VoiceChannel);
                        return interaction.reply({ content: "⏹ Music has been stopped" })
                        case "pause" :
                        await queue.pause(VoiceChannel);
                        return interaction.reply({ content: "⏸ Song has been paused" })
                        case "resume" :
                        await queue.resume(VoiceChannel);
                        return interaction.reply({ content: "⏯ Song has been resumed" })
                        case "queue" :
                        return interaction.reply({ embeds: [new MessageEmbed()
                        .setColor("DARK_AQUA")
                        .setDescription(`${queue.songs.map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\` `
                        )}`)]});
                    }
                    return;
                }  
            }
        } catch (e) {
            errorEmbed.setDescription(`⚠ Alert: ${e}`)
            return interaction.reply({ embeds: [errorEmbed] })
        }
    }
}