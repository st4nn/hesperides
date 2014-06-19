<?php
	include("conectar.php"); 
   $link = Conectar();

   //Creación de Empresa de Administración
   $sql = "INSERT INTO `Empresas` (`idEmpresa`, `Nombre`, `NID`, `Direccion`, `Telefono`, `Correo`) VALUES ('1','Administración', 0, NULL, NULL, NULL);";
   $result = $link->query($sql);
   echo "<br />Primera Empresa Creada";
   
   //Creación del Administrador
   $sql = "INSERT INTO Login (idLogin, Usuario, Clave, Estado, idEmpresa) VALUES ('1', 'admin', '" . md5(md5('holamundo')) ."', 'Activo', '1');";  
   $result = $link->query($sql);
   echo "<br />Primer Usuario Creado";

   //Creación Perfil de Administrador
   $sql = "INSERT INTO `Perfiles` (`idPerfil`, `Nombre`, `Descripcion`) VALUES ('1', 'Administrador', 'Administrador del Sistema');";
   $result = $link->query($sql);
   echo "<br />Primer Perfil Creado";

   //Creación de Datos del Administrador
   $sql = "INSERT INTO `DatosUsuarios` (`idLogin`, `Nombre`, `Correo`, `idPerfil`) VALUES (1, 'Administrador', 'joespinosa@cra.com.co', 1);";
   $result = $link->query($sql);
   echo "<br />Datos de administrador creados";
?>