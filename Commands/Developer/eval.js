const { MessageEmbed } = require(`discord.js`)
const dev = ["768378164942471188", "495488613811879946"]

module.exports = {
    name: "eval",
    cooldown: 0,
    description: "Eval a code",
    options: [
        {
            name: "code",
            type: "STRING",
            description: "The code to evaluate",
            required: true
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if(!dev.includes(interaction.user.id)) return interaction.reply({ content: `${client.config.false1} Only developers can use this command.`, ephemeral: true })

        const clean = text => {
            if (typeof text === 'string')
                return text
                    .replace(/`/g, '`' + String.fromCharCode(8203))
                    .replace(/@/g, '@' + String.fromCharCode(8203));
            return text;
        };

        try {
            const code = interaction.options.getString("code");
            let evaled = eval(code);
    
            if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
    
            interaction.reply({ content: `${clean(evaled), { code: 'xl' }}`});
        } catch (err) {
            interaction.reply(`\`ERROR\` \`\`\`js\n${clean(err)}\n\`\`\``);
        }
    }
};