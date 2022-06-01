const { Client, MessageEmbed, CommandInteraction } = require('discord.js')
const djs = require("discord.js")
const config = require('../../../config.json')
const mongoose = require("mongoose")
require("../../events/client/ready")
const os = require("os")

module.exports = {
    name: "status",
    category: "miscellaneous",
    usage: "/status",
    description: "Displays the status of the client and server info.",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const commands = client.commands
        const { guild } = interaction;

        const Response = new MessageEmbed()
        .setColor(config.colors.embedHex)
        .addField("__**Bot Info**__", `Client: \`🟢 ONLINE\` - \`${client.ws.ping}ms\` \n Database: \`${switchTo(mongoose.connection.readyState)}\` \n Uptime: <t:${parseInt(client.readyTimestamp / 1000)}:R> \n Bot Created <t:${parseInt(client.user.createdAt / 1000)}:R>`)
        .addField("__**Machine Info**__", `Host Type: \`VPS\` \n OS: \`${os.type().replace("Windows_NT", "Windows").replace("Darwin", "macOS")}\` \n Memory Usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%\` \n CPU Model: \`${os.cpus()[0].model}\` \n CPU Speed: \`${os.cpus()[0].speed}mhz\``)
        .addField("__**Main Librarys Used**__ ", `Node.js: \`${process.version}\` \n Discord.js: \`${djs.version}\` \n Mongoose: \`${mongoose.version}\``)
        interaction.reply({embeds: [Response]})
    }
}

function switchTo(val) {
    var status = " ";
    switch(val) {
        case 0 : status = `🔴 DISCONNECTED`
        break;
        case 1 : status = `🟢 CONNECTED`
        break;
        case 2 : status = `🟠 CONNECTING`
        break;
        case 3 : status = `🟣 DISCONNECTING`
        break;
    }
    return status
}