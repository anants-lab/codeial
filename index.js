const { static } = require("express");
const express=require("express");
const app=express();
//After npm install express-ejs-layouts
//Help to set Layout
const expressLayouts=require("express-ejs-layouts");

//This is the connection used by default for every model created using mongoose.model.
const db=require("./config/mongoose");
//Importing Model
const User = require("./models/users.js");

//Setting up view engine
app.set("view engine","ejs");
app.set("views", "./views");
//Extract styles and Scripts from subpages and place correctly in layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//Using for accessing static files
app.use(express.static("./assets"));

//For retrieving data from POST 
app.use(express.urlencoded());

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