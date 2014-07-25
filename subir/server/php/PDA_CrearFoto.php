<?php 
	include("conectar.php"); 

	$Parametros = $_POST['Parametros'];
 	
 	$arrInspeccion = explode("-.-", $Parametros);

 	$Prefijo = $arrInspeccion[0];
 	$Usuario = $arrInspeccion[1];
 	$Fecha = $arrInspeccion[2];
 	$imagen64 = str_replace(" ", "+", $arrInspeccion[3]);

 	$Nombre1 = "PDAImagen_" . date('Y_m_d_h_i_s'). ".png";
 	$Nombre = $Prefijo . "_PDAImagen_" . date('Y_m_d_h_i_s'). ".png";

 	$imagen64 = base64_decode($imagen64);

	$im = imagecreatefromstring($imagen64);
	if ($im != false) 
	{
    	header('Content-Type: image/png');
    	imagepng($im, "../Tools/subir/server/php/files/" . $Nombre);
    	imagedestroy($im);
	}

 	
	$link=Conectarse(); 
	
	$sql = "
		INSERT INTO 
			Archivos (Nombre, IdLogin, Prefijo, Fecha)
		VALUES
			(
				'$Nombre1',   
				'$Usuario',
				'$Prefijo',
				'$Fecha'
			);";
				
	mysql_query($sql, $link); 			
	mysql_close($link); 
?> 
