<?php
  $max = $_GET['max'];
  if(is_numeric($max))
  {
    print rand(0, $max);
  }
  else
  {
    print 0;
  }
  exit;