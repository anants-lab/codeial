const Comment=require("../models/comment.js");
const Post=require("../models/post.js");
const commentMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentEmailWorker= require('../workers/comment_email_worker');

module.exports.create=async (req,res)=>{
    try{
        let post= await Post.findById({_id:req.body.post});
        
        if(post){
            let comment= await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post  
            });
            
            post.comments.push(comment);
            post.save();

            comment= await comment.populate('user','name email').execPopulate();
            // commentMailer.newComment(comment);

            let job=queue.create('emails',comment).save(function(err){
                if(err){
                    console.log("Error in sending to the queue",err);
                    return;
                }
                console.log('job enqueued',job.id);
            });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment,
                        //user:req.user.name
                    },
                    message:"Comment Created"
                    
                });
            }
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
    
            await Post.findByIdAndUpdate(postid,{$pull:{comments:req.params.id}});

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        id:req.params.id
                    },
                    message:"Comment Deleted"
                    
                });
            }
            
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