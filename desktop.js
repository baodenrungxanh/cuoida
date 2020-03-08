var thumbnailWidth = 155;
alert(123)
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