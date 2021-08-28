(function() {
    // gnb 클릭시 부드럽게 이동
    $('.scroll').click(function(event){            
            event.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });



    // 빨리 찾기위해서 init함수를 씀
    init();

    // 초기화 함수로 실행시킬 함수를 묶어줌    
    function init() {
        scrollSectionAnimation();
    }
    
    function scrollSectionAnimation() {
        console.log($('.main_section02').length, '==> 섹셕있음');
        // 요소가 없을경우 lengh는 0(false)이므로 !을 붙여 return으로 함수를 종료시킴
        if(!$('.main_section02').length) {
            return;
        }
        $('.main_section01').addClass('on');
    
    
        var mainSection02 = $('.main_section02')
        var mainSection03 = $('.main_section03')
        var mainSection04 = $('.main_section04')
        var sectionOffset = []; //각 섹션 위치값
        var scOffset = 700; // 섹션이 페이지상단까지 가기전 offset
    
        for(var i=2; i<5; i++) { 
            // for문으로 원하는 인덱스만든 후 선택자 문자열에 연결하여 요소선택
            sectionOffset.push($('.main_section0'+i).offset().top - scOffset);
        }

        // 스크롤바의 위치는 $(window)에서 가져옴
        $(window).scroll(function() {
            // 스크롤바의 위치
            sc = $(this).scrollTop();

            // 스크롤했을시 헤더가 픽스되게
            if(sc >= 150) {
                $('#header').addClass('fixed');
            } else {
                $('#header').removeClass('fixed');
            }

            // 스크롤했을시 lnb_wrap 메뉴가 보이게
            if(sc >= 750) {
                $('.pc_lnb_wrap').fadeIn();
            } else {
                $('.pc_lnb_wrap').fadeOut();
            }

            if(sc >= sectionOffset[0]) mainSection02.addClass('on');
            if(sc >= sectionOffset[0]) $('#header .lnb_wrap .lnb li>a:after').addClass('on');
            if(sc >= sectionOffset[1]) mainSection03.addClass('on');
            if(sc >= sectionOffset[2]) mainSection04.addClass('on');


        }).trigger('scroll');
       
    }
    

    // 창크기구하기
    $(window).resize(function(){
        // 스크롤바를 포함한 크기
        var winW = $(this).outerWidth();
        var winH = $(this).height();
        console.log(winW, winH);
    }).trigger('resize');


    var typingBool = false; 
    var typingIdx=0; 
    var typingTxt = $('.typing1').text(); // 타이핑될 텍스트
    typingTxt=typingTxt.split(''); // 한글자씩  
    if(typingBool==false){ // 타이핑이 진행되지 않았다면 
       typingBool=true; 
       
       var tyInt = setInterval(typing,100); // 반복동작 
     } 
     
     function typing(){ 
       if(typingIdx<typingTxt.length){ // 타이핑될 텍스트 길이만큼 반복 
         $('.typing2').append(typingTxt[typingIdx]); // 한글자씩 이어준다
         typingIdx++; 
       } else{ 
         clearInterval(tyInt); //끝나면 반복종료 
       } 
    }

     /************************** 타블렛 1200부터 적용 **********************/
    // 모바일메뉴 토글
    $('#header .btn_menu').on('click', function() {
        $(this).toggleClass('on');
        $('.m_gnb_wrap').toggleClass('open');
    });

    $('#header .m_gnb_wrap .m_depth1>li').on('click', function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

})();