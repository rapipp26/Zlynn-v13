const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");
const { true1, false1, arrow, reply1, reply2 } = require ('../../Structures/config.json');

module.exports = {
    name: "giveaway",
    description: "A complete giveaway system.",
    permission: "VIEW_AUDIT_LOG",
    cooldown: 10,
    options: [
        {
            name: "start",
            description: "Start a giveaway.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "Provide a duration for this giveaway (1m, 1h 1d)",
                    type: "STRING",
                    required: true
                },
                {
                    name: "winners",
                    description: "Select the amount of winners for this giveaway.",
                    type: "INTEGER",
                    required: true
                },
                {
                    name: "prize",
                    description: "Provide the name of the prize",
                    type: "STRING",
                    required: true
                },
                {
                    name: "channel",
                    description: "Select a channel to send the giveaway to.",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "actions",
            description: "Options for giveaways.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        },
                    ]
                },
                {
                    name: "message_id",
                    description: "Provide the message id of the giveaway",
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client) {
        const { options } = interaction;

        const Sub = options.getSubcommand();

        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed() 
        .setColor("GREEN");

        switch(Sub) {
            case "start" : {

                const gchannel = options.getChannel("channel") || interaction.channel;
                const duration = options.getString("duration");
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages : {
                        giveaway: "🎉 **New Giveaway Started!!** 🎉",
                        giveawayEnded: "🎁 **Giveaway Ended** 🎁",
                        winMessage: "Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}"
                    }
                }).then(async () => {
                    successEmbed.setDescription(`${true1} **|** Giveaway was succesfully started.`)
                    return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                }).catch((err) => {
                    errorEmbed.setDescription(`${false1} **|** An error was occured\n\`${err}\``)
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                })
            }
            break;

            case "actions" : {
                const choice = options.getString("options");
                const messageId = options.getString("message_id");

                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId)

                if (!giveaway) {
                    errorEmbed.setDescription(`${false1} **|** Unable to find the giveaway with the message id : ${messageId} in this guild`);
                    return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                }

                switch(choice) {
                    case "end" : {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription(`${true1} **|** Giveaway was ended`)
                            return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`${false1} **|** An error was occured\n\`${err}\``)
                            return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                   }
                   break;

                   case "pause" : {
                    client.giveawaysManager.pause(messageId).then(() => {
                        successEmbed.setDescription(`${true1} **|** Giveaway has been paused`)
                        return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                    }).catch((err) => {
                        errorEmbed.setDescription(`${false1} **|** An error was occured\n\`${err}\``)
                        return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                    });
                   }
                   break;

                   case "unpause" : {
                    client.giveawaysManager.unpause(messageId).then(() => {
                        successEmbed.setDescription(`${true1} **|** Giveaway has been unpaused`)
                        return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                    }).catch((err) => {
                        errorEmbed.setDescription(`${false1} **|** An error was occured\n\`${err}\``)
                        return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                    });
                   }
                   break;

                   case "reroll" : {
                    client.giveawaysManager.reroll(messageId).then(() => {
                        successEmbed.setDescription(`${true1} **|** Giveaway was rerolled`)
                        return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                    }).catch((err) => {
                        errorEmbed.setDescription(`${false1} **|** An error was occured\n\`${err}\``)
                        return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                    });
                   }
                   break;

                   case "delete" : {
                    client.giveawaysManager.delete(messageId).then(() => {
                        successEmbed.setDescription(`${true1} **|** Giveaway was deleted`)
                        return interaction.reply({ embeds: [successEmbed], ephemeral: true })
                    }).catch((err) => {
                        errorEmbed.setDescription(`${false1} **|** An error was occured\n\`${err}\``)
                        return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                    });
                }
                
            }
           break;
        }
           default : {
               console.log("Error in giveaway command.")
           }
        }

    }

}


    