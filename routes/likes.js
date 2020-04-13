const router = require('express').Router()
const Likes = require('../models/Like')
const DisLikes = require('../models/DisLike')


router.post('/getLikes', (req, res) => {
    let data = {}
    const {videoId,commentId,userId} = req.body
    if(videoId){
        data = {videoId}
    }else {
        data = {commentId}
    }

    Likes.find(data)
        .then(likes => {
            likes.length >0 && res.json({success: true, likes})
        })
        .catch(err => res.status(500).json({error: 'Server error'}))
})

router.post('/getDislikes', (req, res) => {
    const {videoId,commentId,userId} = req.body
    commentId === 'undefined' && (commentId = null)
    DisLikes.find({videoId,userId,commentId})
        .then(disLikes => res.json({success: true, disLikes}))
        .catch(err => res.status(500).json({error: 'Server error'}))
})

router.post('/addLikes', (req, res) => {
    const {videoId,commentId,userId} = req.body
    commentId === 'undefined' && (commentId = null)
    const like = new Likes({videoId,userId,commentId})
    like.save()
        .then(likes => res.json({success: true,likes}))
        .catch(err => res.status(500).json({error: 'Server error'}))
})

router.post('/addDislikes', (req, res) => {
    const {videoId,commentId,userId} = req.body
    commentId === 'undefined' && (commentId = null)
    DisLikes.find({videoId,userId,commentId})
        .then(disLikes => res.json({success: true, disLikes}))
        .catch(err => res.status(500).json({error: 'Server error'}))
})

module.exports = router