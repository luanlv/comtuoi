(function ($) {
    $.fn.extend({

        mobilepanel: function (options) {
            // Đặt các giá trị mặc định
            var defaults = {
                panelLeft: true,
                speed: 150,
                wrapperid: "#wrapper",
                cssmenu: ".menu-mobile",
                easing: null
            };

            var options = $.extend(defaults, options);

            return this.each(function () {
                var opts = options;

                // Đặt tên biến cho element (ul)
                var obj = $(this);
                var cssPrefix, cssPrefix, animProp;
                var usingCSS = (function () {
                    // create our test div element
                    var div = document.createElement('div');
                    // css transition properties
                    var props = ['WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
                    // test for each property
                    for (var i in props) {
                        if (div.style[props[i]] !== undefined) {
                            cssPrefix = props[i].replace('Perspective', '').toLowerCase();
                            animProp = '-' + cssPrefix + '-transform';
                            return true;
                        } else {
                            animProp = 'transform';
                        }
                    }
                    return false;
                } ());
                // Thêm sự kiện click vào thẻ a
                if (opts.easing) {
                    var easings = opts.easing;
                } else {
                    var easings = 'swing';
                }

                //                $(".mobile-panel").css("left", '-100%');
                if (usingCSS) {
                    mytranform(".mobile-panel", animProp, "-120%")
                } else {
                    $(".mobile-panel").css("left", '-120%');
                }
                obj.click(function (event) {
                    $(this).toggleClass("open");
                    var items = $(this).attr("href");
                    if (usingCSS) {
                        myfuntran($(this), items, animProp, cssPrefix, opts.speed, easings, opts.panelLeft);
                        $(window).resize(function () {
                            mobileLR(items, opts.panelLeft);
                        });
                    } else {
                        myfunanimate($(this), items, opts.panelLeft, opts.speed, easings);
                        $(window).resize(function () {
                            mobileLR(items, opts.panelLeft);
                        });
                    }
                    return false;
                });
                //functions-tranform===========================================================================
                function myfuntran(thisv, name, tranformd, csspref, speeds, easing, lr) {
                    if (lr) {
                        $(name).css({ "left": "0", "right": "auto" });
                        var numtran = "-120%";
                    } else {
                        $(name).css({ "left": "auto", "right": "0" });
                        var numtran = "120%";
                    }
                    mytranform(name, tranformd, numtran);
                    if (thisv.hasClass("open")) {
                        $("html,body").stop(true, true).animate({ scrollTop: 0 }, 300);
                        $(name).after('<div class="mask-panel" id="' + name + '"></div>');
                        mymenuheight(name);
                        mytranformfun(name, tranformd, csspref, "0", speeds, easing, true, false, false);
                    } else {
                        mytranformfun(name, tranformd, csspref, numtran, speeds, easing, false, true, false);
                    }
                    $(".mask-panel[id='" + name + "']").click(function () {
                        mytranformfun(name, tranformd, csspref, numtran, speeds, easing, false, true, true);
                        $("html,body").stop(true, true).animate({ scrollTop: 0 }, 500);
                        $(opts.wrapperid).css("min-height", $(window).height() + "px");
                        return false;
                    });
                    $(name).find("[href='" + name + "']").click(function () {
                        mytranformfun(name, tranformd, csspref, numtran, opts.speed, easings, false, true, true);
                        $(opts.wrapperid).css("min-height", $(window).height() + "px");
                        return false;
                    });
                }
                function mobileLR(idmenu, lr) {
                    $(opts.wrapperid).css("min-height", $(window).height() + "px");
                    if ($(window).width() < 750 & obj.hasClass("open")) {
                        mymenuheight(idmenu);
                        mytranformsh(idmenu, animProp, cssPrefix, "0", opts.speed, easings, true);
                    } else {
                        if (lr) {
                            var numtran = "-120%";
                        } else {
                            var numtran = "120%";
                        }
                        mytranformsh(idmenu, animProp, cssPrefix, numtran, opts.speed, easings, false);
                    }
                }
                function mytranformsh(name, tranformd, csspref, numx, speeds, easing, show) {
                    mytranforms(name, tranformd, csspref, numx, speeds, easing);
                    if (show) {
                        $(".mask-panel[id='" + name + "']").show();
                    } else {
                        $(".mask-panel[id='" + name + "']").hide();
                    }
                }
                function mytranformfun(name, tranformd, csspref, numx, speeds, easing, addover, remov, reclose) {
                    if (addover) {
                        $(opts.wrapperid).addClass("overflow");
                    } else {
                        $(opts.wrapperid).removeClass("overflow");
                    }
                    mytranforms(name, tranformd, csspref, numx, speeds, easing);
                    if (reclose) {
                        $("[href='" + name + "']").removeClass("open");
                    }
                    if (remov) {
                        $(".mask-panel[id='" + name + "']").remove();
                    }
                }
                function mytranform(name, mytranformd, numx) {
                    $(name).css(mytranformd, 'translate3d(' + numx + ', 0, 0)');
                }
                function mytranforms(name, mytranformd, csspref, numx, speeds, easing) {
                    $(name).css(mytranformd, 'translate3d(' + numx + ', 0, 0)').
                        css('-' + csspref + '-transition-duration', speeds / 1000 + 's').
                        css('-' + csspref + '-transition-timing-function', easing);
                }

                //functions-animate===========================================================================
                function myfunanimate(thisv, name, lr, speeds, easing) {
                    if (lr) {
                        $(name).css({ "left": "-100%", "right": "auto" });
                    } else {
                        $(name).css({ "left": "auto", "right": "-100%" });
                    }
                    if (thisv.hasClass("open")) {
                        $("html,body").stop(true, true).animate({ scrollTop: 0 }, 300);
                        $(name).after('<div class="mask-panel" id="' + name + '"></div>');
                        mymenuheight(name);
                        myanimate(name, lr, "0", opts.speed, easings, true, false, false, false);
                    }
                    $(".mask-panel[id='" + name + "']").click(function () {
                        myanimate(name, lr, "-100%", opts.speed, easings, false, true, true, true);
                        $("html,body").stop(true, true).animate({ scrollTop: 0 }, 500);
                        $(opts.wrapperid).css("min-height", $(window).height() + "px");
                        return false;
                    });
                    $(name).find("[href='" + name + "']").click(function () {
                        myanimate(name, lr, "-100%", opts.speed, easings, false, true, true, true);
                        $(opts.wrapperid).css("min-height", $(window).height() + "px");
                        return false;
                    });
                }
                function mobileLR(idmenu, lr) {
                    $(opts.wrapperid).css("min-height", $(window).height() + "px");
                    if ($(window).width() < 750 & obj.hasClass("open")) {
                        mymenuheight(idmenu);
                        myanimatesh(idmenu, lr, "0", opts.speed, easings, false, true, false, false, true);
                    } else {
                        myanimatesh(idmenu, lr, "-100%", opts.speed, easings, false, true, false, false, false);
                    }
                }
                function myanimatesh(name, mylr, numx, speeds, easing, addover, removover, remov, reclose, show) {
                    myanimate(name, mylr, numx, speeds, easing, addover, removover, remov, reclose);
                    if (show) {
                        $(".mask-panel[id='" + name + "']").show();
                    } else {
                        $(".mask-panel[id='" + name + "']").hide();
                    }
                }
                function cssa(name, mylr, numx) {
                    $(name).css(mylr, numx);
                }
                function myanimate(name, lr, numx, speeds, easing, addover, removover, remov, reclose) {
                    if (addover) {
                        $(opts.wrapperid).addClass("overflow");
                    }
                    if (lr) {
                        $(name).stop(true, true).animate({ "left": numx }, speeds, easing, function () {
                            if (removover) {
                                $(opts.wrapperid).removeClass("overflow");
                            }
                            if (reclose) {
                                $("[href='" + name + "']").removeClass("open");
                            }
                            if (remov) {
                                $(".mask-panel[id='" + name + "']").remove();
                            }
                        });
                    } else {
                        $(name).stop(true, true).animate({ "right": numx }, speeds, easing, function () {
                            if (removover) {
                                $(opts.wrapperid).removeClass("overflow");
                            }
                            if (reclose) {
                                $("[href='" + name + "']").removeClass("open");
                            }
                            if (remov) {
                                $(".mask-panel[id='" + name + "']").remove();
                            }
                        });
                    }
                }
                //functions-height===========================================================================
                function mymenuheight(idmenu) {
                    var hh = $(idmenu).find(opts.cssmenu).outerHeight();
                    if (hh > $(document).height()) {
                        $(idmenu).height(hh);
                        $(opts.wrapperid).css("min-height", hh + "px");
                    } else {
                        $(idmenu).height($(document).height());
                        $(opts.wrapperid).css("min-height", $(document).height() + "px");
                    }
                }
            });
        }
    });
})(jQuery);
