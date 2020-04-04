const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubscriberSchema = new mongoose.Schema({
    userTo:{
        type:Schema.Types.ObjectID,
        ref:'Users'
    },
    userFrom:{
        type:Schema.Types.ObjectID,
        ref: 'Users'
    }
})

module.exports = mongoose.model('Subscribers',SubscriberSchema)