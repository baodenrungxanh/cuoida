alert(123)
var thumbnailWidth = 155;

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


            $(this).onScreen({
                tolerance: height / 2,
                toggleClass: false,
                doIn: function () {

                },
                doOut: function () {
                    this.pause();
                }
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
