const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LikeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'Users'
    },
    commentId: {
        type: Schema.Types.ObjectID,
        ref: 'Comments'
    },

    videoId: {
        type: Schema.Types.ObjectID,
        ref: 'Video'
    }

})

module.exports = mongoose.model('Like', LikeSchema)