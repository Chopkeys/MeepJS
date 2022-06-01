module.exports = {
    id: "No",
    permission: "ADMINISTRATOR",
    execute(interaction) {
        interaction.reply({ content: "Ok, you can no longer select yes" })
    }
}