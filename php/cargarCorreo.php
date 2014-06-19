<?php
	include("conectar.php"); 
   $link = Conectar();

   $idMensaje = addslashes($_POST['pIdMensaje']);
   
   $sql = "SELECT * FROM Correos WHERE idMensaje = '$idMensaje';";
   $result = $link->query($sql);

   if ( $result->num_rows > 0)
   {
      class Mensaje
      {
         public $idMensaje;
         public $nombreRemitente;
         public $nombreDestinaraio;
         public $Fecha;
         public $Asunto;
         public $Mensaje;
      }

      $row = mysqli_fetch_assoc($result);
      
      $Mensajes = new Mensaje();
      $Mensajes->idMensaje = utf8_encode($row['IdMensaje']);
      $Mensajes->nombreRemitente = utf8_encode($row['Remitente']);
      $Mensajes->nombreDestinaraio = utf8_encode($row['Destinatario']);
      $Mensajes->Fecha = utf8_encode($row['Fecha']);
      $Mensajes->Asunto = utf8_encode($row['Asunto']);
      $Mensajes->Mensaje = utf8_encode($row['Mensaje']);
         
            mysqli_free_result($result);  
            echo json_encode($Mensajes);   
   } else
   {
      echo 0;
   }
?>