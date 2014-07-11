 $(document).on("ready", arranque);
 var IdUsuario;

function arranque()
{
	$("#secClaves").hide();
	var obj = GET('par').split("$");
	
	IdUsuario = obj[3];

	$('.password').pstrength();

	$.post("php/RecuperarClaveValidar.php", 
		{
			Parametro : GET('par')
		},
		function (data) 
		{
			if (data == 0) //El Link está vencido
		 	{
		 		$("#artResultado").html("El Link está vencido <br/> Ingrese aquí: <a href='clave.html'>Generar Nuevo Link</a> para generar un nuevo link.");
		 		
		 	}
		 	else if (data == 1) //El Usuario no es válido
		 	{
		 		$("#artResultado").html("El Link no es válido <br/> Ingrese aquí: <a href='clave.html'>Generar Nuevo Link</a> para generar un nuevo link.")
		 	}
		 	else //¿Json?
		 	{
		 		var mensaje;

		 		mensaje = "Bienvenido " + data.NickName;
		 		mensaje += "<br/><br/>Por favor ingrese la nueva clave";

		 		$("#artResultado").html(mensaje);
		 		$("#secClaves").show();
		 	}
		}
		,"json");
	
	$("#frmLogin").on('submit', frmLogin_Submit);
}
function frmLogin_Submit (argument) 
{
	argument.preventDefault();
	if ($("#txtCreatingUsersCreate_Password").val() != "")
	{	
		if ($("#txtCreatingUsersCreate_Password").val() == $("#txtCreatingUsersCreate_ReTypePassword").val())
		{
			$.post("php/CambiarClave.php",
				{
					IdUsuarioMaestro: 1,
					Id: IdUsuario,
					Clave: $("#txtCreatingUsersCreate_Password").val()
				});
			$("#alertEstadoLogin").text("La clave ha sido cambiada");
			$("#alertEstadoLogin").fadeIn(200).delay(1600).fadeOut(1200);
		} else
		{
			$("#alertEstadoLogin").text("Las claves deben coincidir");
			$("#alertEstadoLogin").fadeIn(200).delay(1600).fadeOut(1200);
		}
	} else
	{
		$("#alertEstadoLogin").text("La clave no puede estar vacía");
		$("#alertEstadoLogin").fadeIn(200).delay(1600).fadeOut(1200);
	}

}

HTTP_GET_VARS=new Array();
strGET=document.location.search.substr(1,document.location.search.length);
if(strGET!='')
    {
    gArr=strGET.split('&');
    for(i=0;i<gArr.length;++i)
        {
        v='';vArr=gArr[i].split('=');
        if(vArr.length>1){v=vArr[1];}
        HTTP_GET_VARS[unescape(vArr[0])]=unescape(v);
        }
    }

function GET(v) {
  if(!HTTP_GET_VARS[v]){return 'undefined';}
  return HTTP_GET_VARS[v];
}