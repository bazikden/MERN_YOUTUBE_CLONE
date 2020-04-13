const express = require('express')
const {PORT} =require('./config/keys')
const mongoose = require('mongoose')
const {MONGO_URI} = require('./config/keys')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')


const app = express()

// DB connection
mongoose.connect(MONGO_URI,{useCreateIndex:true,useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
    .then(()=> console.log('DB connected....'))
    .catch(()=> console.log('DB connection error'))

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// Static folder
app.use('/public',express.static(path.join(__dirname,'public')))
    
// Routes
app.use('/api/users',require('./routes/users'))
app.use('/api/video',require('./routes/video'))
app.use('/api/subscribe',require('./routes/subscribe'))
app.use('/api/comments',require('./routes/comments'))
app.use('/api/likes',require('./routes/likes'))


app.listen(PORT,()=>console.log(`Server is started on port ${PORT}`))

