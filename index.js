const { static } = require("express");
const express=require("express");
const app=express();
//After npm install express-ejs-layouts
//Help to set Layout
const expressLayouts=require("express-ejs-layouts");


//Setting up view engine
app.set("view engine","ejs");
app.set("views", "./views");
//Extract styles and Scripts from subpages and place correctly in layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);


app.use(express.static("./assets"));

//Tells our app that views that are going to be rendered belong to a layout
app.use(expressLayouts);

//Maps router to URL segment "/"
//Sends all the request with URL starting with "/" to the path /routers/index.js
app.use("/",require("./routers/index.js"));



//Listens on port->8000
app.listen(8000,function(err){
    if(err){
        console.log("Server error");
        return;
    }
    console.log("Server Up");
})