<?php
  $max = $_GET['max'];
  if(is_numeric($max))
  {
    print mt_rand(0, $max);
  }
  else
  {
    print 0;
  }
  exit;