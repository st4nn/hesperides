<?php
	include("conectar.php"); 
   $link = Conectar();

   $nombre = addslashes($_POST['nombre']);
   $correo = addslashes($_POST['correo']);
   $perfil = addslashes($_POST['perfil']);
   $usuario = addslashes($_POST['usuario']);
   $clave = md5(addslashes($_POST['clave']));
   $clave2 = md5(addslashes($_POST['clave2']));
   $empresa = addslashes($_POST['empresa']);
   
 
   $sql = "SELECT COUNT(*) AS 'Cantidad' FROM DatosUsuarios WHERE Correo = '$correo';";
   $result = $link->query($sql);

   $fila =  $result->fetch_array(MYSQLI_ASSOC);

   if ($fila['Cantidad'] > 0)
   {
      echo "El correo ya existe, por favor selecciona otro.";
   } else
   {
      if ($clave <> $clave2)
      {
         echo "Las claves no coinciden.";
      } else
      {
         $sql = "INSERT INTO Login 
                     (Usuario, Clave, Estado, idEmpresa) 
                  VALUES 
                     (
                        '$usuario', 
                        '" . md5(md5($clave)) . "', 
                        'Activo',
                        '$empresa');";

         $link->query($sql);
            if ( $link->affected_rows > 0)
            {
               $nuevoId = $link->insert_id;
               if ($nuevoId > 0)
               {
                  $sql = "INSERT INTO DatosUsuarios (idLogin, Nombre, Correo, idPerfil) 
                           VALUES 
                           (
                              '$nuevoId', 
                              '$nombre', 
                              '$correo',
                              '$perfil');";
                     $link->query($sql);
                     echo $link->affected_rows;   
               } else
               {
                  echo "Hubo un error desconocido";
               }
            } else
            {
               echo "Hubo un error desconocido";
            }
      }
   }

?>