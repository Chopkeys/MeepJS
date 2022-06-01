const { CommandInteraction, MessageEmbed, Client, Message } = require("discord.js")
const config = require('../../../config.json')
const ms = require("ms")

module.exports = {
    name: "giveaway",
    category: "giveaway",
    usage: "/giveaway [sub_command] [options]",
    description: "A complete giveaway system.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "start",
            description: "Start a giveaway",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "duration",
                    description: "How long would you like this giveaway to last (1m, 1h, 1d)?",
                    type: "STRING",
                    required: true
                },
                {
                    name: "winners",
                    description: "How many winners would you like this giveaway to have?",
                    type: "INTEGER",
                    required:true
                },
                {
                    name: "prize",
                    description: "What will the prize be for this giveaway?",
                    type: "STRING",
                    required:true
                },
                {
                    name: "channel",
                    description: "What channel do you want the giveaway to run in?",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"]
                }
            ]
        },
        {
            name: "actions",
            description: "Options for giveways",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "options",
                    description: "Select an option",
                    type: "STRING",
                    required: true,
                    choices: [
                        {
                            name: "end",
                            value: "end"
                        },
                        {
                            name: "pause",
                            value: "pause"
                        },
                        {
                            name: "unpause",
                            value: "unpause"
                        },
                        {
                            name: "reroll",
                            value: "reroll"
                        },
                        {
                            name: "delete",
                            value: "delete"
                        },
                    ]
                },
                {
                    name: "message_id",
                    description: "Proivde the message id of the giveaway.",
                    type: "STRING",
                    required: true
                }
            ]
        }
    ],
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options } = interaction

        const Sub = options.getSubcommand();
        
        const errorEmbed = new MessageEmbed()
        .setColor("RED");

        const successEmbed = new MessageEmbed()
        .setColor(config.colors.embedHex)

        switch(Sub) {
            case "start" : {
                const gchannel = options.getChannel("channel") || interaction.channel;
                const duration = options.getString("duration");
                const winnerCount = options.getInteger("winners");
                const prize = options.getString("prize");

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages: {
                        giveaway: "🎉 **GIVEAWAY STARTED** 🎉",
                        giveawayEnded: "🎊 **GIVEAWAY ENDED** 🎊",
                        winMessage: "🙌 Congratulations, {winners}! You won **{this.prize}**!"
                    }
                }).then(async (gData) => {
                    successEmbed.setDescription("⏯ Giveaway was succesfully started")
                    interaction.reply({ embeds: [successEmbed], ephemeral: true })
                }).catch((err) => {
                    errorEmbed.setDescription(`⛔ Alert: An error has occured \n \`${err}\``)
                    interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                })
            }
            break;
            case "actions" : {
                const choice = options.getString("options");
                const messageId = options.get("message_id")

                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

                if (!giveaway) {
                    errorEmbed.setDescription(`⛔ Unable to find giveaway with the message id of \`${messageId}\``);
                    interaction.reply({ embeds: [errorEmbed ], ephemeral: true })
                }

                switch(choice) {
                    case "end" : {
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription("🔚 The giveaway has been ended")
                            interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`⛔ Alert: An error has occured \n \`${err}\``)
                            interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                    break;
                    case "pause" : {
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription(`⏸ The giveaway with the message ID of \`${messageId}\` has been paused. The time on this giveaway will no longer tick down!`)
                            interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`⛔ Alert: An error has occured \n \`${err}\``)
                            interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                        }
                    break;
                    case "unpause": {
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription(`▶ The giveaway with the message ID of \`${messageId}\` has been unpaused. The time will begin ticking down!`)
                        }).catch((err) => {
                            errorEmbed.setDescription(`⛔ Alert: An error has occured \n \`${err}\``)
                            interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                        }
                    break;
                    case "reroll": {
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription(`🔁 The giveaway with the message ID of \`${messageId}\` has been rerolled.`)
                            interaction.reply({ embeds: [successEmbed], ephemeral: true })
                        }).catch((err) => {
                            errorEmbed.setDescription(`⛔ Alert: An error has occured \n \`${err}\``)
                            interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                        }
                    break;
                    case "delete": {
                        const messageId = interaction.options.getString('message_id');
                        client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription(`🤜 The giveaway with the message ID of \`${messageId}\` has been deleted.`)
                        }).catch((err) => {
                            errorEmbed.setDescription(`⛔ Alert: An error has occured \n \`${err}\``)
                            interaction.reply({ embeds: [errorEmbed], ephemeral: true })
                        });
                    }
                    break;
                }
            }
            break;

            default : {
                console.log("Error in giveaway command")
            }
        }
    }
}