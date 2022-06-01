const { Perms } = require("../validation/Permissions");
const { Client } = require("discord.js");

/**
 *  @param {Client} client
 */

module.exports = async (client, PG, Ascii, rcon) => {
    const Table = new Ascii("Command Loaded");

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/commands/**/*.js`)).map(async (file) => {
        const command = require(file);

        if(!command.name)
        return Table.addRow(file.split("/")[7], "⛔ FAILED", "Missing a name.")

        if (command.type !== 'USER' && !command.description) 
        return Table.addRow(command.name, "⛔ FAILED", "Missing a description."); 

        if(!command.usage)
        return Table.addRow(command.name,  "⛔ FAILED", "Missing a Usage.")

        if(command.permission) {
            if(Perms.includes(command.permission)) command.defaultPermission = false;
            else 
            return Table.addRow(command.name, "⛔ FAILED", "Permission is invalid.");
        }
        if(!command.category)
        return Table.addRow(command.name, "⛔ FAILED", "Missing a category."); 

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✔ SUCCESSFUL");

    });

    console.log(Table.toString());

    // PERMISSION CHECK

    client.on("ready", async () => {
        client.guilds.cache.forEach((g) => {
        g.commands.set(CommandsArray);
        })
    });
}