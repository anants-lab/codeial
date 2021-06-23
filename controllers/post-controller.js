const Comment = require("../models/comment");
const Post = require("../models/post");
const Like=require("../models/like");

try{
    module.exports.create= async function(req,res){
        let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        
        //Check if the request is an AJAX request. AJAX request is of type XMLHTTPRequest 
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                    user:req.user.name
                },
                message:"Post created!"
            });
        }

        return res.redirect("back");    

    }
}
catch(err){
    console.log("error in creating a post"); return;
}


module.exports.destroy=async function(req,res){
    try{
        let post= await Post.findById(req.params.id);
        //.id means converting Object id into string 
        if(post.user==req.user.id){

            await Like.deleteMany({
                likeable:post._id,
                onModel:'Post'
            });
            await Like.deleteMany({
                likeable:{$in:post.comments},
                onModel:'Comment'
            });

            post.remove();

            await Comment.deleteMany({post:req.params.id});

            if(req.xhr){
                
                return res.status(200).json({
                    data:req.params.id,
                    message:"Post deleted!"
                });
            }
            
            return res.redirect("back");
        }
        else{
            return res.redirect("back");
        }
    }
    catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}




