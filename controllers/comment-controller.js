const Comment=require("../models/comment.js");
const Post=require("../models/post.js");

module.exports.create=async (req,res)=>{
    try{
        let post= await Post.findById({_id:req.body.post});
        
        if(post){
            let comment= await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post  
            });
                    //if(err){console.log("error in creating a comment"); return;}
            post.comments.push(comment);
            post.save();
            res.redirect("/");
        }
    }
    catch(err){
        console.log("error in creating a comment", err); return;
    }
           
}
try{
    module.exports.destroy= async (req,res)=>{

        let comment= await Comment.findById(req.params.id)
        
        if(req.user.id==comment.user){
            let postid=comment.post;
            comment.remove();
    
            await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}})
            
            res.redirect("back");
               
        }
        else{
            res.redirect("back");
        }
    
    }
}
catch(err){
    console.log("error", err); return;
}