const { MessageEmbed, Guild, Client, CommandInteraction } = require("discord.js")
const config = require('../../../config.json')
const logsSchema = require('../../schemas/logsDB')

module.exports = {
    name: "logs",
    category: "systems",
    usage: "/logs",
    description: "Opens up the log panel",

    /**
     * 
     * @param { CommandInteraction } interaction 
     * @param { Client } client 
     */

    async execute(interaction, client) {
        //Get any necessarry data
        const guildId = interaction.guild.id
        const data = logsSchema.find({ guildId })

        //Specific log type data
        const delData = data.logTypes
        console.log(delData)

        const logPanel = new MessageEmbed()
        .setColor(config.colors.embedHex)
        .setTitle("Log Panel")
        .addField("Message Delete Function", ``)
    }
}