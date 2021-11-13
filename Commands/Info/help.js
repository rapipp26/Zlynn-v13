const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../config.json');

module.exports = { 
    name: 'help', 
    description: 'Gives my command information!! <3',
    /**
     * 
     * @param {CommandInteraction} interaction
     * @param {Client} client 
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

        const embed = new MessageEmbed()
        .setAuthor("Select Module")
        .setDescription("Please click the button below to check our commands")
        .setColor("LUMINOUS_VIVID_PINK")
        .setFooter(`Executed by ${interaction.user.tag}`)
        .setTimestamp()

        interaction.reply({ embeds: [embed], components: [row], fetchReply: true })

        setTimeout( async () => {
            const b1 = new MessageButton()
            .setCustomId("1")
            .setLabel("Anime")
            .setStyle("SUCCESS")
            .setDisabled(true)
            .setEmoji("🍙");
            const b2 = new MessageButton()
            .setCustomId("2")
            .setLabel("Information")
            .setStyle("SUCCESS")
            .setDisabled(true)
            .setEmoji("🎫");
            const b3 = new MessageButton()
            .setCustomId("3")
            .setLabel("Memes")
            .setStyle("SUCCESS")
            .setDisabled(true)
            .setEmoji("🐸");
            const b4 = new MessageButton()
            .setCustomId("4")
            .setLabel("Overlay")
            .setStyle("SUCCESS")
            .setDisabled(true)
            .setEmoji("🎑");
            const b5 = new MessageButton()
            .setCustomId("5")
            .setLabel("System")
            .setStyle("SUCCESS")
            .setDisabled(true)
            .setEmoji("📣");
            const row1 = new MessageActionRow()
            .addComponents([ b1, b2, b3, b4, b5 ]);
            interaction.editReply({ embeds: [embed], components: [row1] })
        }, 1000 * 30)
}
}