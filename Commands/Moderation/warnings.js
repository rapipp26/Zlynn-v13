const { MessageEmbed } = require(`discord.js`)
const db = require("../../Schemas/warnDB")


module.exports = {
    name: "warn",
    cooldown: 10,
    description: "Remove or check warnings from a member",
    options: [
        {
            name: "check",
            description: "Check warnings from a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "member",
                    description: "Select a member to check their warnings",
                    type: "USER",
                    required: true
                }
            ]
        },
        {
            name: "remove",
            description: "Remove warnings from a member",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "warn-id",
                    description: "Provide the warn id to remove",
                    type: "STRING",
                    required: true
                }
            ]
        },
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction;

        const target = options.getUser("member");
        const id = options.getString("warn-id");
        const sub = options.getSubcommand();

        switch(sub) {
            case "check" :
                db.find({ TargetID: target.id }).then((docs) => {
                    console.log("jumlah warn: ", docs.length)
                 }).catch(console.error)
            break;
            case "remove" :
                db.findOneAndRemove({ WarnID: id }).then((res) => {
                    console.log(res);
                }).catch(console.error)
            break;
        }
    }
};