<?php
	function sqlite_open($location) 
	{ 
	    $handle = new SQLite3($location); 
	    return $handle; 
	} 
	function sqlite_query($dbhandle,$query) 
	{ 
	    $array['dbhandle'] = $dbhandle; 
	    $array['query'] = $query; 
	    $result = $dbhandle->query($query); 
	    return $result; 
	} 
	function sqlite_fetch_array(&$result,$type) 
	{ 
	    #Get Columns 
	    $i = 0; 
	    while ($result->columnName($i)) 
	    { 
	        $columns[ ] = $result->columnName($i); 
	        $i++; 
	    } 
	    
	    $resx = $result->fetchArray(SQLITE3_ASSOC); 
	    return $resx; 
	} 

	$caminodb = "db/prueba01.db"; 
	$db = sqlite_open($caminodb) or die("No puedo abrir la base de datos ");

	sqlite_query($db, "CREATE TABLE personas(id INTEGER PRIMARY KEY, nombre, apellidos)");

	
?>