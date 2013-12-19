<?php
  $volume = $_GET['volume'];
  if(is_numeric($volume))
  {
    saveVolume($volume);
    print 1;
  }
  else
  {
    print 0;
  }
  exit;