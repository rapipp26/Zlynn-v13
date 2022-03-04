const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, Collection } = require("discord.js");
const schema = require("../../Schemas/economyDB");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(!interaction.isButton()) return;
        const { member, customId, user } = interaction;

        if(!["10","50","100","done"].includes(customId)) return;

        schema.findOne({ userId : user.id }, async(err, docs) => {
            switch(customId) {
                case "10" :
                    docs.withd += 10
                    docs.save()
                    interaction.update({ content: `Please click the button below to increase the amount you want to deposit. Amount: \`${docs.withd}\`` })
                break;
                case "50" :
                    docs.withd += 50
                    docs.save()
                    interaction.update({ content: `Please click the button below to increase the amount you want to deposit. Amount: \`${docs.withd}\`` })
                break;
                case "100" :
                    docs.withd += 100
                    docs.save()
                    interaction.update({ content: `Please click the button below to increase the amount you want to deposit. Amount: \`${docs.withd}\`` })
                break;
                case "done" :
                    if(docs.cash < docs.widht) return interaction.followUp({ content: `${client.config.cancel} Your cash is less than the amount you want to deposit`})
                    interaction.update({ content: `${client.config.checked} Successfully deposited \`${docs.withd}\` to your bank account.`})
                    docs.bank = docs.withd
                    docs.widht = 0
                    docs.save()
                break;
            }
        })
        
    }
}