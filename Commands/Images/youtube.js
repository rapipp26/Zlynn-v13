const { CommandInteraction, MessageEmbed } = require('discord.js');
const { true1, false1, arrow, reply1, reply2 } = require ('../../Structures/config.json');

module.exports = { 
    name: 'youtube', 
    description: 'Gives a youtube comment',
    options: [
        {
            name: "text",
            description: "Give text to put in to the comment",
            type: "STRING",
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
        const comment = interaction.options.getString("text")
        const errorEmbed = new MessageEmbed()
        .setColor("RED")

    phin(`https://some-random-api.ml/canvas/youtube-comment?avatar=${interaction.user.target.avatarURL({ format: "png" })}&username=${interaction.user.username}&comment=${comment}`).then(res => {
    if (res.statusCode !== 200) {
        console.log('Bad status code')
        console.log(JSON.parse(res.body))
    }
    fs.writeFile('./youtube.png', res.body, (err) => {
        if (err) {
        errorEmbed.setDescription(`${false1} **|*** An error was occured\n\`${err}\``)
        interaction.reply({ embeds: [errorEmbed] })
        } else {
        interaction.reply({ files: ['./youtube.png'] })
        }
    })
})
    }
}