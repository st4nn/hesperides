<?php
	include("conectar.php"); 
   $link = Conectar();

   $parametros = addslashes($_POST['parametros']);
   $criterio = addslashes($_POST['criterio']);

   $criterio = str_replace(" ", "%", $criterio);

   if ($parametros == "")
   {
      $condicion = "1";
   } else
   {
      $condicion = "";
      $tmpParametros = explode(", ", $parametros);
      foreach ($tmpParametros as $key => $value) 
      {
         if ($value != "")
         {
            if ($key > 0)
            {
               $condicion .= "OR $value LIKE '%$criterio%'";
            } else
            {
               $condicion = "$value LIKE '%$criterio%'";
            }
         }
      }
   }

   $sql = "SELECT 
            idContrato, 
            Nombre, 
            Descripcion, 
            Objeto, 
            Contratante, 
            Contratista 
         FROM Contratos WHERE $condicion";

   $result = $link->query(utf8_decode($sql));

   if ( $result->num_rows > 0)
   {
      class Contrato
      {
         public $idContrato;
         public $Nombre;
         public $Descripcion;
         public $Objeto;
         public $Contratante;
         public $Contratista;
      }
      
      $idx = 0;
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Contratos[$idx] = new Contrato();
            $Contratos[$idx]->idContrato = utf8_encode($row['idContrato']);
            $Contratos[$idx]->Nombre = utf8_encode($row['Nombre']);
            $Contratos[$idx]->Descripcion = utf8_encode($row['Descripcion']);
            $Contratos[$idx]->Objeto = utf8_encode($row['Objeto']);
            $Contratos[$idx]->Contratante = utf8_encode($row['Contratante']);
            $Contratos[$idx]->Contratista = utf8_encode($row['Contratista']);
            $Contratos[$idx]->checkSum = md5(utf8_encode($row['idContrato']));

            $idx++;
         }
         
            mysqli_free_result($result);  
            echo json_encode($Contratos);   
   } else
   {
      echo 0;
   }
?>