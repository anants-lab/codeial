const express=require("express");
const router=express.Router();
const commentController=require("../controllers/comment-controller.js");

router.post("/create",commentController.create);

module.exports=router;