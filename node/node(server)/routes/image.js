var express = require('express');
var Image = require('../models/image');
var User = require('../models/User');
var ImageRouter = express.Router();
const multer = require('multer');
//업로드 경로 /uploads 임의로 만듬
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/* 
    stores image in uploads folder
    using multer and creates a reference to the 
    file
*/


ImageRouter.get('/uploadselect', (req, res) => {
    Image.find()
        .then((data) => {      
            return res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});


ImageRouter.route("/uploadmulter")
    .post(upload.single('imageData'), (req, res, next) => {
        console.log("가져온값",req.body);
        const a=req.body.imageName;
        const b=req.file.path;      
        console.log('세션',req.session.loginid,a,b);      
        User.updateOne(
            {loginid: req.session.loginid },
            {
              $set: {
                imageName: a,
                imageData: b               
              }
            },
            { 
              upsert: true,  
              multi : true , 
              new : true, 
              setDefaultsOnInsert: true 
            }
            )    
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });

/*
    upload image in base64 Userat, thereby,
    directly storing it in mongodb datanase
    along with images uploaded using firebase
    storage
*/    
ImageRouter.route("/uploadbase")
    .post((req, res, next) => {
        const newImage = new User({
            imageName: req.body.imageName,
            imageData: req.body.imageData
        });

        newImage.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });

module.exports = ImageRouter;