<?php
	include("conectar.php"); 
   $link = Conectar();

   $usuario = addslashes($_POST['pUsuario']);
   $clave = md5(addslashes($_POST['pClave']));
   $Fecha = $_POST['pFecha'];

   $sql = "SELECT 
               Login.idLogin AS 'idLogin',
               Login.Usuario AS 'Usuario',
               Login.Estado AS 'Estado',
               Datos.Nombre AS 'Nombre',
               Datos.Correo AS 'Correo'
            FROM 
               Login,
               DatosUsuarios AS Datos
            WHERE 
               Datos.idLogin = Login.idLogin
               AND Login.Usuario = '$usuario' 
               AND Login.Clave = '" . md5(md5($clave)) . "';";

   $result = $link->query($sql);

   if ( $result->num_rows == 1)
   {
      class User
      {
         public $id;
         public $username;
         public $nombre;
         public $email;
         public $state;
         public $cDate;
         public $idUser;
      }
      

         $row = $result->fetch_assoc();
         $Users = new User();
         $Users->id = $row['idLogin'];
         $Users->username = $row['Usuario'];
         $Users->nombre = $row['Nombre'];
         $Users->email = $row['Correo'];
         $Users->state = $row['Estado'];
         $Users->cDate = $Fecha;
         $Users->idUser = $row['idLogin'];

         mysqli_free_result($result);  
         echo json_encode($Users);
   } else
   {
      echo 0;
   }
?>