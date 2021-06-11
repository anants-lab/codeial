const express=require("express");
const app=express();
//Help to set Layout
const expressLayouts=require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

//This is the connection used by default for every model created using mongoose.model.
const db=require("./config/mongoose");
//Importing Model
const User = require("./models/users.js");

//Used for session cookie 
const session=require("express-session");
const passport=require("passport");
const passportLocal=require("./config/passport-local-strategy");
const MongoStore=require('connect-mongo');
const sassMiddleware=require("node-sass-middleware");
const flash=require("connect-flash");
const customMWare=require("./config/middleware");


//Setting up view engine
app.set("view engine","ejs");
app.set("views", "./views");
//Extract styles and Scripts from subpages and place correctly in layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

app.use(sassMiddleware({
    src:"./assets/scss",
    dest:"./assets/css",
    debug:"true",
    outputStyle:"extended",
    prefix:"/css"
}));

//For handling cookies
app.use(cookieParser());
//For retrieving data from POST 
app.use(express.urlencoded());
//Using for accessing static files
app.use(express.static("./assets"));

//Tells our app that views that are going to be rendered belong to a layout
app.use(expressLayouts);

//MongoStore is used to store the session cookie in db  
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:'false',
    resave:'false',
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(
        {
            mongoUrl:"mongodb://localhost/codeial_development",
            autoRemove:"disabled"
        },
        function(err){
            console.log(err || "connect-mongodb setup-ok");
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//With the flash middleware in place, all requests will have a req.flash() function that can be used for flash messages.
//req.flash(type,value); creats an object with key "type" and value "value"
//req.flash(type); finds the value with key "type";
//stores the flash value once and then delete upon refresh
//This middleware uses session ,so this middleware must be placed below session middleware
app.use(flash());

app.use(customMWare.setFlash);




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