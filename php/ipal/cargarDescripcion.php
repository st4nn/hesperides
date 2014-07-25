<?php
	include("../conectar.php"); 
   
   $link = Conectar();

   $sql = "SELECT * FROM ipal_descripcion;";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Descripcion
      {
         public $id;
         public $Nombre;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Descripciones[$idx] = new Descripcion();
            $Descripciones[$idx]->id = utf8_encode($row['Numeral']);
            $Descripciones[$idx]->Nombre = utf8_encode($row['Titulo']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Descripciones);   
   } else
   {
      echo 0;
   }
?>