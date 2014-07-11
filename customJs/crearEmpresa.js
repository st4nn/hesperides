function crearEmpresa()
{
  $("#frmCrearEmpresa").on("submit", function(evento)
    {
      evento.preventDefault();
      $.post("php/crearEmpresa.php",
      {
        nombre : $('#txtEmpresa_Nombre').val(),
        identificacion : $('#txtEmpresa_Identificacion').val(),
        direccion : $('#txtEmpresa_Direccion').val(),
        telefono : $('#txtEmpresa_Telefono').val(),
        correo : $('#txtEmpresa_Correo').val()
      }, function(data, textStatus, xhr)
      {
        if (data == 1)
        {
          Mensaje("Ok", "La Empresa ha sido almacenada.");    
        } else
        {
          Mensaje("Error", data);    
        }
      }).always(function() 
      {
        //Cuando Finaliza
      }).fail(function() {
        Mensaje("Error", "No fue posible almacenar la Empresa, por favor intenta nuevamente.");
      });
      
    });
}