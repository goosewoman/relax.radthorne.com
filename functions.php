<?php


  function getTitle($id)
  {
    $content = file_get_contents("http://gdata.youtube.com/feeds/api/videos/$id?v=2&alt=json");
    $response_array = json_decode($content);
    foreach(get_object_vars($response_array->entry->title) as $title)
    {
      return $title;
    }
    return "meep";
  }