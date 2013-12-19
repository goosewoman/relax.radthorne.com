<?php
header("content-type: application/json; charset=utf-8");
print json_encode(getSongsCache());
exit;