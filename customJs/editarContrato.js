function editarContrato()
{
  $("#grpEditarContratoFechaInicio input, #grpEditarContratoFechaTerminacion input").datepicker("destroy");
    $("#grpEditarContratoFechaInicio input, #grpEditarContratoFechaTerminacion input").datepicker(
          {
            changeMonth: true,
            changeYear: true
          });

          $("#grpEditarContratoFechaInicio .add-on").on("click", function()
          {
            $("#grpEditarContratoFechaInicio input").datepicker("show");
          });
          $("#grpEditarContratoFechaTerminacion .add-on").on("click", function()
          {
            $("#grpEditarContratoFechaTerminacion input").datepicker("show");
          });

          $("#frmEditarContrato").on("submit", function(evento)
            {
              evento.preventDefault();
              $.post("php/editarContrato.php",
              {
                idContrato : $('#txtEditarContrato_idContrato').val(),
                nombre : $('#txtEditarContrato_Nombre').val(),
                descripcion : $('#txtEditarContrato_Descripcion').val(),
                fechaInicio : $('#txtEditarContrato_FechaInicio').val(),
                fechaTerminacion : $('#txtEditarContrato_FechaTerminacion').val(),
                valor : $('#txtEditarContrato_Valor').val(),
                objeto : $('#txtEditarContrato_Objeto').val(),
                responsabilidades : $('#txtEditarContrato_Responsabilidades').val(),
                contratante : $('#txtEditarContrato_Contratante').val(),
                contratista : $('#txtEditarContrato_Contratista').val()
              }, function(data, textStatus, xhr)
              {
                if (data == 1)
                {
                  Mensaje("Ok", "El contrato ha sido actualizado.");    
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
function cargarDatosContrato(pIdContrato)
{
  $.post("php/cargarContrato.php",
              {
                usuario : Usuario.id,
                idContrato : pIdContrato
              }, function(data, textStatus, xhr)
              {
                if (!isNaN(data.idContrato))
                {
                  $("#txtEditarContrato_idContrato").val(data.idContrato);
                  $("#txtEditarContrato_Nombre").val(data.Nombre);
                  $("#txtEditarContrato_Descripcion").val(data.Descripcion);
                  $("#txtEditarContrato_FechaInicio").val(data.FechaInicio);
                  $("#txtEditarContrato_FechaTerminacion").val(data.FechaTerminacion);
                  $("#txtEditarContrato_Valor").val(data.Valor);
                  $("#txtEditarContrato_Objeto").val(data.Objeto);
                  $("#txtEditarContrato_Responsabilidades").val(data.Responsabilidades);
                  $("#txtEditarContrato_Contratante").val(data.Contratante);
                  $("#txtEditarContrato_Contratista").val(data.Contratista);
                } else
                {
                  Mensaje("Error", data);    
                }
              }, "json").always(function() 
              {
                //Cuando Finaliza
              }).fail(function() {
                Mensaje("Error", "No fue posible cargar el contrato, por favor intenta nuevamente.");
              });
}