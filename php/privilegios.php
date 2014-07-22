<?php
	include("conectar.php"); 
   $link = Conectar();

   $idUsuario = addslashes($_POST['usuario']);
   include("datosUsuario.php"); 
   $Usuario = datosUsuario($idUsuario);


   $sql = "SELECT ControlAsociado FROM Funciones WHERE idFuncion NOT IN (SELECT idFuncion FROM Perfiles_has_Funciones WHERE idPerfil = ". $Usuario->idPerfil . ")";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Privilegio
      {
         public $idFuncion;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Restriccion[$idx] = new Privilegio();
            $Restriccion[$idx]->idFuncion = utf8_encode($row['ControlAsociado']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Restriccion);   
   } else
   {
      echo 0;
   }
?>