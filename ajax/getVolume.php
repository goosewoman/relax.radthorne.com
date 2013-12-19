<?php
  if(isset($_SESSION['volume']) && !empty($_SESSION['volume']))
  {
    print $_SESSION['volume'];
  }
  else
  {
    print 100;
  }
  exit;