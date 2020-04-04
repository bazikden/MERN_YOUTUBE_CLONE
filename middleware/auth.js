const Users = require('../models/Users')

module.exports = (req,res,next)=>{
    token = req.cookies['x-auth']

    token && Users.findByToken(token,(err,user)=>{
        if(err) return res.status(500).json({error:'Server Error'})

        if(!user) return res.json({isAuth:false,error:true})

        req.token = token
        req.user = user
        next()
    })
    
}