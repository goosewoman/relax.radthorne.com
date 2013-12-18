<?php
  //TODO: Add suggest a song.
  //TODO: Add select a song.
  //TODO: Social sharing buttons.
  //TODO: Make the page look nice.
  //TODO: Allow people to toggle random song on end of song.
  //FIXME: volume derping (volume*10+1 instead of volume+1)

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
<script src="js/songs.js" type="application/javascript"></script>
<script src="js/functions.js" type="application/javascript"></script>
<script src="js/listeners.js" type="application/javascript"></script>
<link rel="stylesheet" href="/css/main.css" type="text/css">
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

  function onYouTubeIframeAPIReady() {
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
      videoId: 'DIx3aMRDUL4',
      events: {
        'onReady': onBackgroundPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
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
      videoId: 'SDmbGrQqWog',
      events: {
        'onReady': onBackgroundPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

  }

  function onBackgroundPlayerReady(event) {
    event.target.playVideo();
  }

  // 4. The API will call this function when the video song is ready.
  function onPlayerReady(event) {
    var selected = "<?php echo $selected ?>";
    if (selected != "") {
      setSong(selected);
    }
    else {
      randomSong();
    }
    resetVolume();
  }

  // 5. The API calls this function when the song's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the song should play for six seconds and then stop.
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      restartVideo(event.target);
    }
  }

</script>
</head>
<body>
  <div id="topcenter">
    <div id="mask"></div>
    <div id="song"></div>
  </div>
  <div id="center">
    <div id="title">
      <br/>
      <a href="http://radthorne.com">radthorne.com</a><br/>
      <a href="javascript:randomSong();">Random song</a><br/>
      <a id="perma_link_a">Permalink:</a> <input type="text" id="perma_link"><br/>
      current song: <a id="current_song"></a><br/>

      <div id="controls">
        <input type="text" value="100" id="volume_box"/>
        <a class="controls" href="javascript:lowerVolume();">-</a>
        <input type="range" name="points" min="0" max="100" step="1" value="100" id="volume_slider"/>
        <a class="controls" href="javascript:raiseVolume();">+</a>
        <a class="controls" id="startplay" href="javascript:pauseOrPlay();"><img src="/img/pause.png"></a>
      </div>
    </div>
  </div>
  <div class="hidden">
    <div id="fireplace"></div>
    <div id="rainymood"></div>
  </div>


  <script></script>

</body>
</html>