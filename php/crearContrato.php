<?php
	include("conectar.php"); 
   $link = Conectar();

   $nombre = addslashes($_POST['nombre']);
   $descripcion = addslashes($_POST['descripcion']);
   $fechaInicio = addslashes($_POST['fechaInicio']);
   $fechaTerminacion = addslashes($_POST['fechaTerminacion']);
   $valor = addslashes($_POST['valor']);
   $objeto = addslashes($_POST['objeto']);
   $responsabilidades = addslashes($_POST['responsabilidades']);
   $contratante = addslashes($_POST['contratante']);
   $contratista = addslashes($_POST['contratista']);
 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM Contratos WHERE Nombre = '$nombre'";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0)
   {
      echo "El registro ya existe";
   } else
   {
      $sql = "INSERT INTO Contratos (
                  Nombre, 
                  Descripcion, 
                  FechaInicio, 
                  FechaTerminacion, 
                  ValorContrato, 
                  Objeto, 
                  Responsabilidades, 
                  Contratante, 
                  Contratista) 
            VALUES (
                  '$nombre', 
                  '$descripcion', 
                  '$fechaInicio', 
                  '$fechaTerminacion', 
                  '$valor', 
                  '$objeto', 
                  '$responsabilidades', 
                  '$contratante', 
                  '$contratista');";

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