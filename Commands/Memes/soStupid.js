const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../config.json');

module.exports = { 
    name: 'stupid', 
    description: 'Gives a is so stupid image',
    options: [
        {
            name: "target",
            description: "Give target to shit on it",
            type: "USER",
            required: true
        },
    ] ,
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

    phin(`https://some-random-api.ml/canvas/its-so-stupid?avatar=${target.displayAvatarURL()}&dog=im+stupid`).then(res => {
    if (res.statusCode !== 200) {
        console.log('Bad status code')
        console.log(JSON.parse(res.body))
    }
    fs.writeFile('./stupid.png', res.body, (err) => {
        if (err) {
        errorEmbed.setDescription(`${false1} **|*** An error was occured\n\`${err}\``)
        interaction.reply({ embeds: [errorEmbed] })
        } else {
        interaction.reply({ files: ['./stupid.png'] })
        }
    })
})
    }
}