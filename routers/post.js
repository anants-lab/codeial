const express=require("express");
const router=express.Router();
const postController=require("../controllers/post-controller.js");
const passport=require("passport");

router.post("/create",passport.checkAuthentication,postController.create);



module.exports=router;