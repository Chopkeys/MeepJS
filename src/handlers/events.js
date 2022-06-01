const { Events } = require('../validation/EventNames');

module.exports = async (client, PG, Ascii, rcon) => {
    const Table = new Ascii("Events Loaded");

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/events/**/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name || !event.name)) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `❌ Event name is either invalid or missing: ${L[L.length - 1]}`);
            return;
        } 

        if(event.once) {
            client.once(event.name, (...args) => event.execute(...args, client, rcon))
        } else {
            client.on(event.name, (...args) => event.execute(...args, client, rcon))
        };

        await Table.addRow(event.name, "✔ SUCCESSFUL")
    });

    console.log(Table.toString())
}