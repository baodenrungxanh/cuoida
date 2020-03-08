/*
* onScreen 0.0.0
* Checks if matched elements are inside the viewport.
* Built on Mon Mar 09 2015 12:00:07
*
* Copyright 2015 Silvestre Herrera <silvestre.herrera@gmail.com> and contributors, Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* You can find a list of contributors at:
* https://github.com/silvestreh/onScreen/graphs/contributors
*/

!function (a) { a.fn.onScreen = function (b) { var c = { container: window, direction: "vertical", toggleClass: null, doIn: null, doOut: null, tolerance: 0, throttle: null, lazyAttr: null, lazyPlaceholder: "data:image/gif;base64,R0lGODlhEAAFAIAAAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQAAACwAAAAAEAAFAAACCIyPqcvtD00BACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIQTGCiywKPmjxUNhjtMlWrAgAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFEiyUf6wCEBHvLPemIHdTzCMDegkACH5BAkJAAYALAAAAAAQAAUAgoSChLS2tIyKjLy+vIyOjMTCxP///wAAAAMUWCQ09jAaAiqQmFosdeXRUAkBCCUAIfkECQkACAAsAAAAABAABQCDvLq83N7c3Nrc9Pb0xMLE/P78vL68/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCEwkCnKGbegvQn4RjGMx8F1HxBi5Il4oEiap2DcVYlpZwQAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCDwnCGHEcIMxPn4VAGMQNBx0zQEZHkiYNiap5RaBKG9EQAh+QQJCQAJACwAAAAAEAAFAIOEgoTMysyMjozs6uyUlpSMiozMzsyUkpTs7uz///8AAAAAAAAAAAAAAAAAAAAAAAAEGTBJiYgoBM09DfhAwHEeKI4dGKLTIHzCwEUAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCAQSTmMEGaco8+UBSACwWBqHxKOJYd+q1iaXFoRRMbtEQAh+QQJCQAIACwAAAAAEAAFAIO8urzc3tzc2tz09vTEwsT8/vy8vrz8+vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAEIhBJWc6wJZAtJh3gcRBAaXiIZV2kiRbgNZbA6VXiUAhGL0QAIfkECQkABgAsAAAAABAABQCChIKEtLa0jIqMvL68jI6MxMLE////AAAAAxRoumxFgoxGCbiANos145e3DJcQJAAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFFi6XCQwtCmAHbPVm9kGWKcEQxkkACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIRlI8SAZsPYnuJMUCRnNksWwAAOw==", debug: !1 }; return "remove" !== b && a.extend(c, b), "check" !== b && a.extend(c, b), this.each(function () { function d() { a(l).off("scroll.onScreen resize.onScreen"), a(window).off("resize.onScreen") } function e() { return z ? v < r - c.tolerance && m < v + t - c.tolerance : v < p - c.tolerance && v > -t + c.tolerance } function f() { return z ? v + (t - c.tolerance) < m || v > r - c.tolerance : v > p - c.tolerance || -t + c.tolerance > v } function g() { return z ? w < s - c.tolerance && n < w + u - c.tolerance : w < q - c.tolerance && w > -u + c.tolerance } function h() { return z ? w + (u - c.tolerance) < n || w > s - c.tolerance : w > q - c.tolerance || -u + c.tolerance > w } function i() { return x ? !1 : "horizontal" === c.direction ? g() : e() } function j() { return x ? "horizontal" === c.direction ? h() : f() : !1 } function k(a, b, c) { var d, e, f; return function () { e = arguments, f = !0, c = c || this, d || !function () { f ? (a.apply(c, e), f = !1, d = setTimeout(arguments.callee, b)) : d = null }() } } var l = this; if ("remove" === b) return void d(); var m, n, o, p, q, r, s, t, u, v, w, x = !1, y = a(this), z = a.isWindow(c.container), A = function () { if (z || "static" !== a(c.container).css("position") || a(c.container).css("position", "relative"), o = a(c.container), p = o.height(), q = o.width(), r = o.scrollTop() + p, s = o.scrollLeft() + q, t = y.outerHeight(!0), u = y.outerWidth(!0), z) { var d = y.offset(); v = d.top, w = d.left } else { var e = y.position(); v = e.top, w = e.left } if (m = o.scrollTop(), n = o.scrollLeft(), c.debug, i()) { if (c.toggleClass && y.addClass(c.toggleClass), a.isFunction(c.doIn) && c.doIn.call(y[0]), c.lazyAttr && "IMG" === y.prop("tagName")) { var f = y.attr(c.lazyAttr); f !== y.prop("src") && (y.css({ background: "url(" + c.lazyPlaceholder + ") 50% 50% no-repeat", minHeight: "5px", minWidth: "16px" }), y.prop("src", f).load(function () { a(this).css({ background: "none" }) })) } x = !0 } else j() && (c.toggleClass && y.removeClass(c.toggleClass), a.isFunction(c.doOut) && c.doOut.call(y[0]), x = !1); return "check" === b ? x : void 0 }; window.location.hash ? k(A, 50) : A(), c.throttle && (A = k(A, c.throttle)), a(c.container).on("scroll.onScreen resize.onScreen", A), z || a(window).on("resize.onScreen", A), "object" == typeof module && module && "object" == typeof module.exports ? module.exports = jQuery : "function" == typeof define && define.amd && define("jquery-onscreen", [], function () { return jQuery }) }) } }(jQuery);
//# sourceMappingURL=jquery.onscreen.min.js.map

var thumbnailWidth = 122;

function displayAlbum(id) {

    var albumString = $(`#news-${id} input[type='hidden'] `).val();
    albumString = albumString.replace(/'/g, '"');
    var albumItems = JSON.parse(albumString);

    var imgs = $(`#news-${id} div[class='story__thumb'] img`);
    for (var i = 0; i <= imgs.length - 1; i++) {
        var imgSrc = albumItems[i].replace("/w700", `/w${thumbnailWidth}`);
        imgs[i].setAttribute('src', imgSrc);
    }
}

function displayVideo(id) {
    var videoData = $(`#news-${id} input[type='hidden']`).val();
    videoData = videoData.replace(/'/g, '"');
    videoData = JSON.parse(videoData);
    $(`#news-${id} video `).attr('src', videoData.source);
    $(`#news-${id} video `).attr('poster', videoData.poster);
    $(`#news-${id} video `).attr('height', $("#post-list").width() * videoData.height / videoData.width);

    $("video:not([parsed='true'])").each(function () {
        this.onloadedmetadata = function (e) {

            var height = $(this).height();

            var os = new OnScreen({
                tolerance: height / 2,
                toggleClass: false
            });

            // Do something else when an element leaves
            os.on('leave', 'video', (element, event) => {
                element.pause();
            });
        }
    });
}

function convert(id) {
    document.getElementById("post-date-" + id).innerHTML = (moment(document.querySelector("div[id='id-" + id + "'] time").getAttribute("datetime")).startOf('minute ').fromNow());
}



var allowLoadMore = true;
var loadTimes = 0;
var nextLink = "";


$(document).ready(function () {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '126872728716487',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v6.0'
        });
    };

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 1500 && allowLoadMore) {
            requestLoadMore();
        }
    });

    $('#detail-modal').on('hidePrevented.bs.modal', function (e) {
        history.back();
    });
});

var autoReloadTimeout = null;
// Nếu isForceLoadMore == true, thì lần loadMore trước chưa hoàn tất cũng cho phép load more
function requestLoadMore(isForceLoadMore = false) {
    // Chỉ cho phép load-more khi lần load-more trước đã hoàn tất
    if (allowLoadMore == false && isForceLoadMore == false) return;

    allowLoadMore = false;

    $("#loader").show();

    var link = $("#next-button").val();

    $.get(link, function (response) {
        var responseDOM = $(response);

        $("#post-list").append(responseDOM.find("#post-list").html());
        $("#next-button").val(responseDOM.find("#next-button").val())

        eval(responseDOM.find("#ids").html());
    }).done(function () {
        loadTimes++;
        // Chỉ ẩn spinner khi đã load-more hoàn tất
        $("#loader").hide();

        var newLoadMoreLink = $("#next-button").val();
        if (newLoadMoreLink != '' && link != newLoadMoreLink) {
            allowLoadMore = true;
        }
    }).fail(function () {

        clearTimeout(autoReloadTimeout);
        autoReloadTimeout = null;
        autoReloadTimeout = setTimeout(function () {
            requestLoadMore(true);
        }, 1000);
    }).always(function () {
        ga('send', 'event', 'Timelines', 'Load more', loadTimes);
    });
}

$(document).on('click', 'a[class="story__link"], a[class="view-detail-anchor"]', function (e) {
    e.preventDefault();

    var url = this.getAttribute('href');
    var title = this.getAttribute('title');

    history.pushState({ page: 'detail', url: url, title: title }, "", url);

    document.title = title;

    viewDetail(url);
});

$(document).on('click', 'a[class*="facebook-share-button"]', function (e) {
    e.preventDefault();

    FB.ui({
        method: 'share',
        href: this.getAttribute('href')
    }, function (response) {
        ga('send', 'event', 'Share', 'Facebook', $(this).attr('href'));
    });
});

// Share bài viết facebook trên timeline
$(document).on('click', 'a[class="share-video-anchor"]', function (e) {
    e.preventDefault();

    var url = this.getAttribute('href');

    history.pushState({ page: 'share', url: url }, "", url);

    openShare(url);
});

function viewDetail(url) {
    $('#detail-modal').modal("show")
    $("#detail-modal .modal-body").html('<div class="d-flex justify-content-center loader"><span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Đang tải nội dung...</div>');

    $("#detail-modal .facebook-share-button")[0].setAttribute('href', url);
    $("#detail-modal .zalo-share-button")[0].setAttribute('data-href', url);
    ZaloSocialSDK.reload(); // Zalo sdk phải reload lại mới cập nhật data-href mới
    $.get(url, function (response) {
        var responseDOM = $(response);
        var content = responseDOM.find(".detail");
        $.each(content.find("img"), function (index, value) {
            value.src = value.src.replace('/w700/', `/w${window.innerWidth}/`);
        });

        $(responseDOM).remove(".share-container");

        $("#detail-modal .modal-body").html(content);
    }).done(function () {
    }).fail(function () {
        $('#detail-modal').modal("hide")
    }).always(function () {
    });
}

function openShare(url) {
    $("#share-modal .facebook-share-button")[0].setAttribute('href', url);
    $("#share-modal .zalo-share-button")[0].setAttribute('data-href', url);
    $("#share-modal").modal('show');
    ZaloSocialSDK.reload(); // Zalo sdk phải reload lại mới cập nhật data-href mới
}

var documentTitle = document.title;
window.addEventListener('popstate', (event) => {

    if (event.state != null && event.state != "") {
        if (event.state.page == "detail") {
            viewDetail(event.state.url, event.state.title);
        }

        if (event.state.page == "share") {
            openShare(event.state.url);
        }

        document.title = event.state.title;
    }
    else {
        $('#share-modal').modal("hide")
        $('#detail-modal').modal("hide")
        $("#detail-modal .modal-body").html('')
        document.title = documentTitle;
    }
});