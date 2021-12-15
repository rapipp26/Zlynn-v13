const { CommandInteraction, MessageEmbed, Client, Message } = require('discord.js');
const config = require ('../../Structures/config.json');

module.exports = { 
    name: 'serverinfo', 
    description: 'Server Information',
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild } = interaction;

        const {  } = guild;

        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${guild.name} Information ^3^`, client.user.avatarURL({ format: "png" }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .addFields(
            {
                name: "General Information",
                value: 
                `
                ・Name : ${guild.name}
                ・Created : <t:${parseInt(guild.createdTimestamp / 1000)}:R>
                ・Owner : <@${guild.ownerId}>
                ・Description : ${guild.description || "No description."}
                ・Roles : ${guild.roles.cache.size}
                `
            },
            {
                name: "Users Information",
                value:
                `
                ・Member : ${guild.members.cache.filter((m) => !m.user.bot).size }
                ・Bots : ${guild.members.cache.filter((m) => m.user.bot).size}

                ・Users Total : ${guild.memberCount}
                `
            },
            {
                name: "Channels Information",
                value:
                `
                ・Text : ${guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
                ・Voice : ${guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
                ・Threads : ${guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD").size}
                ・Category : ${guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
                ・News : ${guild.channels.cache.filter((c) => c.type === "GUILD_NEWS").size}
                ・Stage : ${guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}

                ・Channels Total : ${guild.channels.cache.size}
                `
            },
            {
                name: "Emojis & Stickers Information",
                value: 
                `
                ・Animated : ${guild.emojis.cache.filter((e) => e.animated).size}
                ・Static : ${guild.emojis.cache.filter((e) => !e.animated).size}
                ・Stickers : ${guild.stickers.cache.size}

                ・Emojis & Stickers Total : ${guild.stickers.cache.size + guild.emojis.cache.size}
                `
            },
            {
                name: "Nitro Statistic",
                value: 
                `
                ・Boosts : ${guild.premiumSubscriptionCount}
                ・Boosters : ${guild.members.cache.filter((m) => m.premiumSince).size}
                ・Boost Tier : ${guild.premiumTier.replace("TIER_","")}
                `
            }
        )
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

        interaction.reply({ embeds: [Embed] })
    }
}