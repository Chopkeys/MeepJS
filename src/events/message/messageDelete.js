const { MessageEmbed, Message, WebhookClient } = require("discord.js")
const config = require('../../../config.json')

module.exports = {
    name: "messageDelete",
    
    /**
     * 
     * @param {Message} message 
     */

    execute(message) {
        if(message.author.bot) return;

        const Log = new MessageEmbed()
        .setColor(config.colors.embedHex)
        .setDescription(`📕 A [message](${message.url}) by ${message.author.tag} was **deleted**. \n
        **Deleted Message:**\n \`${message.content ? message.content : "None"}\``.slice(0, 4096))

        if(message.attachments.size >= 1){
            Log.addField(`Attachments:`, `${message.attachments.map(a => a.url)}`, true)
        }

        new WebhookClient({url: "https://discord.com/api/webhooks/972490108525768725/KHGKzttj2QNrQnUuN-ynorPSZ2GX2ZEi0WdAQFjBvFjYQ4cC41Mw-8eVhYEf6-7bd7Rg"})
        .send({ embeds: [Log]}).catch((err) => console.log(err))
    }
}