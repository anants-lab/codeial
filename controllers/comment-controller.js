const Comment=require("../models/comment.js");
const Post=require("../models/post.js");

module.exports.create=(req,res)=>{
    Post.findById({_id:req.body.post},(err,post)=>{
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            },(err,comment)=>{
                if(err){console.log("error in creating a comment"); return;}

                post.comments.push(comment);
                post.save();

                res.redirect("/");
            });
        }
        
    });
};

module.exports.destroy=(req,res)=>{
    Comment.findById(req.params.id,(err,comment)=>{
        if(req.user.id==comment.user){
            let postid=comment.post;
            comment.remove();

            Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}},(err,post)=>{
                res.redirect("back");
            });
        }
        else{
            res.redirect("back");
        }
        
    });

}

