var thumbnailWidth = 155;
alert(123)

window.onerror = function () {
    alert("Error caught");
};

function displayAlbum(id) {

  
}

function displayVideo(id) {
    try {
        var videoData = $(`#news-${id} input[type='hidden']`).val();
        videoData = videoData.replace(/'/g, '"');
        videoData = JSON.parse(videoData);
        $(`#news-${id} video `).attr('src', videoData.source);
        $(`#news-${id} video `).attr('poster', videoData.poster);
        $(`#news-${id} video `).attr('height', $("#post-list").width() * videoData.height / videoData.width);

        $("video:not([parsed='true'])").each(function () {
            this.onloadedmetadata = function (e) {
                var height = $(this).height();

               

                try {
                    var os = new OnScreen({
                        tolerance: height / 2,
                        toggleClass: false
                    });

                  
                } catch (ess) {
                    alert(ess.message)
                }
            }
        });
    } catch (e) {
        alert(e.message)
    }
}

function convert(id) {
    try {
        document.getElementById("post-date-" + id).innerHTML = (moment(document.querySelector("div[id='id-" + id + "'] time").getAttribute("datetime")).startOf('minute ').fromNow());

    } catch (e) {
alert(e)
    }
}


