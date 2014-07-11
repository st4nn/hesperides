 $(document).on("ready", arranque);

function arranque()
{
	$("#frmLogin").on('submit', frmLogin_Submit);
}
function frmLogin_Submit (argument) 
{
	argument.preventDefault();
	$.post("php/RecuperarClaveCorreo.php",
	{
		Username: $("#txtUsername").val(),
		Correo: $("#txtCorreo").val()
	},
	function (data) 
	{
	 	if (data == 0) //El Usuario no fue encontrado
	 	{

	 	}
	 	else if (data == 1) //No hay un correo registrado
	 	{

	 	}
	 	else //¿Json?
	 	{

	 	}

	}, "json");

}