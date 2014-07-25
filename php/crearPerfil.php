<?php
	include("conectar.php"); 
   $link = Conectar();

   $nombre = addslashes($_POST['nombre']);
   $descripcion = addslashes($_POST['descripcion']);
   $items = addslashes($_POST['items']);
   
 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Perfiles WHERE Nombre = '$nombre' OR Descripcion = '$descripcion'";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0)
   {
      echo "El Perfil ya existe";
   } else
   {
      $sql = "INSERT INTO Perfiles 
                  (Nombre, Descripcion) 
               VALUES 
                  (
                     '$nombre', 
                     '$descripcion');";

      $link->query(utf8_decode($sql));
         if ( $link->affected_rows > 0)
         {
            $nuevoId = $link->insert_id;
               $idx = 0;
               $tmpItems = explode(",", $items);
               foreach ($tmpItems as $key => $value) 
               {
                  if ($value != "")
                  {
                     if ($idx == 0)
                     {
                        $sql = "('$nuevoId', '$value')";
                     } else
                     {
                        $sql .= ", ('$nuevoId', '$value')";
                     }
                     $idx++;
                  }
               }
               if ($idx > 0)
               {
                  $sql = "INSERT INTO Perfiles_has_Funciones (idPerfil, idFuncion) VALUES $sql;";
                  $link->query(utf8_decode($sql));
               }
            
            echo 1;
         } else
         {
            echo "Hubo un error desconocido";
         }
   }

?>