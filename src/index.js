const config = require('../config.json');

const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const { glob } = require("glob")
const PG = promisify(glob)
const Ascii = require("ascii-table")
const Rcon = require('modern-rcon');

const rcon = new Rcon(config.mcServerIp, config.mcServerRconPort, config.mcServerRconPW, timeout = 5000)

const client = new Client({
    intents: 32767
});

client.commands = new Collection()
client.buttons = new Collection()

require('../systems/GiveawaySys')(client);

["events", "commands", "buttons"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii, rcon)
});

client.login(config.token)