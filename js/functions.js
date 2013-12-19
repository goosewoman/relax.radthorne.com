// I don't want no ajax, I want sjax.

var videoIDs = [];
var repeat = true;
function nextVideo(target)
{
    if(repeat)
    {
        restartVideo(target)
    }
    else
    {
        //next video code here
    }
}

function restartVideo(target)
{
    target.stopVideo();
    target.seekTo(0, false);
    target.playVideo();
}

var fireVolume = 60;
var songVolume = 100;
var rainVolume = 40;


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
    volume = getSavedVolume();
    setCurrentVolume(volume);
    jQuery("input[id=perma_link]").val(createPermaLink(id));
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
    jQuery.ajaxSetup({ async: false });
    var vol = volume;
    jQuery.get("ajax.php", { type: "getVolume" }, function (data)
    {
        if(data < 0)
        {
            vol = 70;
        }
        else
        {
            vol = data;
        }
    });
    jQuery.ajaxSetup({async:true});
    return vol;
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


function initVolumeSaveTask()
{
    var t = setInterval(
        function()
        {
            var vol = getSavedVolume();
            if(vol != volume)
            {
                saveVolume(volume);
            }
        },
        5000
    );
}

function initSongs()
{
    jQuery.get("ajax.php", { type: "getSongs" },
        function (data)
        {
            for (var key in data)
            {
                if (data.hasOwnProperty(key))
                {
                    videoIDs.push(key);
                    appendToSelect("song_select", key, data[key]);
                }
            }
        }
    );
}

function appendToSelect(selectId, optionKey, optionValue)
{
    jQuery("#"+selectId).append(
        jQuery("<option></option>")
        .attr("value",optionKey)
        .text(optionValue)
    );
}

var listBoxHidden = true;

function showOrHideListbox()
{
    if(listBoxHidden)
    {
        if(!infoBoxHidden)
        {
            jQuery("#infoBox").fadeOut(500, function(){
                jQuery("#listBox").fadeIn(500);
            });
            infoBoxHidden = true;
        }
        else
        {
            jQuery("#listBox").fadeIn(500);
        }
        listBoxHidden = false;
    }
    else
    {
        jQuery("#listBox").fadeOut(500);
        listBoxHidden = true;
    }
}

var infoBoxHidden = true;

function showOrHideInfobox()
{
    if(infoBoxHidden)
    {
        if(!listBoxHidden)
        {
            jQuery("#listBox").fadeOut(500, function(){
                jQuery("#infoBox").fadeIn(500);
            });
            listBoxHidden = true;
        }
        else
        {
            jQuery("#infoBox").fadeIn(500);
        }
        infoBoxHidden = false;
    }
    else
    {
        jQuery("#infoBox").fadeOut(500);
        infoBoxHidden = true;
    }
}

function getURLParameter(name, url)
{
    KeysValues = url.split(/[\?&]+/);
    for (i = 0; i < KeysValues.length; i++) {
        KeyValue = KeysValues[i].split("=");
        if (KeyValue[0] == name) {
            return KeyValue[1];
        }
    }
    return "";
}