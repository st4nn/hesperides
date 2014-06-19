<?php
	include("conectar.php"); 
   $link = Conectar();

   $usuario = addslashes($_POST['pUsuario']);
   $estado = addslashes($_POST['pEstado']);
   
   if ($estado == "Todos")
   {
      $estado = "";
   } else
   {
      $estado = "AND Estado = '$estado'";
   }

   $sql = "SELECT * FROM Notificaciones WHERE idLogin = '$usuario' $estado ORDER BY Fecha DESC";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Notificacion
      {
         public $idNotificacion;
         public $Fecha;
         public $Icono;
         public $Texto;
         public $Estado;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Notificaciones[$idx] = new Notificacion();
            $Notificaciones[$idx]->idNotificacion = utf8_encode($row['idNotificacion']);
            $Notificaciones[$idx]->Fecha = utf8_encode($row['Fecha']);
            $Notificaciones[$idx]->Icono = utf8_encode($row['Icono']);
            $Notificaciones[$idx]->Texto = utf8_encode($row['Texto']);
            $Notificaciones[$idx]->Estado = utf8_encode($row['Estado']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Notificaciones);   
   } else
   {
      echo 0;
   }
?>