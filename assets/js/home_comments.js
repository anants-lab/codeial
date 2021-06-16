
    
    
    let createComment=function(post){
        //console.log("hello");
        let commentForm=$(".comment-form",post);
        commentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:"POST",
                url:"/comment/create",
                data:commentForm.serialize(),
                success:function(data){
                    
                    let newComment=newCommentDom(data);
                    $(".comment-container",post).prepend(newComment);
                    new Noty({
                        theme:"relax",
                        text: data.message,
                        type:"success",
                        layout:"topRight",
                        timeout:1500
    
                    }).show();
                    deleteComment($(".delete-comment-btn",newComment));
                },
                error:function(err){
                    console.log(err.responseText);
                }
            });
        });
    };



    let newCommentDom=function(data){
        return $(`<div class="each-comment" id="comment-${data.data.comment._id}">
                        <span>${data.data.comment.user.name}</span>
                        <span>${data.data.comment.content}</span>
                        <a href="/comment/destroy/${data.data.comment._id}" class="delete-comment-btn">x</a>
                    </div>`);
    };

    let deleteComment=function(delBtn){
        delBtn.click(function(e){
            e.preventDefault();
            $.ajax({
                type:"GET",
                url:delBtn.prop("href"),
                success:function(data){
                    $(`#comment-${data.data.id}`).remove();
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
    };

    
