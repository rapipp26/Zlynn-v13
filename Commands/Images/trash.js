const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { true1, false1, arrow, reply1, reply2, thumbsup, thumbsdown, piano, human, setting } = require ('../../config.json');

module.exports = { 
    name: 'blur', 
    description: 'Blur your friends avatar',
    options: [
        {
            name: "target",
            description: "Target to blur",
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

    phin(`https://some-random-api.ml/canvas/pixelate?avatar=${target.displayAvatarURL()}`).then(res => {
    if (res.statusCode !== 200) {
        console.log('Bad status code')
        console.log(JSON.parse(res.body))
    }
    fs.writeFile('./blur.png', res.body, (err) => {
        if (err) {
            errorEmbed.setDescription(`${false1} **|*** An error was occurred\n\`${err}\``)
            interaction.reply({ embeds: [errorEmbed] })
        } else {
        interaction.reply({ files: ['./blur.png'] })
        }
    })
})
    }
}