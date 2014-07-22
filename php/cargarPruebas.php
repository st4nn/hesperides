<?php
	include("conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['usuario']);
   include("datosUsuario.php"); 
   $Usuario = datosUsuario($idUsuario);


   $sql = "SELECT * FROM Actividades";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Actividad
      {
         public $idPrueba;
         public $Nombre;
         public $Descripcion;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Actividades[$idx] = new Actividad();
            $Actividades[$idx]->idPrueba = utf8_encode($row['idActividad']);
            $Actividades[$idx]->Nombre = utf8_encode($row['Nombre']);
            $Actividades[$idx]->Descripcion = utf8_encode($row['Descripcion']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Actividades);   
   } else
   {
      echo 0;
   }
?>