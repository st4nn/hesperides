<?php 
include("conectar.php");    

	$link=Conectarse(); 

	$sql = "SELECT 
		p1.IdInspeccion AS 'IdInspeccion',
	    p3.Nombre AS 'Area',
	    p4.Nombre AS 'Tipo',
	    p1.CodigoInterno AS 'Bus',
	    p2.Em_Nombre AS 'Empresa',
	    p5.NickName AS 'Usuario'
	    FROM 
	    Inspecciones AS p1,
	    Empresas AS p2,
	    Departamento AS p3,
	    InspeccionesTipos AS p4,
	    DatosUsuarios AS p5
    WHERE
		p1.IdDepartamento = p3.IdDepartamento
		AND p1.idEmpresa = p2.Em_idEmpresa
		AND p1.InspeccionesTipo = p4.id
		AND p1.IdLogin = p5.idUsersData";
	
	$result = mysql_query($sql, $link);

	class Inspeccion
	{
		public $IdInspeccion;
		public $Area;
		public $Tipo;
		public $Bus;
		public $Empresa;
		public $Usuario;
	}

		$Index = 0;
	while($row = mysql_fetch_array($result))
	{ 
		$Inspecciones[$Index] = new Inspeccion();
		
		$Inspecciones[$Index]->IdInspeccion = $row['IdInspeccion'];
		$Inspecciones[$Index]->Area = utf8_encode($row['Area']);
		$Inspecciones[$Index]->Tipo = utf8_encode($row['Tipo']);
		$Inspecciones[$Index]->Bus = utf8_encode($row['Bus']);
		$Inspecciones[$Index]->Empresa = utf8_encode($row['Empresa']);
		$Inspecciones[$Index]->Usuario = utf8_encode($row['Usuario']);

		$Index++;	
	} 
	
	echo json_encode($Inspecciones);
		mysql_close($link); 
?> 
