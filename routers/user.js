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
//passport.authenticate calls a function in file-->config/passport-local-strategy.js 
//The function mentioned in new LocalStrategy() --> function(email,password,done){}

router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'})
    ,userController.createSession);

router.get("/profile/:id",passport.checkAuthentication,userController.profile);

router.post("/update/:id",userController.update);

router.get("/sign-out",userController.destroySession);

router.get("/auth/google",passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),userController.createSession);
