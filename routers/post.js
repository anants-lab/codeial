const express=require("express");
const router=express.Router();
const postController=require("../controllers/post-controller.js");
const passport=require("passport");

//Applying security check so only signed in user can access this link
router.post("/create",passport.checkAuthentication,postController.create);



module.exports=router;