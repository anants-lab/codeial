
    
    
    let createComment=function(post){
        // console.log(post);
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
                    let c=parseInt($('.comment-count > span > span',post).text());
                    $('.comment-count > span > span',post).text(c+1);
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
        <div class='comment-bubble'>
            <div class='comment-user-name'>${data.data.comment.user.name}</div>
            <div class='comment-user-content'>${data.data.comment.content}</div>
        </div>
        
        <a href="/comment/destroy/${data.data.comment._id}" class="delete-comment-btn"><i class="fas fa-window-close"></i></a>
        
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
                    let post=$(`#post-${data.data.post._id}`);
                    let c=parseInt($('.comment-count > span > span',post).text());
                    $('.comment-count > span > span',post).text(c-1);
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

    
