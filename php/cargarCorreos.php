<?php
	include("conectar.php"); 
   $link = Conectar();

   $usuario = addslashes($_POST['pUsuario']);
   $estado = addslashes($_POST['pEstado']);
   $tipo = addslashes($_POST['pTipo']);
   
   if ($estado == "Todos")
   {
      $estado = "";
   } else
   {
      $estado = "AND Estado = '$estado'";
   }

   if ($tipo == "Recibidos")
   {
      $tipo = "idDestinatario = '$usuario'";
   } else
   {
      $tipo = "idRemitente = '$usuario'";
   }

   $sql = "SELECT * FROM Correos WHERE $tipo $estado ORDER BY Fecha DESC";
   $result = $link->query(utf8_decode($sql));

   if ( $result->num_rows > 0)
   {
      class Mensaje
      {
         public $idMensaje;
         public $idRemitente;
         public $nombreRemitente;
         public $idDestinatario;
         public $nombreDestinaraio;
         public $Fecha;
         public $Asunto;
         public $Estado;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Mensajes[$idx] = new Mensaje();
            $Mensajes[$idx]->idMensaje = utf8_encode($row['IdMensaje']);
            $Mensajes[$idx]->idRemitente = utf8_encode($row['idRemitente']);
            $Mensajes[$idx]->nombreRemitente = utf8_encode($row['Remitente']);
            $Mensajes[$idx]->idDestinatario = utf8_encode($row['idDestinatario']);
            $Mensajes[$idx]->nombreDestinaraio = utf8_encode($row['Destinatario']);
            $Mensajes[$idx]->Fecha = utf8_encode($row['Fecha']);
            $Mensajes[$idx]->Asunto = utf8_encode($row['Asunto']);
            $Mensajes[$idx]->Estado = utf8_encode($row['Estado']);

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Mensajes);   
   } else
   {
      echo 0;
   }
?>