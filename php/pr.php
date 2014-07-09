<?php
	include("conectar.php"); 
   $link = Conectar();

   $obj = ["valor 1", "valor 2", "valor 3"];
   
   
       echo array_values($obj);
   
?>