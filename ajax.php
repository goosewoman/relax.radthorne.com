<?php
  require_once 'functions.php';

  $type = $_GET['type'];
  if($type == "title")
  {
    header( 'content-type: text/plain');
    print getTitle($_GET['video_id']);
    exit;
  }

