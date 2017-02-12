/**
 * Created by john on 2016/12/28.
 */
$(function(){
    var arrDeg=[];  //旋转球初始角度
    var degNum=0;       //设置旋转初始角度
    var waitBallNum=4;  //初始等待球数量
    var lv=1;          //初始难度
    var score=0;      //初始分数
    var safeDst=8;    //设置安全距离 2*arcsin(1/15)
    var timer=setInterval(rotate,30); //旋转
    function rotate(){
        $('.center').css('transform','rotate('+degNum+'deg)');
        degNum+=lv;
        if(degNum>=360){
            degNum=0;
        }
    }
    create(waitBallNum,arrDeg);
    //点击后开始游戏 刷新球的数量
    $(document).click(function(){
        animation();
        setTimeout(function(){
            $('.waitballBox').empty();
            $('.center').empty();
            // waitBallNum--;
            var newDeg=-(degNum-90); //添加新旋转球的度数  -（当前大球旋转的度数-90度）
            arrDeg.push(newDeg);      //新旋转球角度添加到数组

            create(waitBallNum,arrDeg);

            safe(newDeg,waitBallNum);

            //每20分增加一个难度
            switch(score){
                case 20: lv++;
                break;
                case 40: lv++;
                break;
                case 60: lv++;
                break;
                case 80: lv++;
                break;
                case 100: lv++;
                break;
            }
            $('.difficulty input').eq(0).val('当前难度：'+lv);
        },200);

    });
    //点击按钮设置难度
    $('.difficulty input').eq(1).click(function(event){

        event.stopPropagation();
        lv++;
        if(lv>=10){
            lv=10;
        }
        $('.difficulty input').eq(0).val('当前难度：'+lv);
    });
    $('.difficulty input').eq(2).click(function(event){
        event.stopPropagation();
        lv--;
        if(lv<=1){
            lv=1;
        }
        $('.difficulty input').eq(0).val('当前难度：'+lv);
    });
    $('.difficulty input').eq(3).click(function(event){
        event.stopPropagation();
        lv=parseInt(Math.random()*10+1);
        $('.difficulty input').eq(0).val('当前难度：'+lv);
    });
    //动态生成
    function create(waitBallNum,arrDeg){
        // 动态生成等待球
        for(var i=0;i<waitBallNum;i++){
            var $waitBall=$('<div>').attr('class','waitball');
            $('.waitballBox').append($waitBall);
        }
        //动态生成旋转球
        for(var j=0;j<arrDeg.length;j++){
            var $scrollboll=$('<div>').attr({'class':'scrollball','style':'transform:rotate('+arrDeg[j]+'deg)'});
            $('.center').append($scrollboll);
        }
    }
    function animation(){
        $('.dynamic').show().animate({'top':0},200,function(){
            $(this).hide().css('top',130);
        });
    }

    //安全计算
    function safe(newDeg,Num){
        console.log(newDeg,Num);
       var arrFilter= $.grep(arrDeg,function(n,i){
             return (Math.abs(n-newDeg)<safeDst);
       });
       // 随机删除1-5个滚动球
       var randomNum=parseInt(Math.random()*5+1);
        if(arrDeg.length>10){
            arrDeg.splice(randomNum,randomNum);
        }
       console.log(arrDeg);
       console.log(arrFilter);
       if(arrFilter.length>=2){
           clearInterval(timer);
           $('.Tscore').html('您共获得：'+score+'分');
           $('.end').fadeIn();
           $('.end a').click(function(){
               window.location.reload();
           });

       }else{
           score++;
           $('.score').html(score);
            console.log(score);

       }

    }

});