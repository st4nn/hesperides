<?php 
function Conectar() 
{ 

   $link = new mysqli("localhost", "wspcolom_hesperi", "hesperides.7826", "wspcolom_hesperides");
   if ($link->connect_errno) 
   {
      echo "Error: (" . $link->connect_errno . ") " . $link->connect_error;
      exit(); 
   }

   return $link; 
} 

?>
