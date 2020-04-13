const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    writer:{
        type:Schema.Types.ObjectID,
        ref:'Users'
    },
    postId:{
        type: Schema.Types.ObjectID,
        ref:'Video'
    },
    responseTo:{
        type: Schema.Types.ObjectID,
        ref:'Users'
    },
    content:{
        type:String,
    }
})

module.exports = mongoose.model('Comments',CommentSchema)