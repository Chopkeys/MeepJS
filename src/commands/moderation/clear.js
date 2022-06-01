const { CommandInteraction, MessageEmbed} = require("discord.js")
const config = require('../../../config.json')

module.exports = {
    name: "clear",
    category: "moderation",
    usage: "/clear [command]",
    description: "Deletes a specified amount of messages from a channel or a target",
    permission: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Select the amount of messages to delete from a channel or a target",
            type: "NUMBER",
            required: true
        },
        {
            name: "target",
            description: "Select the target to clear messages from",
            type: "USER",
            required: false
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        const { channel, options} = interaction;

        const amount = options.getNumber("amount");
        const target = options.getMember("target");

        const Messages = await channel.messages.fetch();

        const Response = new MessageEmbed()
        .setColor(config.colors.embedHex)

        if(target) {
            let i = 0;
            const filtered = [];
            (await Messages).filter((m) => {
                if(m.author.id = target.id && amount > i) {
                    filtered.push(m);
                    i++;            
                }
            })

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared \`${messages.size}\` from ${target}`).setTitle(`Succesfull`)
                interaction.reply({ embeds: [Response] })
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared \`${messages.size}\` from ${channel}`).setTitle(`Succesfull`)
                interaction.reply({ embeds: [Response] })
            })
        }
    }
}