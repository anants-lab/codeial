let toggleLike=function(likeable){
    $('.like-button',likeable).click(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:$('.like-button',likeable).prop('href'),
            success:function(data){
                
                if(!data.data.deleted){
                    $('.like-button i',likeable).css("color","red");
                    let c=parseInt($('.like-count > span > span',likeable).text());
                    $('.like-count > span > span',likeable).text(c+1);
                }
                else{
                    $('.like-button i',likeable).css("color","grey");
                    let c=parseInt($('.like-count > span > span',likeable).text());
                    $('.like-count > span > span',likeable).text(c-1);
                }
            }

        });
    });
}

