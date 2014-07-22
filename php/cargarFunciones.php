<?php
	include("conectar.php"); 
   
   $idUsuario = addslashes($_POST['usuario']);

   include("datosUsuario.php"); 
   $Usuario = datosUsuario($idUsuario);

   $link = Conectar();

   $sql = "SELECT * FROM Funciones WHERE idFuncion IN (SELECT idFuncion FROM Perfiles_has_Funciones WHERE idPerfil = " . $Usuario->idPerfil . ");";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Funcion
      {
         public $idFuncion;
         public $Nombre;
         public $controlAsociado;
         public $Descripcion;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Funciones[$idx] = new Funcion();
            $Funciones[$idx]->idFuncion = utf8_encode($row['idFuncion']);
            $Funciones[$idx]->Nombre = utf8_encode($row['Nombre']);
            $Funciones[$idx]->controlAsociado = utf8_encode($row['ControlAsociado']);
            $Funciones[$idx]->Descripcion = utf8_encode($row['Descripcion']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Funciones);   
   } else
   {
      echo 0;
   }
?>