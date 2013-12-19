<?php
  require_once 'functions.php';

  $type = $_GET['type'];
  switch($type)
  {

  }



  if($type == "title")
  {
    require_once "ajax/title.php";
  }
  else if ($type == "saveVolume")
  {
    require_once "ajax/saveVolume.php";
  }
  else if ($type == "getVolume")
  {
    require_once "ajax/getVolume.php";
  }
  else if ($type == "randomNumber")
  {
    require_once "ajax/randomNumber.php";
  }

