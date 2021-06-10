
    //method to submit the form data for new post using AJAX
    let createPost=function(){
        let newPostForm=$("#post-form");
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/post/create',
                data: newPostForm.serialize(), 
                //.serialize() function creates the form data into url encoded string.
                //This is the same way HTML sends its form data on submit.
                success:function(data){ //the data that loads here comes from server (post-controller.js)
                    let newPost=newPostDom(data);
                    $("#post-container").prepend(newPost);
                    new Noty({
                        theme:"relax",
                        text: data.message,
                        type:"success",
                        layout:"topRight",
                        timeout:1500
    
                    }).show();
                    deletePost($(".delete-post-btn" ,newPost));
                    createComment(newPost);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    let newPostDom=function(data){
        return $(`<div class="each-post" id="post-${data.data.post._id}">
                    <div class="each-post-content">
                        
                            <a href="/post/destroy/${data.data.post._id}" class="delete-post-btn">x</a>
                            <h3>${data.data.user}</h3>
                            <p>${data.data.post.content}</p>
                    </div>
                    
                
                    <div class="comment-container">
    
                    </div>
                
                    
                        <div class="post-comment">
                            <form action="/comment/create" method="POST" class="comment-form">
                                <textarea name="content" cols="30" rows="1" placeholder="Comment"></textarea>
                                <input type="hidden" name="post" value=${data.data.post._id}>
                                <input type="submit">  
                            </form>
                        </div>
                    
                </div>`
                )
    }

    let deletePost=function(delBtn){

            delBtn.click(function(e){
                e.preventDefault();
                $.ajax({
                    type:"get",
                    url: delBtn.prop("href"),
                    success:function(data){
                        let post=$(`#post-${data.data}`);
                        post.remove();
                        new Noty({
                            theme:"relax",
                            text: data.message,
                            type:"success",
                            layout:"topRight",
                            timeout:1500
        
                        }).show();
                    },
                    error:function(err){
                        console.log(err.responseText);
                    }
                });
            });
        }



    // loop over all the existing posts on the page (when the window loads for the first time) 
    //and call the delete post method on delete link of each, 
    //also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAJAX=function(){
        let posts=$(".each-post");

        let delCommentBtns=$(".delete-comment-btn");
        for(post of posts){
            deletePost($(".delete-post-btn",post));
            createComment($(post));
        }
        for(delCommentBtn of delCommentBtns){
            deleteComment($(delCommentBtn));
        }
    };


    createPost();
    convertPostsToAJAX();
    
    
    
    
