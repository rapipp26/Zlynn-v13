const { MessageEmbed, MessageButton, MessageActionRow } = require(`discord.js`);
const ms = require("ms");
const db = require("../../Schemas/warnDB");
const uuid = require("uuid");

module.exports = {
    name: "moderate",
    cooldown: 15,
    description: "Moderate a member",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "member",
            description: "Select the member to moderate",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Reason you do action to the member",
            type: "STRING",
            required: true
        },
        {
            name: "time",
            description: "You can provide the time by reading the example. Ex: 10s, 5m, 7d, 1h,",
            type: "STRING",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("member");
        const { guild, user } = interaction;

        let time = interaction.options.getString("time") || 0;

        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: `${client.config.cancel} You can't moderate this member, it has the same/higher role position than you`});
        if(target.user.id.includes(interaction.guild.ownerId)) return interaction.reply({ content: `${client.config.cancel} You can't moderate the server owner, me neither can't`});
        if(target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ content: `${client.config.cancel} I can't moderate this member, it has a higher role than me`});
        if(target.id === client.user.id) return interaction.reply({ content: `${client.config.cancel} You can't moderate me`});
        if(target.id === interaction.member.id) return interaction.reply({ content: `${client.config.cancel} You can't moderate yourself`});

        const embed = new MessageEmbed()
        .setDescription(`**Please choose an action on ${target} by clicking the button below.**`)
        .setColor("RED")

        const embed2 = new MessageEmbed()
        .setDescription(`You wrote the time for \`${ms(time)}\`. Please choose an action for ${target} by clicking the button below`)
        .setColor("RED")

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Kick")
            .setCustomId("k"),
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Ban")
            .setCustomId("b"),
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Warn")
            .setCustomId("w"),
        )

        const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("DANGER")
            .setLabel("Timeout")
            .setCustomId("t"),
        )


        if(time === 0) {
            return
        } else if(!time === 0) {
            time = ms(time)
            return interaction.reply({embeds: [embed2], components: [row2], content: "You have `25` seconds to choose an action" })
        } else {
            interaction.reply({embeds: [embed], components: [row], content: "You have `25` seconds to choose an action" })   
        }
        const filter = (i) => i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 25000})

        collector.on('collect', async (i) => {
            switch(i.customId) {
                case "k" :
                    await target.kick(reason);
                    const kembed = new MessageEmbed().setColor("GREEN").setAuthor({ name: "Successfully Kick A Member", iconURL: client.user.avatarURL({ format: "png" })}).addFields({ name: "Member", value: `${target}`}, { name: "Reason", value: `${reason}`}).setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()
                    i.update({ embeds: [kembed], components: [] })
                break;
                case "b" :
                    await target.ban({ reason: `${reason}` });
                    const bembed = new MessageEmbed().setColor("GREEN").setAuthor({ name: "Successfully Ban A Member", iconURL: client.user.avatarURL({ format: "png" })}).addFields({ name: "Member", value: `${target}`}, { name: "Reason", value: `${reason}`}).setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()
                    i.update({ embeds: [bembed], components: [] })
                break;
                case "t" :
                    await target.timeout(time, `${reason}`)
                    const tembed = new MessageEmbed().setColor("GREEN").setAuthor({ name: "Successfully Timeout A Member", iconURL: client.user.avatarURL({ format: "png" })}).addFields({ name: "Member", value: `${target}`}, { name: "Reason", value: `${reason}`}, { name: "Time", value: `${ms(time)}`}).setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()
                    i.update({ embeds: [tembed], components: [] })
                break;
                case "w" :
                    const id = uuid.v4();

                    await db.findOneAndUpdate(
                        { GuildID : guild.id, ExecuterID : user.id },
                        { ExecuterTag : user.tag, UserID : target.user.id },
                        { UserTag : target.user.tag, WarnID : id },
                        { new: true, upsert: true }
                    )

                    const wembed = new MessageEmbed().setColor("GREEN").setAuthor({ name: "Successfully Warn A Member", iconURL: client.user.avatarURL({ format: "png" })}).addFields({ name: "Member", value: `${target}`}, { name: "Reason", value: `${reason}`}, { name: "Warn ID", value: `${id}`}, { name: "Remove Warn", value: `\`/warn remove ${id}\``}, { name: "Warnings", value: `\`/warn check\``}).setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true })).setTimestamp()
                    i.update({ embeds: [wembed], components: [] })
                break;
            }
        })

        collector.on('end', () => {
            interaction.editReply({ embeds: [], components: [], content: `This message has been expired ${client.config.cooldown}` })
        })
    }
};