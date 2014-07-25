<?php
	include("conectar.php"); 
   $link = Conectar();

     class Datos
      {
         public $usuarios;
         public $empresas;
         public $pruebas;
         public $contratos;
      }
      

         
         $Data = new Datos();

         $sql = "SELECT 
               COUNT(*) AS 'Cantidad'
            FROM 
               Login;";

        $result = $link->query($sql);
        $row = $result->fetch_assoc();
        
         $Data->usuarios = $row['Cantidad'];

         $sql = "SELECT 
               COUNT(*) AS 'Cantidad'
            FROM 
               Empresas;";

        $result = $link->query($sql);
        $row = $result->fetch_assoc();

         $Data->empresas = $row['Cantidad'];

         $sql = "SELECT 
               COUNT(*) AS 'Cantidad'
            FROM 
               Actividades;";

        $result = $link->query($sql);
        $row = $result->fetch_assoc();

         $Data->pruebas = $row['Cantidad'];

         $sql = "SELECT 
               COUNT(*) AS 'Cantidad'
            FROM 
               Contratos;";

        $result = $link->query($sql);
        $row = $result->fetch_assoc();

         $Data->contratos = $row['Cantidad'];

         mysqli_free_result($result);  
         echo json_encode($Data);
?>