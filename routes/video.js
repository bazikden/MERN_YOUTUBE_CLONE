const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const ffmpeg = require('fluent-ffmpeg')
const Video = require('../models/Video')
const auth = require('../middleware/auth')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    },

})

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
        return cb(null, false)
    } else cb(null, true)
}

const upload = multer({storage: storage, fileFilter}).single('file')

// Get all Videos
router.get('/getVideos',(req,res)=>{
    Video.find()
        .populate('writer')
        .exec()
        .then(videos=>{
            videos ? res.json({success:true,videos})
                :
            res.json({success:false})
        })
})

// Get VideoInfo
router.post('/getVideo',(req,res)=>{
    Video.findOne({"_id":req.body.videoId})
        .populate('writer')
        .then(video =>{
            if (!video) return res.json({success:false,msg:'Could not find such video'})
            res.json({success:true,video})
        })
        .catch(err => res.status(500).json({msg:'Server error'}))
})

// Set Video views
router.post('/setViews',(req,res)=>{
    Video.findByIdAndUpdate(req.body.videoId,{view:req.body.view + 1},(err,doc)=>{
        if(err) return res.status(500).json({msg:'Server error'})
        doc.view = doc.view + 1
        doc.save()
            .then(result =>{
                res.json({success:true,result})
            })

    })
})


// Upload Video
router.post('/uploadFiles',auth, upload, (req, res) => {
    if (req.file) return res.json({
        success: true,
        file: {
            fileName: req.file.originalname,
            filePath: req.file.path
        }
    })

    res.json({success: false, msg: `This is not video file`})
})

router.post('/thumbnails', (req, res) =>{
    let thumbFilePath = ""
    let fileDuration = ""
    let thumbnailArr =[]


    ffmpeg.ffprobe(req.body.filePath,function (err,metadata) {
        /*console.dir(metadata)*/
        console.log(metadata.format.duration)


        fileDuration = metadata.format.duration
    })

    ffmpeg(req.body.filePath)
        .on('filenames', function(filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbFilePath = 'public/uploads/thumbnails/' + filenames[0]
            thumbnailArr = filenames
        })
        .on('end', function() {
            console.log('Screenshots taken');
            return res.json({success:true,thumbFilePath:thumbFilePath,fileDuration:fileDuration,thumbnailsArr:thumbnailArr})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 4,
            folder: 'public/uploads/thumbnails',
            size:'320x240',
            // %b input basename(filename w/o extension)
            filename:'thumbnail-%b.png'
        });
})


router.post('/uploadVideo',async (req,res) =>{
    const video = await new Video(req.body)
    video.save((err,video)=>{
        if(err) return res.json({success:false,msg:'Error saving to database'})
        res.json({success:true})
    })

})

module.exports = router