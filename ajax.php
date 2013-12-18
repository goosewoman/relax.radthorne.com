<?php
  $type = $_GET['type'];
  if($type == "title")
  {
    header( 'content-type: text/plain');
    $id = $_GET['video_id'];
    $content = file_get_contents("http://gdata.youtube.com/feeds/api/videos/$id?v=2&alt=json");
    $response_array = json_decode($content);
    foreach(get_object_vars($response_array->entry->title) as $title)
    {
      print $title;
    }
    exit;
  }

