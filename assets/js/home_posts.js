
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
                    addCommentEvent(newPost);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    let newPostDom=function(data){
        return $(`
            <div class="each-post" id="post-${data.data.post._id}">
                <div class="each-post-content">
                    <div class='each-post-header'>
                        <h3>${data.data.user}</h3>
    
                        <a href="/post/destroy/${data.data.post._id}" class="delete-post-btn"><i class="fas fa-window-close"></i></a>
                        
                    </div>
                    <p>${data.data.post.content}</p>
                </div>
            
                <div class='actions-container'>
                    <div class="actions-bar">
                        <a class='like-button'><button class='actions-btn'>
                            <i class="far fa-heart"></i> Like
                        </button></a>
                        <a class='comment-button'><button class='actions-btn'>
                            <i class="far fa-comment"></i> Comment
                        </button></a>
                    </div>
                
                    
                        <div class="post-comment">
                            <form action="/comment/create" method="POST" class="comment-form">
                                <div class='comment-form-content'>
                                    <textarea name="content" cols="30" rows="1" placeholder="Comment"></textarea>
                                    <input type="submit" class="submit-comment-form-btn">
                                </div>  
                                <input type="hidden" name="post" value=${data.data.post._id}>
                                
                            </form>
                        </div>
                    
            
                    <div class="comment-container">
                      
                         
                    </div>
                </div>
            
        </div>
        `)
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

        let addCommentEvent= function(post){
            $('.actions-container > .actions-bar > .comment-button',post).click(function(){
                $('.post-comment',post).css('display','block');
                $('.comment-container',post).css('display','block');
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
            addCommentEvent($(post));
        }
        for(delCommentBtn of delCommentBtns){
            deleteComment($(delCommentBtn));
        }
    };


    createPost();
    convertPostsToAJAX();
    
    
    
    
