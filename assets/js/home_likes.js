let toggleLike=function(likeable){
    $('.like-button',likeable).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:$('.like-button',likeable).prop('href'),
            success:function(data){
                
                if(!data.data.deleted){
                    $('.like-button i',likeable).css("color","red");
                }
                else{
                    $('.like-button i',likeable).css("color","grey");
                }
            }

        });
    });
}

