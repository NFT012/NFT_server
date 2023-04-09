// /image/nft
const express = require('express'); 
const router = express.Router();
const {getTxn} = require('../controllers/mint');
const {transaction} = require('../controllers/mint');
const {mintcontroller} = require('../controllers/mint');
const {getTransactionids} = require('../controllers/mint');
const {cloudupload} = require('../controllers/mint');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { response } = require('express');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}

const upload = multer({
    storage:storage,
    limits:{
    fileSize : 1024*1024*5
    },
    fileFilter:fileFilter
});

router.post('/file',upload.single('image'), cloudupload);
router.post('/file/nft', mintcontroller); 
router.get('/transactions', getTransactionids);
router.get('/transaction', transaction);
router.post('/getTxn',getTxn)


 
 module.exports = router;
