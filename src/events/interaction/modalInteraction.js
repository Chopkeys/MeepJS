const { Client, MessageEmbed, ModalSubmitInteraction, User } = require("discord.js");
const Rcon = require("modern-rcon");
const config = require('../../../config.json')
const Perms = require('../../validation/MCCommandPerms')

let embed = new MessageEmbed()
.setTitle("Console Output")
.setColor(config.colors.embedHex)

let failEmbed = new MessageEmbed()
.setColor("RED")

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
            const Input = interaction.fields.getTextInputValue('commandInput')
            const InputArray = Input.split(" ")
            const command = InputArray[0]
            console.log(command)
            const FinalCmd = Perms.find( eachElement => eachElement.name === command )

            if(!FinalCmd) {
              failEmbed.setTitle("That command does not exist").setDescription("This bot uses only **vanilla** commands")
              interaction.reply({embeds: [failEmbed], content: null})
              return;
            }

            if(FinalCmd.settings.enabled === false) {
              failEmbed.setTitle("This command is disabled").setDescription("This command has been disabled in the configuration files")
              interaction.reply({embeds: [failEmbed], content: null})
              return;
            }
            
            if(!interaction.memberPermissions.has(FinalCmd.settings.dcPerm)) {
              failEmbed.setTitle("You do not have permissions to run that").setDescription("Your account does not have the required permissions to run that command")
              interaction.reply({embeds: [failEmbed], content: null})
              return;
            }

            try {
                rcon.connect().then(() => {
                    return rcon.send(Input);
                  }).then(res => {
                    console.log(res);
                    embed.setDescription(`The output from the console is -> \`${res}\``)
                    interaction.reply({embeds: [embed], content: null})
                  }).then(() => {
                    return rcon.disconnect();
                  });
            } catch (err) {
              failEmbed.setTitle("The bot has encountered an error").setDescription(`The bot encountered an error attempting to connect, send the command or disconnect from the server, here it the error -> \n\`${err}\``)
              interaction.channel.send({embeds: [failEmbed], content: null})
            }
        }
    }
}