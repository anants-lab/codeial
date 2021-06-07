const { serializeUser } = require("passport");
const Post=require("../models/post");
const User=require("../models/users");


module.exports.home=async function(req,res){
    try{
        //Populate 'user' field of post(which contains only user id)  with entire object of user.
        let posts= await Post.find({})
        .populate("user")
        .populate({
            path:"comments",
            populate:{
                path:"user"
            }
        });
        
        let users=await User.find({});

        return res.render("home.ejs",
        {
            posts:posts,
            users:users
        });
        }
    catch(err){
        console.log("Error", err);
    }

};