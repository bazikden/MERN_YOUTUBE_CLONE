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
            likes.length > 0 ? res.json({success: true, likes})
            : res.json({success:false})
        })
        .catch(err => res.status(500).json({error: 'Server error'}))
})

router.post('/getDisLikes', (req, res) => {
    let data = {}
    const {videoId,commentId,userId} = req.body
    if(videoId){
        data = {videoId}
    }else {
        data = {commentId}
    }


    DisLikes.find(data)
        .then(dislikes => {
            dislikes.length >0 ? res.json({success: true, dislikes})
            : res.json({success:false})
        })
        .catch(err => res.status(500).json({error: 'Server error'}))
})

router.post('/addLikes', (req, res) => {
    let data = {}
    const {videoId,commentId,userId} = req.body
    if(videoId){
        data = {videoId,userId}
    }else {
        data = {commentId,userId}
    }

    Likes.findOneAndDelete(data)
        .then(like => {

    DisLikes.findOneAndDelete(data)
        .catch(err => res.json({err}))
            if(!like){
                const newLike = new Likes(data)
                newLike.save()
                    .then(likes => res.json({success: true,likes}))
                    .catch(err => res.status(500).json({error: 'Server error'}))
            }else{
                res.json({success:true})
            }
        })
        .catch(err => res.json({err}))


})

router.post('/addDislikes', (req, res) => {
    let data = {}
    const {videoId,commentId,userId} = req.body
    console.log(req.body)
    if(videoId){
        data = {videoId,userId}
    }else {
        data = {commentId,userId}
    }

    DisLikes.findOneAndDelete(data)
        .then(dislike => {
            
            Likes.findOneAndDelete(data)
                .then(like =>{
                    if(!dislike){
                        const newDisLike = new DisLikes(data)
                        newDisLike.save()
                            .then(dislikes => res.json({success: true,dislikes}))
                            .catch(err => res.status(500).json({error: 'Server error'}))
                    }else{
                        res.json({success:true})
                    }
                })
                .catch(err => res.json({err}))

        })
        .catch(err => res.json({err}))
})

module.exports = router