/*var local_storage = document.createElement('div');
local_storage.id = 'local_storage';
local_storage.setAttribute('data-test', 0);
document.body.appendChild(local_storage);

var cookie_storage = document.createElement('div');
cookie_storage.id = 'cookie_storage';
cookie_storage.setAttribute('data-id', 0);
cookie_storage.setAttribute('data-complication', 0);
cookie_storage.setAttribute('data-processed', 0);
cookie_storage.innerText = '';
document.body.appendChild(cookie_storage);


function newCookie() {

    var cookie_storage = $("#cookie_storage");

    if (cookie_storage.data('processed') == 0) {

        cookie_storage.data('complication', 0).attr('data-complication', 0).data('processed', 1).attr('data-processed', 1);

        $.ajax({
            type: 'POST',
            url: 'http://37.140.197.54/cookie/get.php', // 37.140.197.54
            data: {
                id: cookie_storage.data('id')
            },
            dataType: 'json',
            success: function (json) {

                if (typeof json.id !== undefined) {

                    cookie_storage.data('id', json.id).attr('data-id', json.id).text(json.data);

                }

            }
        });

        cookie_storage.data('complication', 0).attr('data-complication', 0);

        setTimeout(function () {
            cookie_storage.data('processed', 0).attr('data-processed', 0);
        }, 25000);

    }

}

chrome.browserAction.onClicked.addListener(function (tab) {

    if (typeof window.curtab !== "undefined") {
        try {
            chrome.tabs.remove(window.curtab, function () {});
        } catch (e) {}
    }

    // 5.63.155.108
    chrome.windows.create({
        url: "http://37.140.197.54/extension/beta.1.0.1/top.php",
        type: "popup",
        height: 732,
        width: 484,
        focused: true,
        incognito: false
    }, function (w) {
        window.curtab = w.tabs[0].id;
        $("#cookie_storage").data('complication', 0).attr('data-complication', 0);

        if ($("#cookie_storage").text().length <= 1) {
            newCookie();
        }

    });

});


chrome.tabs.onRemoved.addListener(function (tabId) {

    if (typeof window.curtab !== "undefined" && tabId == window.curtab) {
        delete window.curtab;
    }

});


chrome.webRequest.onBeforeRequest.addListener(function (details) {

    if (details.url.indexOf('recaptcha__ru.js') > -1 && details.tabId == window.curtab) {
        var redirectUrl = chrome.extension.getURL('js/recaptcha.js');
        return {redirectUrl: redirectUrl};
    }

}, {urls: ["<all_urls>"]}, ['blocking']);
*/
/*
 chrome.cookies.getAll({domain: ".google.com"}, function(c) {

 var cookies = [];

 for(var i=0; i<c.length;i++) {
 if (c[i]['domain'] == ".google.com" && c[i]['path'] == "/") {
 cookies.push(c[i]['name'] + '=' + c[i]['value']);
 }

 }

 console.log(JSON.parse(JSON.stringify(cookies)));


 });
 */


/*

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {

    if (details.tabId == window.curtab) {

        var headers = details.requestHeaders,
            blockingResponse = {};

        try {

            var Cookie = JSON.parse($("#cookie_storage").text()).join('; ');

            for (var i = 0, l = headers.length; i < l; ++i) {
                if (headers[i].name == 'Cookie') {
                    headers[i].value = Cookie;
                    break;
                }
            }


        } catch (e) {}


        blockingResponse.requestHeaders = headers;
        return blockingResponse;

    }

}, {
    urls: [
        "*://www.google.com/*/anchor*",
        "*://www.google.com/*/bframe*",
        "*://www.google.com/*/reload*"]
}, ['requestHeaders', 'blocking']);


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (typeof window.curtab !== "undefined" && window.curtab == sender.tab.id) {

        if (request.complication) {

            var maxComplication = 10;
            var cookie_storage = $("#cookie_storage");
            var complication = parseInt(cookie_storage.data('complication'));

            if (complication >= maxComplication) {
                newCookie();
            } else {

                if (request.complication == 1) {
                    cookie_storage.data('complication', 0).attr('data-complication', 0);
                }

                if (request.complication == 2 && complication < maxComplication) {
                    complication = complication + 1;
                    cookie_storage.data('complication', complication).attr('data-complication', complication);
                }

            }

        }

    }

});
*/
