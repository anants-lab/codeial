const express=require("express");
const router=express.Router();
const userController=require("../controllers/user-controller.js");

module.exports=router;

router.get("/sign-up",userController.signUpPage);

router.get("/sign-in",userController.signInPage);


router.post("/create",userController.create);