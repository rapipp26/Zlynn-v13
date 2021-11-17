const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, piano, human, setting } = require ('../../config.json');

module.exports = { 
    name: 'delete', 
    description: 'Delete your friends and throw them to trash',
    options: [
        {
            name: "target",
            description: "Target to delete",
            type: "USER",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const phin = require('phin')
        let fs = require('fs')
        const target = interaction.options.getMember("target")
        const errorEmbed = new MessageEmbed()
        .setColor("RED")

    phin(`https://api.leoapi.xyz/image/delete?image=${target.displayAvatarURL()}`).then(res => {
    if (res.statusCode !== 200) {
        console.log('Bad status code')
        console.log(JSON.parse(res.body))
    }
    fs.writeFile('./trash.png', res.body, (err) => {
        if (err) {
            errorEmbed.setDescription(`${false1} **|*** An error was occurred\n\`${err}\``)
            interaction.reply({ embeds: [errorEmbed] })
        } else {
        interaction.reply({ files: ['./trash.png'] })
        }
    })
})
    }
}