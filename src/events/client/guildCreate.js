const { Guild, Client, MessageEmbed, TextChannel, NewsChannel} = require('discord.js');
const  config  = require('../../../config.json');

const rawDate = new Date()
const date = rawDate.toLocaleString()

module.exports = {
    name: "guildCreate",
    once: false,
    /**
    * @param { Guild } guild
    * @param { Client } client
    */
    async execute(guild, client) {
        console.log(`Joined ${guild.name} | ${guild.id}`)
        await guild.commands.set(client.commands);

        let embed = new MessageEmbed().setAuthor({
            iconURL: guild.iconURL(),
            name: guild.name,
        })
        .setColor(config.colors.embedHex)
        .setTitle('Thank you for using Meep!')
        .setDescription(`Meep is a bot that can be used for a variety of all things discord. We strive to improve your experience on this platform!`)
        .addFields(
            {name: 'Important Commands', value: `**/setup** - Setup the bot (Make roles, channels etc) \n **/help** - Recieve a help menu to inform you on new commands \n **/announcements** - View recent announcements on the bot \n **/status** - Find out on the bots status`, inline: true},
            {name: 'Links', value: '[Documentation](https://google.com) \n [Join support server](https://google.com) \n [Invite the bot to a server](https://google.com) \n [Online dashboard](https://google.com)', inline: true},
        )
        .setFooter({ text: `Meep Bot © | ${date}`})

        //Send the embed to the guild channel 

        let channel = guild.systemChannel
        console.log(channel)
        if (!channel) {
            channel = channel instanceof TextChannel || channel instanceof NewsChannel
            console.log(channel)
        }
        try {
            channel.send({embeds: [embed], content: null});
            console.log(`Thank you message sent to ${guild.name} | ${guild.id}`)
        } catch(err) {
            console.log(`Error sending thank you message to ${guild.name} | ${guild.id}`)
        }

        //Send the embed to the owner

        try {
            guild.fetchOwner().then(owner => {
                owner.send({embeds: [embed], content: null});
                console.log(`Thank you message sent to ${owner.displayName} | ${owner.id}`)
            });
        } catch(err) {
            guild.fetchOwner().then(owner => {
                console.log(`Error sending thank you message to ${owner.displayName} | ${owner.id}`)
            });
        }
    }
}