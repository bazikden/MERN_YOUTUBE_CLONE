const router = require('express').Router()
const Users = require('../models/Users')
const auth = require('../middleware/auth')

router.get('/',(req,res)=>{
    Users.find()
        .then(data=>res.json({users:data}))
        .catch(err => console.log(`Error`))
})

router.post('/register',(req,res)=>{
    const {name,email,password,lastname} = req.body

    if(!name || !email || !password || !lastname) return res.status(400).json({success:false,msg:'Please enter all fields'})

    Users.find({email},(err,user)=>{
        if(err) return res.status(500).json({error:'Server error'})
        if(!user){
            return  res.status(200).json({success:false,msg:'Such user is exists'})
        } else {
            const newUser = new Users(req.body)

            newUser.save((err,doc)=>{
                if (err) {
                    if (err.code === 11000) {
                        return res.status(200).json({success: false, msg: 'Such user is exists'})
                    }else{
                        return res.status(500).json({ success: false, err })
                    }
                } else{
                    return res.status(200).json({
                        success: true,
                        user:{
                            name:newUser.name,
                            email:newUser.email,
                            lastname:newUser.lastname
                        }
                    });
                }

            })
        }

    })
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body

    if(!email || !password) res.status(400).json({msg:'Please enter all fields'})

    Users.findOne({"email":email},(err,user)=>{
        if(user){
            user.comparePasswords(password,(err,isMatch)=>{
                if(err) return res.status(500).json({error:'Server error'})

                if(!isMatch) return res.status(200).json({success:false,msg:"Email or Password incorrect"})

                user.generateToken((err,token)=>{
                    if(err) return res.status(500).json({error:'Server error'})
                    user.updateOne({token},(err,raw)=>{
                        if(err) return res.status(500).json({error:'Server error'})
                        res.cookie('x-auth',token).status(200).json({
                            success:true,
                            user:{
                                name:user.name,
                                email:user.email,
                                lastname:user.lastname,
                                token
                            }
                        })
                    })
                })

            })
        } else res.json({success:false,msg:'Such user doesn`t exists'})

    })

})

router.get('/auth',auth,(req,res)=>{
    res.json({
        id:req.user._id,
        name:req.user.name,
        email:req.user.email,
        lastname:req.user.lastname,
        role:req.user.role,
        isAuth:true
    })
})

router.get('/logout',auth,(req,res)=>{
    Users.findOneAndUpdate({_id:req.user._id},{token:''},(err,doc)=>{
        if(err) return res.status(400).json({success:false,err})
        res.cookie('x-auth','').status(200).json({
            success:true
        })
    })
})
module.exports = router