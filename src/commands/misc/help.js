const {
    MessageEmbed,
    CommandInteraction,
    Client
} = require("discord.js");
const config = require('../../../config.json')

module.exports = {
    name: "help",
    category: "miscellaneous",
    description: "shows all available commands",
    usage: "/help [command]",
    options: [
        {
            name: "command",
            description: "Category to get more info on",
            type: "STRING",
        },
        {
            name: "category",
            description: "Category to get more info on",
            type: "STRING",
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        let error = false;
        let cmdFound = "";
        const {
            options
        } = interaction;

        const embed = new MessageEmbed()
            .setColor(config.colors.embedHex)

        const cmdName = options.getString("command");
        const catName = optionss.getString("category")
        if (cmdName) {
            await client.commands.map(cmd => {
                if (cmd.name == cmdName) {
                    let cmdoptions = cmd.options;
                    cmdFound = cmd.name;
                    embed.setTitle(`Help for ${cmd.name}`)
                    embed.setDescription(`Description: ${cmd.description || "none"}\n Usage: ${cmd.usage || "none"}\n subCommands \`Coming soon\``)
                    if(cmdoptions) {
                        cmdoptions.map(option => {
                            embed.addField(option.name, `desc: ${option.description || "none"}`)
                        })
                    }
                    error = false;
                    
                } else if(!cmdFound){
                    embed.setTitle("No Command Found")
                    embed.setDescription(`⛔ Error: No command was found with the name of \`${cmdName}\`!\n Use \`/help\` to see all the available commands`)

                    error = true;
                }

            })
        if (catName) {
            await catName
        }
        } else {
            embed.setTitle("Available Commands")
                embed.setDescription(client.commands.map(cmd => `\`${cmd.name}\``).join(', '))
                embed.setFooter({
                    text: `${client.commands.size} commands`
                })
                error = false;
        }
        await interaction.reply({
            embeds: [embed],
            ephemeral: error
        });
        cmdFound = "";
    }
}