function crearContrato()
{
  $("#grpContratoFechaInicio input, #grpContratoFechaTerminacion input").datepicker("destroy");
    $("#grpContratoFechaInicio input, #grpContratoFechaTerminacion input").datepicker(
          {
            changeMonth: true,
            changeYear: true
          });

          $("#grpContratoFechaInicio .add-on").on("click", function()
          {
            $("#grpContratoFechaInicio input").datepicker("show");
          });
          $("#grpContratoFechaTerminacion .add-on").on("click", function()
          {
            $("#grpContratoFechaTerminacion input").datepicker("show");
          });

          $("#frmCrearContrato").on("submit", function(evento)
            {
              evento.preventDefault();
              $.post("php/crearContrato.php",
              {
                nombre : $('#txtContrato_Nombre').val(),
                descripcion : $('#txtContrato_Descripcion').val(),
                fechaInicio : $('#txtContrato_FechaInicio').val(),
                fechaTerminacion : $('#txtContrato_FechaTerminacion').val(),
                valor : $('#txtContrato_Valor').val(),
                objeto : $('#txtContrato_Objeto').val(),
                responsabilidades : $('#txtContrato_Responsabilidades').val(),
                contratante : $('#txtContrato_Contratante').val(),
                contratista : $('#txtContrato_Contratista').val()
              }, function(data, textStatus, xhr)
              {
                if (data == 1)
                {
                  Mensaje("Ok", "El contrato ha sido almacenado.");    
                } else
                {
                  Mensaje("Error", data);    
                }
              }).always(function() 
              {
                //Cuando Finaliza
              }).fail(function() {
                Mensaje("Error", "No fue posible almacenar el contrato, por favor intenta nuevamente.");
              });
              
            });
}