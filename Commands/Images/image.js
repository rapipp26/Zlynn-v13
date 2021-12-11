const { CommandInteraction, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: "image",
    description: "Image manipulation command.",
    permission: "ATTACH_FILES",
    options: [
        {
            name: "target",
            description: "Select a target.",
            type: "USER",
            required: true
        },
        {
            name: "image",
            description: "Select the type of image filter.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "rip",
                    value: "rip"
                },
                {
                    name: "trash",
                    value: "trash"
                },
                {
                    name: "rainbow",
                    value: "rainbow"
                },
                {
                    name: "sepia",
                    value: "sepia"
                },
                {
                    name: "shit",
                    value: "shit"
                },
                {
                    name: "triggered",
                    value: "triggered"
                },
                {
                    name: "wanted",
                    value: "wanted"
                },
                {
                    name: "wasted",
                    value: "wasted"
                },

            ],

        }
    ],
    /** 
     * @param {CommandInteraction} interaction  
     */
    async execute(interaction) {
        const { options } = interaction
        const loltarget = options.getMember("target");
        const choices = interaction.options.getString("image");
        
        const avatar = await loltarget.avatarURL({ format: "png" });
        const image = await Canvas.rip(choices);
        
        const attachment = new MessageAttachment(image, `${choices}.gif`);
       
        interaction.reply({ files: [attachment]});
    }
};