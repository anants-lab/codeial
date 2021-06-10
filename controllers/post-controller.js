const Comment = require("../models/comment");
const Post = require("../models/post");

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


module.exports.destroy=(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        //.id means converting Object id into string 
        if(post.user==req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},(err)=>{
                if(req.xhr){
                    
                    return res.status(200).json({
                        data:req.params.id,
                        message:"Post deleted!"
                    });
                }
                return res.redirect("back");
            });
        }
        else{
            return res.redirect("back");
        }
    })
}



