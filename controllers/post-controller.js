const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    },function(err,post){
        if(err){console.log("error in creating a post"); return;}

        return res.redirect("back");
    })
}

module.exports.destroy=(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        //.id means converting Object id into string 
        if(post.user==req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},(err)=>{
                return res.redirect("back");
            });
        }
        else{
            return res.redirect("back");
        }
    })
}



