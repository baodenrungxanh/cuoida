function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var a=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}function getRandomInt(e,t){return Math.floor(Math.random()*(t-e+1))+e}function extractThumbnail(e){for(var t="",a=!1,i=0;i<500;i++)if(a){if("'"==e[i]&&a)break;t+=e[i]}else"'"==e[i]&&(a=!0);return t}function getMetaContent(e){for(var t=document.getElementsByTagName("meta"),a=0;a<t.length;a++)if(t[a].getAttribute("property")===e)return t[a].getAttribute("content");return""}function listLoadMore(){allowLoadMore=!0,location.href.indexOf("/p/")>=0&&(allowLoadMore=!1),$(window).scroll(function(){$(window).scrollTop()+$(window).height()>$(document).height()-1500&&allowLoadMore&&requestLoadMore()})}displayNumber=8,loadTimes=0,postMaxPublished="",readDetaiTimes=0,isDetailAjaxPage=!1,channel=null!=getParameterByName("channel")?getParameterByName("channel"):"home",$(document).on("click touch",".fb-share, .zalo-share",function(){getMetaContent("og:title"),getMetaContent("og:description"),getMetaContent("og:url");var e=$(this).attr("data-type"),t=$(this).attr("data-href");getMetaContent("og:title");switch(window.ga&&window.ga("send",{hitType:"event",eventCategory:"mobile_"+e,eventAction:"share",eventLabel:getMetaContent("og:title")}),e){case"facebook":if("undefined"!==window.FB)window.FB.ui({method:"share",href:t},function(e){})}}),blurDate=new Date;var loadTimes=0;function requestLoadMore(){if(0!=allowLoadMore)if(allowLoadMore=!1,remainingHot>0)suggestHotArticle();else if(!(location.href.indexOf("/p/")>=0)){if(!nextLink)if(self.location.href.indexOf("/search/")<0){if(0!=loadTimes)return;"home"==channel?nextLink="https://www.cuoida.com/search/?start=0&max-results=5&q=label:funny|label:featured":"shortvideo"==channel&&(nextLink="https://www.cuoida.com/search/label/shortvideo/?start=0&max-results=6&q=shortvideo")}else if(0==loadTimes)nextLink=$("#next-button").attr("href")+"&m=1";else if(!nextLink)return;$("#loader").css("display","inline-block"),$.get(nextLink,function(response){var responseDOM=$(response);$.each(responseDOM.find("#post-list article"),function(e,t){var a=t.getAttribute("id").replace("id-","");displayedHotIdList.indexOf(a)>=0&&t.remove()}),$("#post-list").append(responseDOM.find("#post-list").html()),nextLink=responseDOM.find("#next-button").attr("href"),$("video:not([parsed='true'])").each(function(){this.onloadedmetadata=function(e){assignVideoHandler(this)}}),eval(responseDOM.find("#ids").html()),getArticleStatistics()}).done(function(){$("#loader").css("display","none"),loadTimes++,ga("send","event","Timelines","Load more",loadTimes),null!=autoReloadTimeout&&(clearTimeout(autoReloadTimeout),autoReloadTimeout=null)}).fail(function(){autoReloadTimeout=setTimeout(function(){requestLoadMore()},1e3)}).always(function(){allowLoadMore=!0})}}function assignVideoHandler(e){$(e).attr("parsed",!0),$(e).attr("loop",!0),$(e).attr("playsinline","playsinline");var t=$(e).height();$(e).onScreen({tolerance:t/2,toggleClass:!1,doIn:function(){},doOut:function(){this.pause()}})}function toggleSearchBar(){var e=document.getElementById("search-bar");"none"===e.style.display||""==e.style.display?(e.style.display="block",document.getElementById("search-box").focus()):e.style.display="none"}function closeShareMenu(){previousState="",$("#share-action-menu").removeClass("visible")}function openShareMenu(e,t=!0){previousState="share-dialog",t&&history.pushState({event:"share-dialog",url:e},null,"#share"),$("#share-action-menu").addClass("visible"),$("#facebook-share-anchor").attr("href",e),$("#direct-link-anchor").attr("href",e)}function openCommentDialog(e,t,a=!0){$("#close-popup").show(),previousState="view-comment",a&&history.pushState({event:"view-comment",url:e,id:t},null,e),"undefined"==typeof commentDialog&&(commentDialog=$("<div class='modal comments-dialog modal-full' tabindex='-1' role='dialog' data-backdrop='static' > <div class='modal-dialog' role='document'> <div class='modal-content'> <div class='modal-body'> <p>One fine body&hellip;</p> </div> </div> </div> </div>"),$("body").append(commentDialog)),$(commentDialog).find("div[class='modal-body']").html("<div id='ajax-fb-comment' ><div class='fb-comments' data-order-by='social' data-href='"+e+"' data-numposts='7'></div></div>"),commentDialog.modal("show"),FB.XFBML.parse(document.getElementById("ajax-fb-comment")),$("video[playing='true']").length>0&&$("video[playing='true']")[0].pause(),$.get("/feeds/posts/default/"+t+"?alt=json-in-script&callback=displayBuildinComment")}function displayBuildinComment(e){var t=e.entry.id.$t;t=t.split("-",t.lastIndexOf("-")+1)[2];var a=e.entry.content.$t.split("comments = ");if(a.length>=2){var i=a[1];i=i.replace("<\/script>",""),i=JSON.parse(i);for(var o="",n=0;n<i.length;n++){var s=i[n].avatar.split("/")[3];o+="<div class='media'><div class='mr-2'><img src='"+i[n].avatar+"'/></div><div class='media-body'><a href='https://www.facebook.com/"+s+"' class='name' target='_blank'>"+i[n].name+"</a><div class='comment-message'>"+i[n].message+"</div></div></div>"}o="<div class='top-comments comment-area-inner'>"+o+"</div>",$("#ajax-fb-comment").prepend(o)}}function getArticleStatistics(){if("undefined"!=typeof ids&&"shortvideo"!=channel){var currentIds=ids;if(void 0!==currentIds){for(var keyIndex=[],queryGraph="https://graph.facebook.com/?access_token=2265496703525899|auX-rFk0XjjhmrgJwI3Y_5OajtI&fields=engagement&ids=",i=0;i<currentIds.length;i++){var postUrl=$("#id-"+currentIds[i]+" .url").val();queryGraph+=postUrl+",",keyIndex.push(postUrl)}queryGraph=queryGraph.substring(0,queryGraph.length-1),$.ajax({url:queryGraph,type:"GET",success:function(data){for(var i=0;i<=keyIndex.length-1;i++){var record=data[keyIndex[i]];if(void 0!==record.engagement){if(null!=document.getElementById("total-share-"+currentIds[i])){var likeContent=0==record.engagement.share_count?"":record.engagement.share_count+" Chia sẽ";""!=likeContent&&($("#s-c-"+currentIds[i]).show(),document.getElementById("total-share-"+currentIds[i]).innerHTML="<a href='"+keyIndex[i]+"'>"+likeContent+"</a>",$("#total-share-"+currentIds[i]).addClass("has-share"))}if(null!=document.getElementById("total-comments-"+currentIds[i])&&record.engagement.comment_count>0){if($("#total-comments-"+currentIds[i]).addClass("has-comment"),eval("typeof article"+currentIds[i]+" != 'undefined'")&&eval("article"+currentIds[i]+".totalComments")>0){$("#total-comments-"+currentIds[i]).addClass("has-comment");var totalComments=record.engagement.comment_count+eval("article"+currentIds[i]+".totalComments");document.getElementById("total-comments-"+currentIds[i]).innerHTML=totalComments+" Bình luận"}}else eval("typeof article"+currentIds[i]+" != 'undefined'")&&eval("article"+currentIds[i]+".totalComments")>0&&($("#total-comments-"+currentIds[i]).addClass("has-comment"),document.getElementById("total-comments-"+currentIds[i]).innerHTML=eval("article"+currentIds[i]+".totalComments")+" Bình luận")}}}})}}}function parseDataFromRawString(e){var t=$(`#data-${e}`).val(),a=/source src=\"(.*?)\"/gm.exec(t),i=/img src=\"(.*?)\"/gm.exec(t),o=a[1],n=i[1],s=$(`a[data-id="${e}"]`)[0].href;return{title:$("#id-"+e+" .st")[0].innerText,url:s,videoLink:o,thumbnail:n}}function generateCarouselNextItem(){var e=parseDataFromRawString(getNearPostId(currentShortVideoId,"n")),t=`<div class="item"><div class="video-container"><video src="${e.videoLink}"  loop="loop" webkit-playsinline="true" playsinline="" ></video></div><div class="sb"><a class="shr" href="${e.url}">Chia sẻ</a><a href="${e.url}" class="cmt comment-button">B.luận</a> </div><div><div class="bottom"><div class="content"><div class="st">${e.title}</div></div></div></div></div>`;$(".owl-carousel").owlCarousel("add",t).owlCarousel("update")}function getNearPostId(e,t){var a;return"p"==t?(a=$("#id-"+e).prev()).length>0?a.attr("id").replace("id-",""):null:(a=$("#id-"+e).next()).length>0?a.attr("id").replace("id-",""):null}function viewVideo(e,t,a=!0){currentShortVideoId=t,previousState="view-video";var i="";a&&history.pushState({event:"view-video",id:currentShortVideoId},null,e);var o=getNearPostId(currentShortVideoId,"p");null!=o&&(i=`<div class="item"><div class="video-container"><video src="${(n=parseDataFromRawString(o)).videoLink}"  loop="loop" webkit-playsinline="true" playsinline="" ></video></div><div class="sb"><a class="shr" href="${n.url}">Chia sẻ</a><a href="${n.url}" class="cmt comment-button">B.luận</a> </div><div><div class="bottom"><div class="content"><div class="st">${n.title}</div></div></div></div></div>`);i+=`<div class="item"><div class="video-container"><video src="${(n=parseDataFromRawString(t)).videoLink}"  loop="loop" webkit-playsinline="true" playsinline="" ></video></div><div class="sb"><a class="shr" href="${n.url}">Chia sẻ</a><a href="${n.url}" class="cmt comment-button">B.luận</a> </div><div><div class="bottom"><div class="content"><div class="st">${n.title}</div></div></div></div></div>`;var n,s=getNearPostId(currentShortVideoId,"n");null!=s&&(i+=`<div class="item"><div class="video-container"><video src="${(n=parseDataFromRawString(s)).videoLink}"  loop="loop" webkit-playsinline="true" playsinline="" ></video></div><div class="sb"><a class="shr" href="${n.url}">Chia sẻ</a><a href="${n.url}" class="cmt comment-button">B.luận</a> </div><div><div class="bottom"><div class="content"><div class="st">${n.title}</div></div></div></div></div>`);$("#video-player-container .swiper-container").get(0).innerHTML=`<div class="owl-carousel owl-theme" id="video-carousel">${i}</div>`,carousel=$("#video-carousel"),carousel.owlCarousel({items:1,startPosition:null!=o?1:0,dots:!1,onDrag:function(e){},onTranslated:function(e){if($(`#id-${currentShortVideoId}`).nextAll().length<=6)requestLoadMore();else if(carouselCurrentIndex!=e.item.index){var t=getNearPostId(currentShortVideoId,"n");null!=t&&(currentShortVideoId=t,carouselCurrentIndex=e.item.index,$("video").each(function(){try{$(this).get(0).pause()}catch(e){console.log("loi")}}),lastVideoPlayPromise=$(`.owl-item:nth-child(${e.item.index+1}) video`)[0].play(),void 0!==lastVideoPlayPromise&&lastVideoPlayPromise.then(e=>{}).catch(e=>{console.log(e)}),$(e.target).find(".cover").hide(),generateCarouselNextItem())}},onInitialized:function(e){$(`.owl-item:nth-child(${e.item.index+1}) video`)[0].play()}}),$("#video-player-container").modal("show")}function closeVideo(){$("#video-player-container").modal("hide"),$("#video-carousel").remove()}function switchChannel(e,t=!1){"home"==e?$("#home-top-navigation").show():$("#home-top-navigation").hide(),previousState="switchChannel",$("#channel-navigation a[class='active']").removeClass("active"),$("a[data-channel='"+e+"']").addClass("active"),channel=e,0==t&&history.pushState({event:"switchChannel",channel:e},e,"https://www.cuoida.com?channel="+e),$("#post-list").empty(),"shortvideo"==e&&$("#post-list").addClass("row shortvideo-container"),loadTimes=0,nextLink="",requestLoadMore()}function suggestHotArticle(){$("#loader").css("display","inline-block");var hasHotArticle=!1,seenHotIds=null;if(void 0===window.localStorage.seenHotIds?(seenHotIds=[],window.localStorage.setItem("seenHotIds","")):seenHotIds=window.localStorage.seenHotIds.split(","),$.each($("article[data-hot='true']"),function(e,t){seenHotIds.indexOf(t.getAttribute("id"))<0&&seenHotIds.push(t.getAttribute("id").replace("id-","")),t.removeAttribute("data-hot")}),window.localStorage.setItem("seenHotIds",seenHotIds),location.href.indexOf("/search/")<0){if(location.href.indexOf(".html")>=0&&location.href.indexOf("/p/")>=0)return;var pendingIdList=hotIdList.filter(function(e){return-1==seenHotIds.indexOf(e)}),suggestIdList=[];if(suggestIdList=pendingIdList.length>=3?pendingIdList.slice(-3):pendingIdList,remainingHot=pendingIdList.length-suggestIdList.length,suggestIdList.length>0){hasHotArticle=!0;for(var searchQuery="",i=0;i<suggestIdList.length;i++)searchQuery+="label:"+suggestIdList[i]+"|",displayedHotIdList.push(suggestIdList[i]);seenHotIds=seenHotIds.concat(suggestIdList);var maxLength=20;seenHotIds.length>maxLength&&(seenHotIds=seenHotIds.slice(0-maxLength)),window.localStorage.setItem("seenHotIds",seenHotIds),$.get("https://www.cuoida.com/search?q="+searchQuery,function(response){var responseDOM=$(response);$("#post-list").append(responseDOM.find("#post-list").html()),$("#loading-placeholder").remove(),allowLoadMore=!0,suggestHotArticleTimes++,$("video:not([parsed='true'])").each(function(){this.onloadedmetadata=function(e){assignVideoHandler(this)}}),eval(responseDOM.find("#ids").html()),getArticleStatistics(),$("#loader").css("display","none")})}else allowLoadMore=!0,$("#loader").css("display","none")}else allowLoadMore=!0,$("#loader").css("display","none");return hasHotArticle}function parseAlbum(id){var maxHeight=0,comparationSize=500,parentWith=$("#id-"+id+" .content").width();parentWith>comparationSize&&(parentWith=comparationSize);var structure=$("#id-"+id+" input[name='structure']").val();structure=null==structure?eval("album"+id):JSON.parse(structure);var hiddenIndex=-1,hiddenItemCount=0;$.each(structure,function(e,t){0==t.hasOwnProperty("container")&&(-1==hiddenIndex&&(hiddenIndex=e-1),hiddenItemCount++)}),html="";var highestHeight=0;$.each(structure,function(e,t){if(t.hasOwnProperty("container")){var a=parentWith*t.container.top/comparationSize,i=parentWith*t.container.left/comparationSize,o=parentWith*t.container.width/comparationSize,n=parentWith*t.container.height/comparationSize,s=parentWith*t.img.top/comparationSize,l=parentWith*t.img.left/comparationSize,d=parentWith*t.img.width/comparationSize,r=parentWith*t.img.height/comparationSize,c="";hiddenIndex==e&&(c="<div class='albummore1'><div class='albummore12'><div class='albummore123'>+"+hiddenItemCount+"</div></div></div>"),n>highestHeight&&(highestHeight=n),a>0&&(maxHeight=parentWith),html+="<a href='javascript:viewAlbum(\""+id+'", '+e+")' class='anchor-to-album-detail'><div class='album-item'  style='top: "+a+"px;left: "+i+"px;width: "+o+"px;height: "+n+"px;'><img  style='top: "+s+"px;left: "+l+"px;height: "+r+"px;'  width='"+d+"px' height='"+r+"px;' src=' "+t.src+" 'class=' "+t.imgClass+"'/>"+c+"</div></a>"}}),html+="</div>",0==maxHeight&&(maxHeight=highestHeight),document.getElementById("album"+id).innerHTML="<div class='album-container' style='height: "+maxHeight+"px;width: "+parentWith+"px;'>"+html}function viewAlbum(id,photoIndex,manageState=!0){$("#close-popup").show();var postUrl=$("#id-"+id+" .url").val();previousState="view-album",manageState&&history.pushState({event:"view-album",id:id,photoIndex:photoIndex},null,postUrl+"#view-album"),"undefined"==typeof albumDialog&&(albumDialog=$("<div class='modal' tabindex='-1' role='dialog' id='album-modal'><div class='modal-dialog album-dialog' role='document'> <div class='modal-content'> <div class='modal-header'> <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button> </div> <div class='modal-body'> <p>One fine body&hellip;</p> </div> </div> </div> </div>"),$("body").append(albumDialog),$(albumDialog).on("hidden.bs.modal",function(e){null!=history.state&&"view-album"==history.state.event&&history.go(-1)}));var albumPosts=$("#id-"+id+" input[name='structure']").val();albumPosts=null==albumPosts?eval("album"+id):JSON.parse(albumPosts);var html="";$.each(albumPosts,function(e,t){html+="<div class='photo-item' id='album-photo-"+e+"'><img src='"+t.src+"'/></div>"}),html="<div class='row'><div class='col-md-6 left'>"+html+"</div><div class='col-md-6 right'><div id='ajax-fb-comment' ><div id='dialog-fb-comment'><div class='fb-comments' data-order-by='social' data-href='"+postUrl+"' data-numposts='7' ></div></div><div id='album-dialog-comment'></div></div></div></div>",$.get("/feeds/posts/default/"+id+"?alt=json-in-script&callback=displayAlbumDialogComment"),$(albumDialog).find("div[class='modal-body']").html(html),FB.XFBML.parse(document.getElementById("dialog-fb-comment")),albumDialog.modal("show");var scrollPos=$("#album-photo-"+photoIndex).position().top;$("#album-modal").scrollTop(scrollPos)}nextLink="",autoReloadTimeout=null,displayedHotIdList=[],suggestHotArticleTimes=0,remainingHot=0,history.scrollRestoration="manual",$(document).ready(function(){location.hostname.indexOf("ida")<0&&document.write(""),$("video").each(function(){this.setAttribute("preload","metadata")}),$("#post-list article").length>0&&getArticleStatistics(),listLoadMore(),window.onfocus=function(){((new Date).getTime()-blurDate.getTime())/1e3>300&&$("body").append("<a class='new-notification' href='javascript:location.reload()'><svg aria-hidden='true' data-prefix='fas' data-icon='arrow-up' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' class='svg-inline--fa fa-arrow-up fa-w-14 fa-2x'><path fill='currentColor' d='M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z' class=''></path></svg><span> Bài mới</span></a>")},window.onblur=function(){blurDate=new Date},$(document).on("click",'a[class*="button-share"]',function(e){e.preventDefault(),openShareMenu(this.getAttribute("href"))}),$(document).on("click",'a[class*="comment-button"]',function(e){e.preventDefault(),openCommentDialog(this.getAttribute("href"),this.getAttribute("data-id"))}),$(document).on("click","a[class='post-link']",function(e){e.preventDefault()}),$(document).on("click",'a[id*="facebook-share-anchor"],a[class*="shr"]',function(e){e.preventDefault();window.FB.ui({method:"share",href:$(this).attr("href")},function(e){alert("Cảm ơn bạn đã chia sẽ <3"),closeShareMenu()})}),$(".shade").on("click",function(){closeShareMenu()});suggestHotArticle();if(location.href.indexOf(".html")>0&&"undefined"!=typeof comments){for(var e="",t=0;t<comments.length;t++){var a=comments[t].avatar.split("/")[3];e+="<div class='media'><div class='mr-2'><img src='"+comments[t].avatar+"'/></div><div class='media-body'><a href='https://www.facebook.com/"+a+"' class='name' target='_blank'>"+comments[t].name+"</a><div class='comment-message'>"+comments[t].message+"</div></div></div>"}e="<div class='top-comments'>"+e+"</div>",$("#current-comment").html(e)}location.href.indexOf("/search/")<0&&location.href.indexOf(".html")<0&&switchChannel(channel),location.href.indexOf("/search/")<0&&location.href.indexOf(".html")>0&&requestLoadMore(),$("#channel-navigation a").on("click",function(e){e.preventDefault(),switchChannel(this.getAttribute("data-channel"))}),$(document).on("click",".view-video",function(e){e.preventDefault(),viewVideo(this.getAttribute("href"),this.getAttribute("data-id"))})}),lastVideoPlayPromise=null,currentShortVideoId="",carouselCurrentIndex=null,window.onpopstate=function(e){"view-comment"==previousState?($("video[playing='true']").length>0&&$("video[playing='true']")[0].play(),commentDialog.modal("hide"),$("#close-popup").hide(),previousState=e.state.event):"view-comment"==e.state.event?openCommentDialog(e.state.url,e.state.id,!1):"share-dialog"==previousState?(closeShareMenu(),previousState=e.state.event):"share-dialog"==e.state.event?openShareMenu(e.state.url,!1):"view-video"==previousState?(closeVideo(),previousState=e.state.event):"view-video"==e.state.event?this.viewVideo(e.state.url,e.state.id,!1):"view-album"==previousState?($("#close-popup").hide(),albumDialog.modal("hide"),albumDialog.modal("dispose"),albumDialog=void 0,$("#album-modal").remove(),previousState=e.state.event):"view-album"==e.state.event?this.viewAlbum(e.state.id,e.state.photoIndex,!1):"switchChannel"==previousState&&this.switchChannel(e.state.channel,!0)};