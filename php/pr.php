<?php
	include("conectar.php"); 
	include("datosUsuario.php"); 
   $link = Conectar();

   $Usuario = datosUsuario(1);
   
   echo $Usuario->idPerfil;
   
?>