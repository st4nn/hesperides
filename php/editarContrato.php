<?php
	include("conectar.php"); 
   $link = Conectar();

   $idContrato = addslashes($_POST['idContrato']);
   $nombre = addslashes($_POST['nombre']);
   $descripcion = addslashes($_POST['descripcion']);
   $fechaInicio = addslashes($_POST['fechaInicio']);
   $fechaTerminacion = addslashes($_POST['fechaTerminacion']);
   $valor = addslashes($_POST['valor']);
   $objeto = addslashes($_POST['objeto']);
   $responsabilidades = addslashes($_POST['responsabilidades']);
   $contratante = addslashes($_POST['contratante']);
   $contratista = addslashes($_POST['contratista']);
 
      $sql = "UPDATE Contratos SET
                  Nombre = '$nombre', 
                  Descripcion = '$descripcion',  
                  FechaInicio = '$fechaInicio', 
                  FechaTerminacion = '$fechaTerminacion', 
                  ValorContrato = '$valor', 
                  Objeto = '$objeto', 
                  Responsabilidades = '$responsabilidades', 
                  Contratante = '$contratante', 
                  Contratista = '$contratista'
            WHERE idContrato = '$idContrato';";

      $link->query(utf8_decode($sql));
         if ( $link->affected_rows > 0)
         {
            $nuevoId = $link->insert_id;
            echo 1;
         } else
         {
            echo "Hubo un error desconocido";
         }
?>