<?php
	include("conectar.php"); 
   $link = Conectar();

   $nombre = addslashes($_POST['nombre']);
   $descripcion = addslashes($_POST['descripcion']);
   $tipoRespuesta = addslashes($_POST['tipoRespuesta']);
   $archivos = addslashes($_POST['archivos']);
   $observaciones = addslashes($_POST['observaciones']);
   $items = addslashes($_POST['items']);
   
 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Items WHERE Nombre = '$nombre' OR Descripcion = '$descripcion'";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0)
   {
      echo "La Actividad ya existe";
   } else
   {
      $sql = "INSERT INTO Items 
                  (Nombre, Descripcion, tipoItem, Archivo, Observaciones) 
               VALUES 
                  (
                     '$nombre', 
                     '$descripcion', 
                     '$tipoRespuesta',
                     '$archivos', 
                     '$observaciones');";

      $link->query($sql);
         if ( $link->affected_rows > 0)
         {
            $nuevoId = $link->insert_id;
            if ($tipoRespuesta == 2)
            {
               $idx = 0;
               $tmpItems = explode("#-", $items);
               foreach ($tmpItems as $key => $value) 
               {
                  if ($value != "")
                  {
                     if ($idx == 0)
                     {
                        $sql = "('$value', '$nuevoId')";
                     } else
                     {
                        $sql .= ", ('$value', '$nuevoId')";
                     }
                     $idx++;
                  }
               }
               if ($idx > 0)
               {
                  $sql = "INSERT INTO RespuestaMultiple (Nombre, idItem) VALUES $sql;";
                  $link->query($sql);
               }
            }

               echo 1;
         } else
         {
            echo "Hubo un error desconocido";
         }
   }

?>