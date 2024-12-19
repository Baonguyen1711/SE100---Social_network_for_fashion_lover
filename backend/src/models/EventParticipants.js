const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')
mongoose.set('debug', true)

const FashionSocial = mongoose.connection.useDb('FashionSocial');

const EventParticipantsSchema = new mongoose.Schema({
    eventId: {
        type: String,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    },
    dateTime: {
        type: Date,
        require: true
    },
    registeredAt: {
        type: String,
        require: true,
    }
})



const EventParticipants = FashionSocial.model('EventParticipants', EventParticipantsSchema)

module.exports = EventParticipants








