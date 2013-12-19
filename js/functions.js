// I don't want no ajax, I want sjax.


function restartVideo(target)
{
    target.stopVideo();
    target.seekTo(0, false);
    target.playVideo();
}

var fireVolume = 60;
var songVolume = 100;
var rainVolume = 20;


var volume = 70;
var current = "";

function createNormalUrl(id)
{
    return "http://www.youtube.com/watch?v=" + id;
}

function randomSong()
{
    var rand = getRandom(videoIDs.length - 1);
    if (current == videoIDs[rand])
    {
        rand = getRandom(videoIDs.length - 1);
    }
    current = videoIDs[rand];
    setSong(current)
}

function createPermaLink(id)
{
    return "http://relax.radthorne.com/?v=" + id;
}
function setSong(id)
{
    jQuery("#current_song").attr("href", createNormalUrl(id));
    setTitle(id);
    getSavedVolume();
    jQuery("#perma_link").attr("value", createPermaLink(id));
    jQuery("#perma_link_a").attr("href", createPermaLink(id));
    song.loadVideoById(id, 0, 'hd720');
}

function getTotalVolume(id)
{
    if (id == "song")
    {
        return songVolume;
    }
    else if (id == "rainymood")
    {
        return rainVolume;
    }
    else if (id == "fireplace")
    {
        return fireVolume;
    }
    else
    {
        return 0;
    }
}

function getSavedVolume()
{
    jQuery.get("ajax.php", { type: "getVolume" }, function (data)
    {
        if(data < 0)
        {
            data = 70;
        }
        setCurrentVolume(data);
    });
}

function getRandom(max)
{
    jQuery.ajaxSetup({ async: false });
    var rand = 0;
    jQuery.get("ajax.php", { type: "randomNumber", max: max }, function (data)
    {
        rand = data;
    });
    jQuery.ajaxSetup({async:true});
    return rand;
}

function saveVolume(vol)
{
    jQuery.get("ajax.php", { volume: vol, type: "saveVolume" }, function (data)
    {
        if(data < 1)
        {
            alert("error saving volume: "+vol);
        }
    });
}

function setCurrentVolume(vol)
{
    vol = parseInt(vol);
    if (vol > 100)
    {
        vol = 100;
    }
    if (vol < 0)
    {
        vol = 0;
    }
    volume = vol;
//    saveVolume(vol);
    var dec = vol / 100;
    jQuery("#volume_slider").val(vol);

    setVolume("song", getTotalVolume("song") * dec);
    setVolume("rainymood", getTotalVolume("rainymood") * dec);
    setVolume("fireplace", getTotalVolume("fireplace") * dec);
}

function setVolume(id, volume)
{
    document.getElementById(id).contentWindow.postMessage('{"event":"command","func":"setVolume","args":[' + volume + ']}', '*');
}

function pauseVideo(id)
{
    document.getElementById(id).contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}


function pauseAll()
{
    pauseVideo("fireplace");
    pauseVideo("song");
    pauseVideo("rainymood");
}

function playAll()
{
    playVideo("fireplace");
    playVideo("song");
    playVideo("rainymood");
}

function playVideo(id)
{
    document.getElementById(id).contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
}


function resetVolume()
{
    setCurrentVolume(50);
    jQuery("#volume_slider").val(50);
    jQuery("#volume_box").val(50);
}

function setTitle(id)
{
    jQuery.get("ajax.php", { video_id: id, type: "title" }, function (data)
    {
        jQuery("#current_song").text(data);
    });
}

function pauseOrPlay()
{
    var button = jQuery("#pauseplay").find("img");
    if (button.attr("src") == "/img/pause.png")
    {
        pauseAll();
        button.attr("src", "/img/play.png");
    }
    else
    {
        playAll();
        button.attr("src", "/img/pause.png");
    }
}
var boxHidden = true;

function showOrHideInfobox()
{
    if(boxHidden)
    {
        showBox()
    }
    else
    {
        hideBox();
    }
    boxHidden = !boxHidden;
}

function showBox()
{
    jQuery("#center").fadeIn(300);
}

function hideBox()
{
    jQuery("#center").fadeOut(300);

}