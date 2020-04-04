const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectID,
        ref: 'Users'
    },
    title: {
        type:String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type:Number
    },
    filePath : {
        type:String
    },
    category: String,
    view : {
        type: Number,
        default:0
    },
    duration :{
        type: String
    },
    thumbnail :{
        type: String
    },
    thumbnailsArr:{
        type:Array
    }
},{timestamp:true})






module.exports = mongoose.model('Video',VideoSchema)