module.exports = {
    id: "Yes",
    permission: "ADMINISTRATOR",
    execute(interaction) {
        interaction.reply({ content: "Restarting the bot now" }).then(() => {
            process.exit()
        })
    }
}