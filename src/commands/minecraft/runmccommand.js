const {
    MessageEmbed,
    CommandInteraction,
    Client,
    Modal,
    TextInputComponent,
    MessageActionRow
} = require("discord.js");
const Rcon = require("modern-rcon")
const config = require('../../../config.json')

module.exports = {
    name: "talktomc",
    category: "minecraft",
    description: "Talk directly to a minecraft console!",
    usage: "/talktomc [command]",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     * @param {Rcon} rcon
     */
     async execute(interaction, client) {
        const cmd = new TextInputComponent()
            .setCustomId('commandInput')
            .setLabel("Command")
            .setStyle('SHORT');
        const modal = new Modal()
            .setCustomId("mcCommandModal")
            .setTitle("Enter your command below")
        const FirstRow = new MessageActionRow().addComponents(cmd);
        modal.addComponents(FirstRow)
        await interaction.showModal(modal);  
     }
}