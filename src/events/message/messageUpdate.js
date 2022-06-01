const { MessageEmbed, Message, WebhookClient} = require("discord.js");
const config = require('../../../config.json')

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return;
        
        if(oldMessage.content === newMessage.content) return;

        const Count = 1950;

        const Original = oldMessage.content.slice(0, Count) + (oldMessage.content.length > 1950 ? "..." : "");
        const Edited = newMessage.content.slice(0, Count) + (newMessage.content.length > 1950 ? "..." : "");

        const Log = new MessageEmbed()
        .setColor(config.colors.embedHex)
        .setDescription(`📘 A [message](${newMessage.url}) by ${newMessage.author} was **edited** in ${newMessage.channel}. \n
        **Original**: \n \`${Original}\` \n**Edited**: \n \`${Edited}\``)
        .setFooter({text: `Member: ${newMessage.author.tag} | ID: ${newMessage.author.id}`})

        new WebhookClient({url: "https://discord.com/api/webhooks/972490108525768725/KHGKzttj2QNrQnUuN-ynorPSZ2GX2ZEi0WdAQFjBvFjYQ4cC41Mw-8eVhYEf6-7bd7Rg"})
        .send({ embeds: [Log]}).catch((err) => console.log(err))
    }
}