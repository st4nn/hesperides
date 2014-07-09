<?php
	include("conectar.php"); 
   $link = Conectar();


   $sql = "SELECT * FROM Usuarios";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Usuario
      {
         public $idLogin;
         public $Usuario;
         public $Empresa;
         public $Nombre;
         public $Correo;
         public $Perfil;
         public $Estado;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Usuarios[$idx] = new Usuario();
            $Usuarios[$idx]->idLogin = utf8_encode($row['idLogin']);
            $Usuarios[$idx]->Usuario = utf8_encode($row['Usuario']);
            $Usuarios[$idx]->Nombre = utf8_encode($row['Nombre']);
            $Usuarios[$idx]->Empresa = utf8_encode($row['Empresa']);
            $Usuarios[$idx]->Correo = utf8_encode($row['Correo']);
            $Usuarios[$idx]->Perfil = utf8_encode($row['Perfil']);
            $Usuarios[$idx]->Estado = utf8_encode($row['Estado']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Usuarios);   
   } else
   {
      echo 0;
   }
?>