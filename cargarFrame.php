<?php
  
  $fileName = $_POST['archivo'];
  if ($fileName == "" OR !file_exists($fileName))
  {
  	$fileName = "404.html";
  }
  $fp = fopen($fileName, "r");
  $content = fread($fp, filesize($fileName));
  fclose($fp);

  echo $content;
?>