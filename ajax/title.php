<?php
  header( 'content-type: text/plain');
  print getTitle($_GET['video_id']);
  exit;