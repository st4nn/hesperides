function verContratos()
{

  //$("#txtVerContratos_BuscarPor").tagsInput({onAddTag : txtVerContratos_Parametros_Change});
	$("#objArchivos").on("click", verArchivos);
  
}
function txtVerContratos_Parametros_Change (argument) 
{
  console.log("obj");
}
function verArchivos()
{
	popupWin = window.open("Informe/index.html", 'open_window');
}