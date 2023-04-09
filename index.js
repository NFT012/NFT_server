const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cloudinary = require('cloudinary');
// const responsetime = require("response-time")
const mongoose = require("mongoose");
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
// app.use(responsetime)
app.use(cors());
app.use('uploads', express.static('uploads'));
const port =     5000;
dotenv.config();
// var fileupload = require("express-fileupload");
// app.use(fileupload());
 
const cookieParser = require("cookie-parser");
 app.use(express.urlencoded({limit:'50mb', extended: true }));







const multer = require('multer')


async function uploadToCloudinary(locaFilePath) {
  
  var mainFolderName = "main"
  var filePathOnCloudinary = mainFolderName + "/" + locaFilePath
  console.log(locaFilePath);

  return cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
  .then((result) => {
    // fs.unlinkSync(locaFilePath)
    
    return {
      message: "Success",
      url:result.url
    };
  }).catch((error) => {
    // fs.unlinkSync(locaFilePath)
    return {message: "Fail",};
  });
}

const storage = multer.diskStorage({
  destination: function(req,file,cb){
      cb(null,'./uploads/');
  },
  filename: function(req,file,cb){
      cb(null, file.originalname);
  }
});
const upload = multer({ storage:storage })
app.post('/upload-image', upload.single('image'), async(req, res) => {
    // console.log(req.file)
    // res.json({
    //   msg:'Image uploaded successfully',
    //   path:req.file.path,
    // path1:req.file.filename,
    // path2:req.file.originalname})
    const cloud = await uploadToCloudinary(req.file.path);
      console.log(cloud.url);
      res.json({url : cloud.url});   
})

app.use("/api/auth/user", require("./routes/user_auth"));
app.use("/api/mint", require("./routes/mint"));
 app.post("/file",(req, res)=>{
  

   console.log(req.body);
console.log(req.files); 
  res.json({msg:"hello"});
  })



mongoose.set("strictQuery", true);
const uri = "mongodb+srv://Yk:123@cluster0.zelqca0.mongodb.net/?retryWrites=true&w=majority"
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
});
