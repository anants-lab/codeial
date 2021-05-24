const express=require("express");
const router=express.Router();
const usersController=require("../controllers/users-controller");

//Router needs to be mapped to URL segment 
module.exports=router;

//Handles URL -> /users/profile
router.get("/profile",usersController.profile);