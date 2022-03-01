const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, Collection } = require("discord.js");
const { true1, false1, arrow, reply1, reply2 } = require ("../../Structures/config.json")
const config = require('../../Structures/config.json');
const cooldowns = new Map();

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if(!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Collection());
            };
            const current_time = Date.now();
            const time_stamps = cooldowns.get(command.name);
            const cooldown_amonut = (command.cooldown) * 1000;
            if(time_stamps.has(interaction.user.id)){
                const expiration_time = time_stamps.get(interaction.user.id) + cooldown_amonut;

                if(expiration_time > current_time) {
                    var reply;
                    var time_left = (expiration_time - current_time) / 1000 ;
                    if(time_left > 3600) {
                        time_left = time_left / 3600
                        reply = `${config.cooldown} **|** You can use \`${command.name}\` command in another **${time_left.toFixed(1)}**h !`;
                    } else if(time_left > 60) {
                        time_left = time_left / 60
                        reply = `${config.cooldown} **|** You can use \`${command.name}\` command in another **${time_left.toFixed(1)}**m !`;
                    } else {
                        reply = `${config.cooldown} **|** You can use \`${command.name}\` command in another **${time_left.toFixed(1)}**s !`;
                    }
                    interaction.reply({embeds : [
                        new MessageEmbed()
                        .setDescription(`${reply}`)
                        .setColor('RED')
                    ], ephemeral: true});
                    return;
                }
            }
            time_stamps.set(interaction.user.id, current_time);
                setTimeout(() => {
                    time_stamps.delete(interaction.user.id);
                }, cooldown_amonut);
            if(!command) return interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor("NAVY")
                .setDescription(`${config.false1} **|** *An error occured while running this command.*`)
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client)
        }
    }
}