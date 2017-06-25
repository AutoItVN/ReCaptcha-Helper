var script = document.createElement('script');
script.text = "window.alert = function(x) {console.log(x);" +
"if (x == 'Нет интернет-соединения. Проверьте подключение и повторите попытку.') {" +
"window.top.postMessage({type: 'CONNECTION_FAILED'}, '*');" +
"}" +
"}; window.confirm = function(){return true;};" +
"";
script.type = 'text/javascript';
document.getElementsByTagName("head")[0].appendChild(script);


$(function () {

    if (location.pathname.toString().match(/top.php/) && (window.top && window.top == window)) {

        $("title").text("ReCaptcha Helper");

        document.oncontextmenu = function () {
            return false;
        };
    }

    if (location.pathname.toString().match(/get.captcha.php/) && (window.top && window.top != window)) {

        document.oncontextmenu = function () {
            return false;
        };

        window.addEventListener("message", function (event) {
            var response = event.data;


            if (response.type && (response.type == "setMargin")) {

                var divs = $('div').get().reverse();
                //$(divs).eq(0).css({'height': 672, 'width': 438});
                $(divs).each(function (i, div) {
                    $(div).not('.progress, .progress-bar').css({
                        'margin': 0,
                        'top': 0,
                        'left': 0,
                        'border': 0
                    });
                });

            }


            if (response.type && (response.type == "show")) {

                if (!$(window.frameElement).hasClass('ready')) {
                    $(window.frameElement).addClass('ready');
                }

            }


        }, false);


    }


    if (window.location.host === 'www.google.com' && (window.top && window.top != window) && location.pathname.toString().match(/anchor/) && window.parent !== window.top) {


        $('body').css({'opacity': 0});

        var i = 0;

        var timerId = setTimeout(function tick() {

            i++;

            if (i <= 60) {
                var recaptcha_anchor = document.getElementById('recaptcha-anchor');

                if (recaptcha_anchor && recaptcha_anchor !== 'undefined') {
                    recaptcha_anchor.click();
                }

                timerId = setTimeout(tick, 1000);
            } else {
                window.parent.postMessage({type: 'reset'}, '*');
            }


        }, 100);

    }


    if (window.location.host === 'www.google.com' && (window.top && window.top != window) && location.pathname.toString().match(/bframe/)) {

        document.oncontextmenu = function () {
            return false;
        };

        function reset() {
            window.parent.postMessage({type: 'reset'}, '*');
        }

        function reload() {
            $(".rc-button-reload").eq(0).trigger("mouseover").trigger("mousedown").trigger("mouseup").trigger("click");
        }

        function verifyClick() {
            var targetNode = document.querySelector("HTML>BODY>DIV>DIV>DIV:nth-of-type(3)>DIV:nth-of-type(2)>DIV>DIV:nth-of-type(2)>button");
            if (targetNode) {
                //--- Simulate a natural mouse-click sequence.
                triggerMouseEvent(targetNode, "mouseover");
                triggerMouseEvent(targetNode, "mousedown");
                triggerMouseEvent(targetNode, "mouseup");
                triggerMouseEvent(targetNode, "click");
            }
            function triggerMouseEvent(node, eventType) {
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent(eventType, true, true);
                node.dispatchEvent(clickEvent);
            }
        }

        function toDataUrl(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.send();
        }

        function canvasAutoClick() {

            var isdown;
            var prevX;
            var prevY;
            $(".rc-canvas-canvas").bind("mouseenter mousedown mouseup mouseover mouseout mousemove", function (m) {
                //m.stopPropagation();


                if (m.type == "mousedown" && m.button == 0) {
                    isdown = 1;
                    prevX = m.pageX;
                    prevY = m.pageY;

                    var ev = document.createEvent("MouseEvent");
                    var el = document.elementFromPoint(m.pageX,m.pageY);
                    ev.initMouseEvent(
                        "click",
                        true /* bubble */, true /* cancelable */,
                        window, null,
                        m.pageX, m.pageY, m.pageX, m.pageY, /* coordinates */
                        false, false, false, false, /* modifier keys */
                        0 /*left*/, null
                    );
                    el.dispatchEvent(ev);
                }

                if (m.type == "mouseup" && m.button == 0) {
                    isdown = 0;
                }

                if (m.type == "mousemove" && m.button == 0 && isdown == 1) {

                    if ((prevX - m.pageX) > 5 || (m.pageX - prevX) > 5 || (prevY - m.pageY) > 5 || (m.pageY - prevY) > 5) {


                        prevX = m.pageX;
                        prevY = m.pageY;

                        var ev = document.createEvent("MouseEvent");
                        var el = document.elementFromPoint(m.pageX,m.pageY);
                        ev.initMouseEvent(
                            "click",
                            true /* bubble */, true /* cancelable */,
                            window, null,
                            m.pageX, m.pageY, m.pageX, m.pageY, /* coordinates */
                            false, false, false, false, /* modifier keys */
                            0 /*left*/, null
                        );
                        el.dispatchEvent(ev);


                    }



                }

            });

        }

        function multiSelect() {

            $(document).ready(function () {


                var isdown;
                var isclass;
                $("#rc-imageselect-target td").bind("mouseenter mouseleave mouseover mouseout mousedown mouseup", function (m) {
                    //m.stopPropagation();


                    if (m.type == "mousedown" && m.button == 0) {
                        isdown = 1;
                        isclass = ($(this).filter(':not([class]),[class=""]').length > 0);
                    }

                    if (m.type == "mouseup" && m.button == 0) {
                        isdown = 0;
                    }

                    if (isclass == ($(this).filter(':not([class]),[class=""]').length > 0) && (m.type == "mouseout" || m.type == "mouseleave") && m.button == 0 && isdown == 1) {
                        $(this).find("img").click();
                    }

                    if (isclass == ($(this).filter(':not([class]),[class=""]').length > 0) && (m.type == "mouseover" || m.type == "mouseenter") && m.button == 0 && isdown == 1) {
                        $(this).find("img").click();
                    }


                });
            });
        }

        function multiSelectDynamic () {

            $(document).ready(function () {
                var isdown;
                var isclass;
                $("#rc-imageselect-target td").bind("mouseenter mousedown mouseup mouseover mouseout", function (m) {

                    if (m.type == "mousedown" && m.button == 0) {
                        isdown = 1;
                    }

                    if (m.type == "mouseout" && m.button == 0 && isdown == 1) {
                        $(this).filter(':not([class=""])').find("img").click();
                    }

                    if (m.type == "mouseup" && m.button == 0) {
                        isdown = 0;
                        $("#rc-imageselect-target td").filter('[class=""]').removeAttr('class');
                    }

                    if (m.type == "mouseover" && m.button == 0 && isdown == 1) {
                        $(this).filter(':not([class=""])').find("img").click();

                    }

                });

            });
        }

        function skipBadCaptcha() {

            setTimeout(function () {

                imageSrc = $("#rc-imageselect-target").find("img:eq(0)").attr("src");

                toDataUrl(imageSrc, function (base64Img) {

                    if ((base64Img.length == 38711) || (base64Img.length == 75439) || (base64Img.length == 36675)) {
                        verifyClick();
                    }

                });

            }, 10);

        }


        var css = '.rc-imageselect-carousel-offscreen-right, .rc-imageselect-carousel-entering-right, .rc-imageselect-carousel-leaving-left, .rc-imageselect-carousel-offscreen-left {transition: 0s ease !important; }',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);


        var script = document.createElement('script');
        script.text = '(function(){if("undefined"!==typeof CustomEvent&&"function"===typeof window.dispatchEvent)"undefined"!==typeof XMLHttpRequest&&XMLHttpRequest.prototype&&XMLHttpRequest.prototype.send&&(XMLHttpRequest.prototype.send=function(c){return function(f){var d=this;d.addEventListener("loadend",function(event){function replaceAll(str,find,replace){return str.replace(new RegExp(find,"g"),replace)}var response=JSON.parse(replaceAll(replaceAll(d.responseText.replace(")]}\'",""),",,",\',"",\'),",,",\',"",\'));window.postMessage({type:"loadend", responseText:response},"*")});return c.apply(d,arguments)}}(XMLHttpRequest.prototype.send))})();';
        script.type = 'text/javascript';
        document.body.appendChild(script);


        window.addEventListener("message", function (event) {

            //console.log(event);

            try {
                var googleMessage = JSON.parse(event.data);


                if (googleMessage.messageType == "challenge_shown" || (googleMessage.type && (googleMessage.type == "loadend"))) {
                    window.parent.postMessage({type: 'setMargin'}, '*');
                }

                if (typeof googleMessage.message.Dc !== 'undefined' && googleMessage.messageType == "challenge_shown") {
                    window.parent.postMessage({type: 'show'}, '*');
                    window.challenge_shown = true;
                }

            } catch (e) {
            }


            var event = event.data;
            var responseText = [];

            if (event.type && (event.type == "loadend") && (event.responseText[0] == "rresp")) {
                responseText = event.responseText;
            }

            if (event.type && (event.type == "loadend") && (event.responseText[0] == "uvresp") && ((typeof event.responseText[7] !== "undefined") && event.responseText[7][0] == "rresp")) {
                responseText = event.responseText[7];

            }


            if (typeof responseText[5] !== "undefined") {


                if (responseText[5] == "dynamic") {
                    multiSelectDynamic();
                    chrome.runtime.sendMessage({ complication: 2 }, function () {});
                }

                if (responseText[5] == "imageselect") {
                    multiSelect();
                    chrome.runtime.sendMessage({ complication: 1 }, function () {});
                }

                if (responseText[5] == "tileselect") {
                    multiSelect();
                    chrome.runtime.sendMessage({ complication: 1 }, function () {});
                }

                if (responseText[5] == "canvas") {
                    canvasAutoClick();
                    chrome.runtime.sendMessage({ complication: 1 }, function () {});
                }

                if (responseText[5] == "multicaptcha") {

                    skipBadCaptcha();
                    multiSelect();

                    $("#rc-imageselect-target").bind("DOMNodeRemoved", function (e) {

                        skipBadCaptcha();
                        multiSelect();

                    });

                }

                //window.parent.postMessage({type: 'setMargin'}, '*');

                $(window).one("mouseover", function (a) {
                    a.stopPropagation();

                    if (window.dynamic) {
                        //$("#rc-imageselect").find("table").animateHighlight();
                    }

                    window.parent.postMessage({type: 'timeout10'}, '*');

                    setInterval(function () {
                        window.focus();
                    }, 50);


                    $(window).mousedown(function (s) {
                        s.stopPropagation();
                        if (s.button == 2) {
                            verifyClick();
                        }
                    });

                    $(window).bind('keydown', function (k) {
                        k.stopPropagation();

                        if (k.which == 32) {
                            k.preventDefault();
                            window.parent.postMessage({type: 'reset'}, '*');
                        }
                    });

                });


            }


        });

    }


});

