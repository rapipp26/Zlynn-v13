const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../Structures/config.json');

module.exports = { 
    name: 'gay', 
    description: 'Make target avatar with gay overlay',
    options: [
        {
            name: "target",
            description: "The target to make avatar with gay overlay",
            type: "USER",
            required: true
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target")

    phin(`https://some-random-api.ml/canvas/gay?avatar=${target.avatarURL({ format: "png" })}`).then(res => {
    if (res.statusCode !== 200) {
        console.log('Bad status code')
        console.log(JSON.parse(res.body))
    }
    fs.writeFile('./gay.png', res.body, (err) => {
        if (err) {
            errorEmbed.setDescription(`${false1} **|*** An error was occurred\n\`${err}\``)
            interaction.reply({ embeds: [errorEmbed] })
        } else {
        interaction.reply({ files: ['./gay.png'] })
        }
    })
})
    }
}