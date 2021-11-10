const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../config.json');
const music = require("@koenie06/discord.js-music");

module.exports = { 
    name: 'play', 
    description: 'Play a music in voice channel',
    options: [
        {
            name: "song",
            description: "Provide a song name",
            type: "STRING",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {

        const channel = interaction.member.voice.channel;
        const song = interaction.options.getString('song');

        music.play({
            interaction: interaction,
            channel: channel,
            song: song
        });
    }
}