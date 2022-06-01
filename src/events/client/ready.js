const { Client } = require("discord.js")
const mongoose = require("mongoose")
const config = require('../../../config.json')

module.exports = {
    name: "ready",
    once: true,
    /**
    * @param { Client } client
    */

    execute(client) {
        console.log(`The client is ready`)
        client.user.setActivity("Hello", {type: "COMPETING"})

        if(!config.mongoUri) return;
        mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database")
        }).catch((err) => {
            console.log(err)
        })
    }
}