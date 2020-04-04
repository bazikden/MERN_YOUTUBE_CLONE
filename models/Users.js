const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_KEY} =require('../config/keys')

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

UserSchema.pre('save',function(next){
    const user = this

    bcrypt.hash(user.password,10,(err,hash)=>{
        if(err) throw err
        user.password = hash
        next()
    })
})

UserSchema.methods.comparePasswords = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err) return cb(err)
        cb(err,isMatch)
    })
}

UserSchema.methods.generateToken = function(cb){
    jwt.sign(
        {id:this._id},
        JWT_KEY,
        (err,token)=>{
            if(err) return cb(err)
            cb(null,token) 
        }
    )
}

UserSchema.statics.findByToken = async function(token,cb){
    const user = this
    jwt.verify(token,JWT_KEY,(err,decoded)=>{
        user.findOne({"_id":decoded.id,"token":token},(err,finded)=>{
            if(err) return cb(err)
            cb(null,finded)
        })
    })


    
}


module.exports = mongoose.model('Users',UserSchema)