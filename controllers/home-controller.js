const Post=require("../models/post");

module.exports.home=function(req,res){

    //Populate 'user' field of post(which contains only user id)  with entire object of user.
    // Post.find({},function(err,posts){
    //     console.log("Post object ",posts);
    //     res.render("home.ejs",{posts:posts});
    // });
    Post.find({}).populate("user").exec(function(err,posts){
        res.render("home.ejs",{posts:posts});
    });
};