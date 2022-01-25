const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.type === "DM") return;

        const { content, guild, author, channel } = message;
        const messageContent = content.toLocaleLowerCase().split(" ");

        const Filter =  client.filters.get(guild.id);
        if(!Filter) return;

        const wordsUsed = [];
        let shouldDelete = false;

        messageContent.forEach((word) => {
            if(Filter.includes(word)) {
                wordsUsed.push(word);
                shouldDelete = true;
            }
        });

        if(shouldDelete) message.deletable().catch(() => {});

        if(wordsUsed.length) {
            const channelID = client.filtersLog.get(guild.id);
            if(!channelID) return;
            const channelObject = guild.channels.cache.get(channelID);
            if(!channelObject) return;
            

            const Embed = new MessageEmbed()
            .setAuthor({ name: `Banned word(s) log!`, iconURL: client.user.avatarURL({ format: "png" })})
            .setColor("RED")
            .addFields(
                { name: "Member", value: `${author.tag}`},
                { name: `${wordsUsed.length} Word(s)`, value: `\`${wordsUsed.map((w) => w)}\``},
                { name: "Channel", value: `${channel}`}
            )
            .setTimestamp()
            .setFooter({ text: "🔨" })

            channelObject.send({ embeds: [Embed] })
        }
    },
}