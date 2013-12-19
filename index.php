<?php

  //TODO: Add information button on the bottom right (contains credits and.. well. information)
  //TODO: Add suggest a song.
  //TODO: Social sharing buttons.
  //TODO: Allow people to toggle random song on end of song.
  //TODO: Add ambient sound control. (not important, so at the bottom of the list)

  header( "Content-type: text/html; charset=utf-8");

  $selected = '';
  if ( isset( $_GET['v'] ) && !empty( $_GET['v'] ) )
  {
    $selected = $_GET['v'];
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Relax</title>
    <script src="http://code.jquery.com/jquery-1.10.2.min.js" type="application/javascript"></script>
    <script src="js/functions.js" type="application/javascript"></script>
    <script src="js/listeners.js" type="application/javascript"></script>
    <script src="js/simple-slider.min.js" type="application/javascript"></script>

    <link rel="stylesheet" href="/css/main.css" type="text/css">
    <link rel="stylesheet" href="/css/simple-slider-volume.css" type="text/css">
    <script>
      var song;
      var fireplace;
      var rainymood;

      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube song)
      //    after the API code downloads.

      function onYouTubeIframeAPIReady()
      {
        rainymood = new YT.Player('rainymood', {
          height: '315',
          width: '560',
          playerVars: {
            wmode: 'opaque',
            autoplay: 1,
            iv_load_policy: 3,
            loop: 1,
            enablejsapi: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            vq: 'hd720'
          },
          videoId: 'lasWefVUCsI',
          events: {
            'onReady': onBackgroundPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        song = new YT.Player('song', {
          height: '315',
          width: '560',
          playerVars: {
            wmode: 'opaque',
            autoplay: 1,
            iv_load_policy: 3,
            loop: 1,
            enablejsapi: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            vq: 'hd720'
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
        fireplace = new YT.Player('fireplace', {
          height: '315',
          width: '560',
          playerVars: {
            wmode: 'opaque',
            autoplay: 1,
            iv_load_policy: 3,
            loop: 1,
            enablejsapi: 1,
            controls: 0,
            showinfo: 0,
            rel: 0,
            vq: 'hd720'
          },
          videoId: 'fsD1zoI7NYo',
          events: {
            'onReady': onBackgroundPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      function onBackgroundPlayerReady(event)
      {
        event.target.playVideo();
      }

      function onPlayerReady(event)
      {
        setCurrentVolume(getSavedVolume());
        var selected = "<?php echo $selected ?>";
        if (selected != "")
        {
          setSong(selected);
        }
        else
        {
          randomSong();
        }
      }

      function onPlayerStateChange(event)
      {
        if (event.data == YT.PlayerState.ENDED)
        {
          nextVideo(event.target);
        }
      }

    </script>
  </head>
  <body>
    <div id="constructionHeader">
      THIS WEBPAGE IS CURRENTLY UNDER CONSTRUCTION
    </div>
    <div id="topTitle">
      <div id="title">
        <a id="current_song"></a><br/>
      </div>
    </div>
    <div id="topcenter">
      <div id="mask"></div>
      <div id="song"></div>
    </div>

    <div id="controls">
      <span class="controls" id="pauseplay" href="#"><img src="/img/pause.png"></span>
      <input type="text" data-slider="true" data-slider-theme="volume" value="0.7"  data-slider-highlight="true" data-slider-range="0,100" data-slider-step="1" data-slider id="volume_slider"/>
      <span class="controls" id="next" href="#"><img src="/img/next.png"></span>
      <span class="controls" id="list" href="#"><img src="/img/list.png"></span>
      <span class="controls" id="info" href="#"><img src="/img/info.png"></span>
    </div>

    <div id="infoBox">
      <label for="perma_link">Permalink:</label><br />
      <input name="perma_link" type="text" id="perma_link" readonly="readonly"><br/>
    </div>
    <div id="listBox">
      <select id="song_select"></select><br />
      <button id="song_select_button">Select</button><br />
      <span>Or select your own song from youtube!</span><br />
      <input type="text" id="youtubeVideo" placeholder="insert youtube url or video ID">
      <button id="youtubeVideo_button">Select</button>
    </div>
    <div class="hidden">
      <div id="fireplace"></div>
      <div id="rainymood"></div>
    </div>
  </body>
</html>