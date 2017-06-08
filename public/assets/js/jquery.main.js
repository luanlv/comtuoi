
window.myfunload = function() {
    //alert($(window).width());
    $(".panel-left").mobilepanel();
    // $('#menu').superfish({
    //     delay: 300,
    //     cssArrows: false
    // });
    // mypageload();
    // $("#tabs").tabs();
    //mybanner();
    mysearch();
    // mylineh();
    // $(window).resize(function () {
        //mybanner();
        // mylineh();
    // });
    menusroll();
    // if ($(".whidden").size() > 0) {
        //                mylistvideot();
    // }
    // $(".wrap-distri .table tr:even").addClass("even");
    // $(".wrap-distri .table th:nth-child(4n+1), .wrap-distri .table td:nth-child(4n+1)").addClass("text-center");
    // $(".wrap-distri .table th:nth-child(4n+2), .wrap-distri .table td:nth-child(4n+2)").addClass("text-center");
    // $(".wrap-us .table td:nth-child(4n+1)").addClass("col-1");
    // $(".wrap-us .table td:nth-child(4n+2)").addClass("col-2");
    // $(".wrap-us .table td:nth-child(4n+3)").addClass("col-3");
    // $(".wrap-us .table td:nth-child(4n)").addClass("col-4");
    // if ($(".wrap-us .table").size() > 0) {
    //     $(".wrap-us .table").textHeight({
    //         activetit: true,
    //         listcss: [{ cssname: "td.col-1"}], // css text height
    //         wpointb: false,
    //         widthpont: 420,
    //         desbool: false,
    //         listpos: [{ cssnamepos: ".description", cssheightnum: "3"}],
    //         max: true //max or min
    //     });
    // }
//    myaccessfull("popupAcc", null, "aaa");
}
window.mypageload = function() {
    $(".selectb").uniform();
    $(".datepicker").datepicker();
    if ($('#isotopelist').size() == 1) {
        var $container = $('#isotopelist').imagesLoaded(function () {
            $container.isotope({
                itemSelector: '.element-item',
                layoutMode: 'fitRows'
            });
        });
    }
    if ($('.isotopelist').size() > 0) {
        var $containerlist = $('.isotopelist').imagesLoaded(function () {
            $containerlist.isotope({
                itemSelector: '.element-item',
                layoutMode: 'fitRows'
            });
        });
    }
    if ($('.product-tb').size() > 0) {
        var $containertb = $('.product-tb').imagesLoaded(function () {
            $containertb.textHeight({
                activetit: true,
                listcss: [{ cssname: ".product-name"}], // css text height
                wpointb: false,
                widthpont: 420,
                desbool: true,
                listpos: [{ cssnamepos: ".description", cssheightnum: "3"}],
                max: true //max or min
            }).isotope({
                itemSelector: '.element-item',
                layoutMode: 'fitRows'
            });
        });
    }
    // $('.sliderBig').slick({
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    //     dots: true,
    //     arrows: false,
    //     speed: 500,
    //     slidesToShow: 1
    // });
    $(".wrap-support .support-out:odd").addClass("odd");
}
function mybanner() {
    var wwin = $(window).width();
    if (wwin > 1170) {
        $(".wrapper-banner").css({ "margin-left": parseInt((wwin - 1170) / 2 + 1) });
    } else if (wwin > 979 & wwin < 1200) {
        $(".wrapper-banner").css({ "margin-left": parseInt((wwin - 970) / 2 + 1) });
    } else if (wwin > 767 & wwin < 980) {
        $(".wrapper-banner").css({ "margin-left": parseInt((wwin - 750) / 2 + 1) });
    } else {
        $(".wrapper-banner").css({ "margin-left": 0 });
    }
}
function menusroll() {
    var htop = $("#header").height();
    srollmenu(htop);
    $(window).scroll(function () {
        srollmenu(htop);
    });
}
function srollmenu(htop) {
    if ($(window).scrollTop() > htop) {
        $("#header").addClass("header-sroll");
        //                $("#mainContent").css({ "padding-top": htop });
    } else {
        $("#header").removeClass("header-sroll");
        //                $("#mainContent").css({ "padding-top": 0 });
    }
}
function mylineh() {
    $(".lineh .title-2").css({ "line-height": 34 + "px" });
    if ($(window).width() > 750) {
        $(".lineh").each(function () {
            var hl = $(this).height();
                $(this).find(".title-2:first").css({ "line-height": hl + "px" });
        });
    }
}
function mylistvideot() {
    $(".info-vido").each(function (e) {
        var videoname = $(this).attr("id");
        var viddeosrc = $(this).attr("data-video");
        jwplayer(videoname).setup({
            file: viddeosrc,
            flashplayer: "assets/js/jwplayer.flash.swf",
            width: '100%',
            aspectratio: '16:9'
        });
        jwplayer(videoname).play();
        jwplayer(videoname).setMute();
        jwplayer(videoname).onPlay(function () {
            var timev = jwplayer(videoname).getDuration();
            //                    alert(timev);
            $("#" + videoname).parents("li").find(".video-time").text(convertime(timev));
            jwplayer(videoname).play();
            if (jwplayer(videoname).getPosition() == 0) {
                $("#" + videoname).parents("li").find(".whidden").remove();
            }
        });
    });
}
function convertime(timee) {
    var hh = parseInt(timee / 3600);
    var hmod = parseInt(timee % 3600);
    var mm = parseInt(hmod / 60);
    var ss = parseInt(hmod % 60);
    if (timee >= 3600) {
        var tiu = (hh + ":" + mylengthtwo(mm) + ":" + mylengthtwo(ss));
    } else {
        var tiu = (mylengthtwo(mm) + ":" + mylengthtwo(ss));
    }
    return tiu
}
function mylengthtwo(leng) {
    if (leng > 9) {
        var num = leng;
    } else if (leng < 0) {
        var num = "00";
    } else {
        var num = "0" + leng;
    }
    return num;
}
function myaccessfull(namePopup, title, text) {
    if (title != "") {
        $(".popup-text .modal-title").text(title);
    }
    $(".popup-text .content-text").html(text);
    $('a[data-target="#' + namePopup + '"]').trigger("click");
}
function mysearch() {

    $(".finda").click(function () {
        $(this).addClass("open");
        var ids = $(this).attr("href");
        if ($(this).hasClass("open")) {
            $(ids).addClass("hidden-mo");
        } else {
            $(ids).removeClass("hidden-mo");
        }
        return false;
    });
}
