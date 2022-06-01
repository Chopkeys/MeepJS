const mongoose = require("mongoose")

const logsSchema = new mongoose.Schema({
    guildId: Number,
    logTypes: {
        messeageDelete: {
            isActivated: Boolean,
            settings: {
                logChanId: Number,
                embed: Boolean,
                logPictures: Boolean,
            },
        },
        messeageEdit: {
            isActivated: Boolean,
            settings: {
                logChanId: Number,
                embed: Boolean,
                logPictures: Boolean,
            },
        }
    }
})

const logsModel = mongoose.model('loggingSettings', logsSchema);

module.exports = logsModel