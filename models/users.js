const mongoose=require("mongoose");
const multer=require("multer");
const path=require("path");

const AVATAR_PATH=path.join("/uploads/users/avatars");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,

    }
},{
    timestamps:true
});

//It is passed into multer()
//Helps to control the file name and where the file will be saved.
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });

  
  // multer({storage:storage}).single('avatar') returns a middleware --> function(req,res,next){}
  //This multer middleware creates req.body and req.file/req.files.
  //req.file contains file type data
  //req.body contains any other text fields of the form
  userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
  userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model("User",userSchema);

module.exports=User;