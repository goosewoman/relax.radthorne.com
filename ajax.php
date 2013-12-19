<?php
  require_once 'functions.php';

  $type = $_GET['type'];
  switch($type)
  {
    case "title": require_once "ajax/title.php"; break;
    case "saveVolume": require_once "ajax/saveVolume.php"; break;
    case "getVolume": require_once "ajax/getVolume.php"; break;
    case "randomNumber": require_once "ajax/randomNumber.php"; break;
    case "getSongs": require_once "ajax/getSongs.php"; break;
  }

