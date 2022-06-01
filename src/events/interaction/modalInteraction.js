const { Client, MessageEmbed, ModalSubmitInteraction } = require("discord.js");
const Rcon = require("modern-rcon");
const config = require('../../../config.json')

let embed = new MessageEmbed()
.setTitle("Console Output")
.setColor(config.colors.embedHex)

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ModalSubmitInteraction} interaction
     * @param {Client} client
     * @param {Rcon} rcon
     */
    execute(interaction, client, rcon) {
        if (!interaction.isModalSubmit()) return;
        if(interaction.customId === "mcCommandModal") {
            const Command = interaction.fields.getTextInputValue('commandInput')
            console.log(Command)
            try {
                rcon.connect().then(() => {
                    return rcon.send(Command);
                  }).then(res => {
                    console.log(res);
                    embed.setDescription(`The output from the console is -> \`${res}\``)
                    interaction.reply({embeds: [embed], content: null})
                  }).then(() => {
                    return rcon.disconnect();
                  });
            } catch (err) {
                interaction.channel.send("Error on command" + err)
            }
        }
    }
}