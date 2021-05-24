const express=require("express");
const app=express();

//Maps router to URL segment "/"
//Sends all the request with URL starting with "/" to the path /routers/index.js
app.use("/",require("./routers/index.js"));



app.listen(8000,function(err){
    if(err){
        console.log("Server error");
        return;
    }
    console.log("Server Up");
})