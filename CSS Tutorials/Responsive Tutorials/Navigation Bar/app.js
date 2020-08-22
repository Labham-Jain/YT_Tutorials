const btn = $('.toggleNav');
btn.click(function(){
    if($('.menu2').hasClass('show')){
        $('.menu2').removeClass('show');
    }
    else{
        $('.menu2').addClass('show')
    }
})