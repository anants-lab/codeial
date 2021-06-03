const express=require("express");
const router=express.Router();
const passport=require("passport");
const userController=require("../controllers/user-controller.js");

module.exports=router;

router.get("/sign-up",userController.signUpPage);

router.get("/sign-in",userController.signInPage);


router.post("/create",userController.create);

//takes 3 argument
//2nd argument is passport middleware to authenticate user
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'})
    ,userController.createSession);

router.get("/profile",passport.checkAuthentication,userController.profile);

router.get("/sign-out",userController.destroySession);