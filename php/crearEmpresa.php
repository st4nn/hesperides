<?php
	include("conectar.php"); 
   $link = Conectar();

   $nombre = addslashes($_POST['nombre']);
   $identificacion = addslashes($_POST['identificacion']);
   $direccion = addslashes($_POST['direccion']);
   $telefono = addslashes($_POST['telefono']);
   $correo = addslashes($_POST['correo']);
   
 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Empresas WHERE Nombre = '$nombre' OR NID = '$identificacion'";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0)
   {
      echo "La Empresa ya existe";
   } else
   {
      $sql = "INSERT INTO Empresas 
                  (Nombre, NID, Direccion, Telefono, Correo) 
               VALUES 
                  (
                     '$nombre', 
                     '$identificacion', 
                     '$direccion', 
                     '$telefono', 
                     '$correo');";

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