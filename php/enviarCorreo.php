<?php
	include("conectar.php"); 
   $link = Conectar();

   $usuario = addslashes($_POST['pUsuario']);
   $destinatario = addslashes($_POST['pDestinatario']);
   $fecha = addslashes($_POST['pFecha']);
   $asunto = addslashes($_POST['pAsunto']);

   $Mensaje = addslashes($_POST['pMensaje']);
   
   $sql = "INSERT INTO Mensajes 
               (IdMensaje, idRemitente, idDestinatario, Fecha, Asunto, Mensaje, Estado) 
            VALUES (
                     NULL, 
                     '$usuario', 
                     '$destinatario', 
                     '$fecha', 
                     '$asunto', 
                     '$Mensaje', 
                     'Pendiente');";
   
   $result = $link->query($sql);

   if ( $result->affected_rows > 0)
   {
      echo 1
   } else
   {
      echo 0;
   }
?>