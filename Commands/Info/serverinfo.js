const { CommandInteraction, MessageEmbed, Client, MessageButton } = require('discord.js');
const config = require ('../../Structures/config.json');
const paginationEmbed = require('discordjs-button-pagination');

module.exports = { 
    name: 'serverinfo', 
    description: 'Server Information',
    cooldown: 10,
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { guild } = interaction;

        const Embed = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${guild.name} | Information`, client.user.avatarURL({ format: "png" }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(
                `
                **General Information**
                ・Name : ${guild.name}
                ・Created : <t:${parseInt(guild.createdTimestamp / 1000)}:R>
                ・Owner : <@${guild.ownerId}>
                ・Description : ${guild.description || "No description."}
                ・Roles : ${guild.roles.cache.size}
                `
        );
        const Embed1 = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${guild.name} | Information`, client.user.avatarURL({ format: "png" }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(    
                `
                **Users Information**
                ・Member : ${guild.members.cache.filter((m) => !m.user.bot).size }
                ・Bots : ${guild.members.cache.filter((m) => m.user.bot).size}

                ・Users Total : ${guild.memberCount}
                `
        );
            
        const Embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${guild.name} | Information`, client.user.avatarURL({ format: "png" }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(    
            `
            **Channels Information**
            ・Text : ${guild.channels.cache.filter((c) => c.type === "GUILD_TEXT").size}
            ・Voice : ${guild.channels.cache.filter((c) => c.type === "GUILD_VOICE").size}
            ・Threads : ${guild.channels.cache.filter((c) => c.type === "GUILD_NEWS_THREAD" && "GUILD_PUBLIC_THREAD" && "GUILD_PRIVATE_THREAD").size}
            ・Category : ${guild.channels.cache.filter((c) => c.type === "GUILD_CATEGORY").size}
            ・News : ${guild.channels.cache.filter((c) => c.type === "GUILD_NEWS").size}
            ・Stage : ${guild.channels.cache.filter((c) => c.type === "GUILD_STAGE_VOICE").size}

            ・Channels Total : ${guild.channels.cache.size}
            `
        );
        
        const Embed3 = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${guild.name} | Information`, client.user.avatarURL({ format: "png" }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(    
            `
            **Emojis & Stickers Information**
            ・Animated : ${guild.emojis.cache.filter((e) => e.animated).size}
            ・Static : ${guild.emojis.cache.filter((e) => !e.animated).size}
            ・Stickers : ${guild.stickers.cache.size}

            ・Emojis & Stickers Total : ${guild.stickers.cache.size + guild.emojis.cache.size}
            `
        );
        
        const Embed4 = new MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(`${guild.name} | Information`, client.user.avatarURL({ format: "png" }))
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter(`Executed by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(    
            `
            **Nitro Statistic**
            ・Boosts : ${guild.premiumSubscriptionCount}
            ・Boosters : ${guild.members.cache.filter((m) => m.premiumSince).size}
            ・Boost Tier : ${guild.premiumTier.replace("TIER_","")}
            `
        );

        const btn1 = new MessageButton()
        .setStyle('SUCCESS')
        .setCustomId('1')
        .setEmoji(`${client.config.previous}`)

        const btn2 = new MessageButton()
        .setStyle('SUCCESS')
        .setCustomId('2')
        .setEmoji(`${client.config.next}`)

        const embedlist = [
            Embed,
            Embed1,
            Embed2,
            Embed3,
            Embed4
        ]

        const buttonList = [
            btn1,
            btn2
        ]
        const timeout = 30000;

        paginationEmbed(interaction, embedlist, buttonList, timeout);
    }
}