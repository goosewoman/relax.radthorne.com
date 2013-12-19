<?php
  session_start();

  function getTitle( $id )
  {
    $content        = file_get_contents( "http://gdata.youtube.com/feeds/api/videos/$id?v=2&alt=json" );
    $response_array = json_decode( $content );
    foreach ( @get_object_vars( $response_array->entry->title ) as $title )
    {
      return $title;
    }

    return "Title not found!";
  }

  function saveVolume( $volume )
  {
    $_SESSION['volume'] = $volume;
  }

  function getVolume()
  {
    if ( isset( $_SESSION['volume'] ) && !empty( $_SESSION['volume'] ) )
    {
      return $_SESSION['volume'];
    }
    else
    {
      return -1;
    }
  }

  function getSongs()
  {
    return array(
      "mLgQ3em2JYY",
      "xdbH0-9BDr0",
      "b27Gw1QxP0g",
      "D6KRIMASing",
      "AMvZXaTAiRw",
      "WIbUNfg_wmM",
      "F-4wUfZD6oc",
      "M4e3O8iLGIc",
      "Mmwv94WKmnI",
      "YoEMaWrQBQM",
      "6Graa_Vm5eA",
      "hhnZkNj7kAo",
      "z2Ky6OyjwbQ",
      "HWqKPWO5T4o",
      "O0i6YFrSs6c",
      "CubY4CcR3ls",
      "urM6m9p_gJ0",
      "ygMYvKNxXew",
      "mYKA-VokOtA",
      "kmrmHEzUQRs",
      "MCAybXN5ojA",
      "GfpLea9OurA",
      "pUZeSYsU0Uk",
      "DwHpDOWhkGk",
      "aiumJ_nDkhs"
    );
  }

  function getAllTitles()
  {
    $songs = array();
    foreach(getSongs() as $song)
    {
      $songs[$song] = getTitle($song);
    }
    return $songs;
  }

  function getSongsCache()
  {
    $filename = "songcache.txt";
    $filetime = filemtime($filename);
    $time_diff = time() - $filetime;
    if(!file_exists($filename) || $time_diff > 600)
    {
      $songs = getAllTitles();
      $serializedSongs = serialize($songs);
      file_put_contents("songcache.txt", $serializedSongs);
      return $songs;
    }
    else
    {
      $serializedSongs = file_get_contents("songcache.txt");
      $songs = unserialize($serializedSongs);
      return $songs;
    }
  }