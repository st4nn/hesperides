<?php
	include("conectar.php"); 
   $link = Conectar();

   $usuario = addslashes($_POST['usuario']);
   $idContrato = addslashes($_POST['idContrato']);
   
   $sql = "SELECT 
            * 
         FROM Contratos WHERE idContrato = '$idContrato'";

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
         public $checkSum;
         public $FechaInicio;
         public $FechaTerminacion;
         public $Valor;
         public $Responsabilidades;
      }
      
         while ($row = mysqli_fetch_assoc($result))
         { 
            $Contratos = new Contrato();
            $Contratos->idContrato = utf8_encode($row['idContrato']);
            $Contratos->Nombre = utf8_encode($row['Nombre']);
            $Contratos->Descripcion = utf8_encode($row['Descripcion']);
            $Contratos->Objeto = utf8_encode($row['Objeto']);
            $Contratos->Contratante = utf8_encode($row['Contratante']);
            $Contratos->Contratista = utf8_encode($row['Contratista']);
            $Contratos->checkSum = md5(utf8_encode($row['idContrato']));
            $Contratos->FechaInicio = utf8_encode($row['FechaInicio']);
            $Contratos->FechaTerminacion = utf8_encode($row['FechaTerminacion']);
            $Contratos->Valor = utf8_encode($row['ValorContrato']);
            $Contratos->Responsabilidades = utf8_encode($row['Responsabilidades']);
         }
         
            mysqli_free_result($result);  
            echo json_encode($Contratos);   
   } else
   {
      echo 0;
   }
?>