const express=require("express");
const app=express();


app.use("/",require("./routers/index.js"));



app.listen(8000,function(err){
    if(err){
        console.log("Server error");
        return;
    }
    console.log("Server Up");
})