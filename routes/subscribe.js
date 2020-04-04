const router = require('express').Router()
const Subscribers = require('../models/Subscribers')
const Video = require('../models/Video')

router.post('/subscribers', (req, res) => {

    Subscribers.find({"userTo": req.body.userTo})
        .then(response => {
            res.json({success: true, subscribers: response.length})
        })
        .catch(err => res.status(500).json({error: 'Server error'}))
})

router.post('/subscribed', (req, res) => {
    const {userTo, userFrom} = req.body
    Subscribers.find({userTo, userFrom})
        .then(subscribed => {
            let result
            if(subscribed.length !== 0){
                result = true
            } else result = false
            res.json({success: true,subscribed:result})
        })
        .catch(err => res.status(500).json({error: 'Server error'}))
})

router.post('/subscribe',(req,res)=>{
    const
    subscription = new Subscribers(req.body)
    subscription
        .save()
        .then(subscr =>{
            res.json({success:true})
        })
        .catch(err => res.status(500).json({msg:'Server error'}))
})

router.post('/unsubscribe',(req,res)=>{
    const {userTo,userFrom} = req.body
    Subscribers.findOneAndDelete({userTo,userFrom})
        .then(result => res.json({success:true}))
        .catch(err => res.status(500).json({msg:'Server error'}))
})

router.post('/getSubscribedVideo',(req,res)=>{
    const {userFrom} = req.body



    // Find Subscribed Users
    Subscribers.find({userFrom})
        .exec((err,subscribes)=>{
            if(err) res.status(500).json({msg:'Server error'})

            const subscribedUsers = []

            subscribes.map(elem =>{
                subscribedUsers.push(elem.userTo)
            })

            // Find subscribed users video
            Video.find({writer:{$in:subscribedUsers}})
                .then(video => {
                    res.json({success:true,video})
                })
                .catch(err => res.status(500).json({msg:'Server error'}))
        })


})

module.exports = router