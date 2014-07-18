function crearPerfil()
{
  $.post("php/cargarFunciones.php", {usuario : Usuario.id}, function(data)
    {
      var idx = 0;
      var tds = "";
      $.each(data, function(index, funcion)
        {
          tds += '<label class="checkbox line">';
          tds += '  <div class="checker" id="uniform-undefined">';
          tds += '    <span>';
          tds += '      <input type="checkbox" value="" style="opacity: 0;" idFuncion="' + funcion.idFuncion + '">';
          tds += '    </span>';
          tds += '  </div>';
          tds += '  <button class="btn badge btnCrearPerfil_FuncionDesc" nombre="' + funcion.Nombre + '" descripcion="' + funcion.Descripcion + '"><i class="icon-question-sign"></i></button>';
          tds += '   ' + funcion.Nombre + '';
          tds += ' </label>';
          idx++
        });
      if (idx == 0)
      {
        Mensaje("Error", "No fue posible cargar las Funciones, por favor actuliza la página.");
      } else
      {
        $("#grpCrearPerfil_Funciones label").remove();
        $("#grpCrearPerfil_Funciones").append(tds);
        checkUniform();

      }
    }, "json").always(function() 
      {
        //Cuando Finaliza
      }).fail(function() {
        Mensaje("Error", "No fue posible cargar las Funciones, por favor actuliza la página.");
      });
  
  $("#frmCrearPerfil").on("submit", function(evento)
    {
      evento.preventDefault();
      verFuncionesCheckeadas();
      if ($("#txtCrearPerfil_Funciones").val() == "")
      {
        Mensaje("Error", "Selecciona por lo menos una funcion");
      } else
      {
        $.post("php/crearPerfil.php",
        {
          nombre : $('#txtCrearPerfil_Nombre').val(),
          descripcion : $('#txtCrearPerfil_Descripcion').val(),
          items : $('#txtCrearPerfil_Funciones').val()
        }, function(data, textStatus, xhr)
        {
          if (data == 1)
          {
            Mensaje("Ok", "El Perfil ha sido almacenado.");    
          } else
          {
            Mensaje("Error", data);    
          }
        }).always(function() 
        {
          //Cuando Finaliza
        }).fail(function() {
          Mensaje("Error", "No fue posible almacenar el Perfil, por favor intenta nuevamente.");
        });
      }
    });

  $(".btnCrearPerfil_FuncionDesc").live("click", function(evento)
    {
      evento.preventDefault();
      Mensaje($(this).attr("nombre"), $(this).attr("descripcion"));
    });
}

function checkUniform()
{
  if (test = $("input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle)")) {
            test.uniform();
        }
}

function verFuncionesCheckeadas()
{
  var objCheck = $("#grpCrearPerfil_Funciones input:checked");
  $.each(objCheck, function(index, funcion)
    {
      if (index == 0)
      {
        $("#txtCrearPerfil_Funciones").val($(funcion).attr("idFuncion"));
      } else
      {
        $("#txtCrearPerfil_Funciones").val($("#txtCrearPerfil_Funciones").val() + "," + $(funcion).attr("idFuncion"));
      }
    });
}