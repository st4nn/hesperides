<?php
	include("conectar.php"); 
   $link = Conectar();

   $nombre = addslashes($_POST['nombre']);
   $descripcion = addslashes($_POST['descripcion']);
   
 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Actividades WHERE Nombre = '$nombre' OR Descripcion = '$descripcion'";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0)
   {
      echo "La Actividad ya existe";
   } else
   {
      $sql = "INSERT INTO Actividades 
                  (Nombre, Descripcion) 
               VALUES 
                  (
                     '$nombre', 
                     '$descripcion');";

      $link->query($sql);
         if ( $link->affected_rows > 0)
         {
            echo 1;
         } else
         {
            echo "Hubo un error desconocido";
         }
   }

?>