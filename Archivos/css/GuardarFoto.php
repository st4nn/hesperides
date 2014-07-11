
  <table width="200" border="6" align="center">
    <tr>
      <td align="center"> <span class="textoTablasRojo">GUARDANDO <BR><img src="img/carga.gif" width="55" height="40" >&nbsp;</td>
    </tr>
  </table>
<?	 

include "include/VarGlobales.PHP"; 
require("include/BdSqlClases.php");

$q=new ConecteMysql($ServidorBD,$UsrBD,$ClaveBD,$NomBD);
$s=new ConecteMysql($ServidorBD,$UsrBD,$ClaveBD,$NomBD);

  $rutaInicio="Planos/Fotosvideos";

if($userfile_name<>"")
{
  if($DOC_DESCRIPCION<>"")$FV_DESCRIPCION="'".$DOC_DESCRIPCION."'";
  else $FV_DESCRIPCION='null';
  
   $tam=$HTTP_POST_FILES['userfile']['size'] ;
  $archi =date('Y-m-d H-i-s') . "_" . $userfile_name;
  $FV_TIPO='FOTO';
  $FV_TVIDEO='null';
  $de=$userfile;
}
if($userfile2<>"")
{
 if($DOC_DESCRIPCION2<>"")$FV_DESCRIPCION="'".$DOC_DESCRIPCION2."'";
 else $FV_DESCRIPCION='null';
 
 if($CLASEVIDEO<>"")$FV_TVIDEO="'".$CLASEVIDEO."'";
 else $FV_TVIDEO='null';
 
   $tam=$HTTP_POST_FILES['userfile2']['size'] ;
 
   $archi =date('Y-m-d H-i-s') . "_" . $userfile2_name;
  // echo "nombre de archivo= ".$userfile2_name."<br>";
  $FV_TIPO='VIDEO';
  $FV_TVIDEO='null';  
  $de=$userfile2;

}

if($userfile3<>"")
{
 if($DES3<>"")$FV_DESCRIPCION="'".$DES3."'";
 else $FV_DESCRIPCION='null';
  
  $tam=$HTTP_POST_FILES['userfile3']['size'] ;
 
   $archi =date('Y-m-d H-i-s') . "_" . $userfile3_name;
  // echo "nombre de archivo= ".$userfile2_name."<br>";
  $FV_TIPO='VIDEO';
  $de=$userfile3;
  $FV_TVIDEO="'FIRMA DIGITAL'";  

}

   $asubir=date(Y);
   $msubir=date(m);
   $dsubir=date(d);
   
 //  echo "dia ".$dsubir."<br>";
  $GE_NO_INSPECCION=$GE_NO_INSPECCION*1;
  //echo  $GE_NO_INSPECCION;
   if(!is_dir($rutaInicio."/".$asubir))
      mkdir ($rutaInicio."/".$asubir,0644);

  if(!is_dir($rutaInicio."/".$asubir."/".$msubir))
      mkdir ($rutaInicio."/".$asubir."/".$msubir,0644);

  if(!is_dir($rutaInicio."/".$asubir."/".$msubir."/".$dsubir))
      mkdir ($rutaInicio."/".$asubir."/".$msubir."/".$dsubir,0644);



  if(!is_dir($rutaInicio."/".$asubir."/".$msubir."/".$dsubir."/".$GE_NO_INSPECCION))
      mkdir ($rutaInicio."/".$asubir."/".$msubir."/".$dsubir."/".$GE_NO_INSPECCION,0644);

	  
  $M="";
  $ruta= $rutaInicio."/".$asubir."/".$msubir."/".$dsubir."/".$GE_NO_INSPECCION;
  $rutadestino=$ruta."/".$archi;
 // echo $rutadestino."<br>";
 // echo $de;
  $handle=@opendir($ruta);
 
  /*if($tam<1000000)
  {*/
    if (!file_exists($rutadestino))
    {  $M="Archivo copiado";
       if(!copy($de, $rutadestino))
       {
         $M="Archivo No copiado";
       }
    }
    else
    {
      $M="El archivo ya existe en esta ruta ".$rutadestino.". Cambie el nombre e intente de nuevo";
     }
    //echo $HTTP_POST_FILES['userfile']['size'] ;
    //echo $Men1."-".$Men;
  /*}
  else
  {
    $M="Archivo superior al tamaño permitido de 1M.";
   }*/
 //echo $M;
 if($M=="Archivo copiado")
 {
  if(file_exists($rutadestino))
  {
  
		$sql1="SELECT   1
			FROM         FOTOS_VIDEOS
		   WHERE 	GE_NO_INSPECCION=$GE_NO_INSPECCION and FV_NOMBRE='$archi'";
	  $q->ejecutar($sql1,248,'SubirPlano.php');	   
	  $Nofilas=$q->filas();	   
	  if($Nofilas==0)
	  {  // GE_FECHA,   $GE_FECHA,
	    $sql2="insert into FOTOS_VIDEOS ( GE_NO_INSPECCION, FV_RUTA, FV_NOMBRE, FV_DESCRIPCION, FV_TIPO, FV_TVIDEO)
					 VALUES($GE_NO_INSPECCION, '$ruta', '$archi', $FV_DESCRIPCION, '$FV_TIPO', $FV_TVIDEO) ";
	  
	  }
	  if($Nofilas==1)
	  {   // 
	     $sql2="update FOTOS_VIDEOS set FV_RUTA='$ruta',
		 						FV_DESCRIPCION=$FV_DESCRIPCION,
								FV_TIPO='$FV_TIPO',
								FV_TVIDEO=$FV_TVIDEO
	  		 WHERE 	GE_NO_INSPECCION=$GE_NO_INSPECCION and FV_NOMBRE='$archi'";
	  }
	  
	 // echo $sql2;
      $q->ejecutar($sql2,345,'SubirPlano.php');	  
  
  } //el earchivo existe
 }  //la m esta en blanco

 $q->ejecutar("SELECT   USB_HABILITAR
				FROM         IPAL_USUARIOS_BB
               WHERE  USB_CEDULA=$usr ", 107, "Principal.php");
 $q->Cargar();
 $USB_HABILITAR=$q->dato(0);
 $ENINICIO=1;
 if($USB_HABILITAR=='SI')
 {		
   $ENINICIO=0;
 }
 
?>
      <script language="JavaScript">
	  alert('<?=$tam." ".$M?>')
  location.href='<?=$EnviarA?>?usr=<?=$usr?>&us_menu=<?=$us_menu?>&GE_NO_INSPECCION=<?=$GE_NO_INSPECCION?>&Monstrar=<?=$Monstrar?>&ENINICIO=<?=$ENINICIO?>'
   </script>
<?