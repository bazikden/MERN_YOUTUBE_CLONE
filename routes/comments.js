const Comments = require('../models/Comments')

const router = require('express').Router()

router.post('/getComments',(req,res)=>{
    Comments.find({"postId": req.body.postId})
        .populate('writer')
        .then(comments =>{
            res.json({success:true,comments})
        })
        .catch(err => res.status(500).json({error:"Server error"}))
})

router.post('/saveComment',(req,res)=>{
    const newComment = new Comments(req.body)
    newComment.save()
        .then(result =>{
            Comments.findOne({_id:result.id})
                .populate('writer')
                .then(data => res.json({success: true, data}))
                .catch(err => res.json({success:false,err}))
        })
        .catch(err => res.status(500).json({error:"Server error"}))
})

router.post('/saveSubComment',(req,res)=>{
    const newComment = new Comments(req.body)
    newComment.save()
        .then(result =>{
            Comments.findOne({"_id":result.id})
                .populate('writer')
                .then(data => res.json({success: true, comment:data}))
                .catch(err => res.json({success:false,err}))
        })
        .catch(err => res.status(500).json({error:"Server error"}))
})

module.exports = router