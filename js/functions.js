function stopVideo()
{
    song.stopVideo();
}

function restartVideo(target)
{
    target.stopVideo();
    target.seekTo(0, false);
    target.playVideo();
}

var volume = 100;
var current = "";

function createURL(videoID)
{
    return "http://www.youtube.com/embed/" + videoID + "?wmode=opaque&autoplay=1&iv_load_policy=3&loop=1&enablejsapi=1&controls=0&showinfo=0&rel=0&vq=hd720&playlist=" + videoID;
}

function createNormalUrl(id)
{
    return "http://www.youtube.com/watch?v=" + id;
}

function randomSong()
{
    var rand = Math.floor(Math.random() * (videoIDs.length - 1));
    if (current == videoIDs[rand])
    {
        rand = Math.floor(Math.random() * (videoIDs.length - 1));
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
    jQuery("#perma_link").attr("value", createPermaLink(id));
    jQuery("#perma_link_a").attr("href", createPermaLink(id));
    song.loadVideoById(id, 0, 'hd720');
}

function getTotalVolume(id)
{
    if (id == "song")
    {
        return 100;
    }
    else if (id == "rainymood")
    {
        return 50;
    }
    else if (id == "fireplace")
    {
        return 90;
    }
    else
    {
        return 0;
    }
}

function saveVolume()
{

}

function setCurrentVolume(vol)
{
    if (vol > 100)
    {
        vol = 100;
    }
    if (vol < 0)
    {
        vol = 0;
    }
    jQuery("#volume_box").val(vol);
    jQuery("#volume_slider").val(vol);
    volume = vol;
    saveVolume();
    var dec = vol / 100;

    setVolume("song", getTotalVolume("song") * dec);
    setVolume("rainymood", getTotalVolume("rainymood") * dec);
    setVolume("fireplace", getTotalVolume("fireplace") * dec);
}

function lowerVolume()
{
    setCurrentVolume(volume - 1)
}

function raiseVolume()
{
    setCurrentVolume(volume + 1)
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
    setVolume("fireplace", 90);
    setVolume("rainymood", 50);
    setVolume("song", 100);
    jQuery("#volume_slider").val(100);
    jQuery("#volume_box").val(100);
}

function setTitle(id)
{
    jQuery.get("json.php", { video_id: id, type: "title" }, function (data)
    {
        jQuery("#current_song").text(data);
    });
}

function pauseOrPlay()
{
    var button = jQuery("#startplay").find("img");
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