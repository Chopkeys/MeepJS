module.exports = async (client, PG, Ascii, rcon) => {
    const Table = new Ascii("Buttons Handler");
    const buttonsFolder = await PG(`${(process.cwd().replace(/\\/g, "/"))}/buttons/**/*.js`);

    buttonsFolder.map(async (file) => {
        const buttonFile = require(file);
        if(!buttonFile.id) return;

        client.buttons.set(buttonFile.id, buttonFile)
        Table.addRow(buttonFile.id, "✔ SUCCESSFUL")
    })
    console.log(Table.toString())
}