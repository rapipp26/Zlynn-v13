const { CommandInteraction, MessageEmbed, Client, MessageButton, MessageActionRow } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown } = require ('../../config.json');

module.exports = { 
    name: 'help2', 
    description: 'tolol',
    /**
     * 
     * @param {*} interaction 
     * @param {*} client 
     */
    async execute(interaction, client) {
        const b1 = new MessageButton()
        .setCustomId("1")
        .setLabel("Anime")
        .setStyle("SUCCESS")
        .setEmoji("🍙");
        const b2 = new MessageButton()
        .setCustomId("2")
        .setLabel("Information")
        .setStyle("SUCCESS")
        .setEmoji("🎫");
        const b3 = new MessageButton()
        .setCustomId("3")
        .setLabel("Memes")
        .setStyle("SUCCESS")
        .setEmoji("🐸");
        const b4 = new MessageButton()
        .setCustomId("4")
        .setLabel("Overlay")
        .setStyle("SUCCESS")
        .setEmoji("🎑");
        const b5 = new MessageButton()
        .setCustomId("5")
        .setLabel("System")
        .setStyle("SUCCESS")
        .setEmoji("📣");
        const row = new MessageActionRow()
        .addComponents([ b1, b2, b3, b4, b5 ]);

        interaction.reply({ components: row, content: "Tets" })


    }
}