const { Client, CommandInteraction, MessageEmbed, Interaction } = require("discord.js");

module.exports = {
    name: "interactionCreate",

    /**
     * 
     * @param {CommandInteraction} interacion 
     * @param {Client} client 
     */
    async execute(interaction, client, rcon) {
        if(!interaction.isCommand() || interaction.isContextMenu()) return; 
        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.reply({embeds: [
            new MessageEmbed()
            .setColor("RED")
            .setTitle('Error')
            .setDescription('❌ An error occured while running this command.')
        ]}) && client.commands.delete(interaction.commandName);

        if (command.permission && !interaction.member.permissions.has(command.permission)) {
            return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
        }

        command.execute(interaction, client, rcon)
    }
}