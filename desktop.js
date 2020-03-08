var thumbnailWidth = 155;
alert(123)
function displayAlbum(id) {

  
}

function displayVideo(id) {
   
}

function convert(id) {
    try {
        document.getElementById("post-date-" + id).innerHTML = (moment(document.querySelector("div[id='id-" + id + "'] time").getAttribute("datetime")).startOf('minute ').fromNow());

    } catch (e) {
alert(e)
    }
}


