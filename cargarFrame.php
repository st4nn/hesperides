<?php
  
  $fileName = $_POST['archivo'];
  $fp = fopen($fileName, "r");
  $content = fread($fp, filesize($fileName));
  fclose($fp);

  echo $content;
?>