<?php
	include("conectar.php"); 
   
   $idUsuario = addslashes($_POST['usuario']);

   include("datosUsuario.php"); 
   $Usuario = datosUsuario($idUsuario);

   $link = Conectar();

   $sql = "SELECT * FROM Perfiles WHERE idPerfil >= " . $Usuario->idPerfil . ";";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Perfil
      {
         public $idPerfil;
         public $Nombre;
         public $controlAsociado;
         public $Descripcion;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Perfiles[$idx] = new Perfil();
            $Perfiles[$idx]->idPerfil = utf8_encode($row['idPerfil']);
            $Perfiles[$idx]->Nombre = utf8_encode($row['Nombre']);
            $Perfiles[$idx]->Descripcion = utf8_encode($row['Descripcion']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Perfiles);   
   } else
   {
      echo 0;
   }
?>