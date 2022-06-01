const { ContextMenuInteraction, MessageEmbed, IntegrationApplication, Guild } = require("discord.js");
const config = require('../../../config.json')

module.exports = {
    name: "userinfo",
    category: "utilitys",
    usage: "Context menu",
    type: "USER",
    
    /**
     * 
     * @param {ContextMenuInteraction} interaction 
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId)

        const Response = new MessageEmbed()
        .setColor(config.colors.embedHex)
        .setAuthor({
            name: target.user.tag,
            iconURL: target.user.avatarURL({ dynamic: true, size: 512 }),
        })
        .setThumbnail(target.user.avatarURL({ dynamic: true, size: 512 }))
        .addField("ID", `${target.user.id}`)
        .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "" ) || "None"} `)
        .addField("Member Since", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
        .addField("Discord User Since", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        interaction.reply({ embeds: [Response], ephemeral: true})
    }
}