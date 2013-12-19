<?php
  require_once 'functions.php';

  $type = $_GET['type'];
  if ( $type == "title" )
  {
    header( 'content-type: text/plain' );
    print getTitle( $_GET['video_id'] );
    exit;
  }
  else if ( $type == "saveVolume" )
  {
    $volume = $_GET['volume'];
    if ( is_numeric( $volume ) )
    {
      saveVolume( $volume );
      print 1;
    }
    else
    {
      print 0;
    }
    exit;
  }
  else if ( $type == "getVolume" )
  {
    print getVolume();
    exit;
  }
  else if ( $type == "randomNumber" )
  {
    $max = $_GET['max'];
    if ( is_numeric( $max ) )
    {
      print rand( 0, $max );
    }
    else
    {
      print 0;
    }
    exit;
  }

