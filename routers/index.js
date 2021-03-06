const express=require("express");
const router=express.Router();

const homeController=require("../controllers/home-controller.js")

module.exports=router;


router.get("/",homeController.home);

//Mapping (users) router with url starting with -> /users
//For example /users/first , /users/second and so on will all be directed to /users.js
router.use("/user",require("./user.js"));

router.use("/post",require("./post.js"));

router.use("/comment",require("./comment.js"));

router.use("/api",require("./api/index.js"));

router.use("/likes",require("./likes"));
