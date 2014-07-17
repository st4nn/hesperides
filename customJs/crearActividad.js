function crearActividad()
{
  $('.text-toggle-button').toggleButtons({
            width: 200,
            label: {
                enabled: "Si",
                disabled: "No"
            }
        });

  $("#frmCrearActividad").on("submit", function(evento)
    {
      evento.preventDefault();
      listarItems();
      var pArchivos = 0, pObservaciones = 0;

      if ($("#txtCrearActividad_Archivos").is(":checked"))
      {
        pArchivos = 1;
      }
      if ($("#txtCrearActividad_Observaciones").is(":checked"))
      {
        pObservaciones = 1;
      }
      
      $.post("php/crearActividad.php",
      {
        nombre : $('#txtCrearActividad_Nombre').val(),
        descripcion : $('#txtCrearActividad_Descripcion').val(),
        tipoRespuesta : $('#txtActividad_TipoRespuesta').val(),
        archivos : pArchivos,
        observaciones : pObservaciones,
        items : $('#txtCrearActividad_SeleccionMultiple').val()
      }, function(data, textStatus, xhr)
      {
        if (data == 1)
        {
          Mensaje("Ok", "La Actividad ha sido almacenada.");    
        } else
        {
          Mensaje("Error", data);    
        }
      }).always(function() 
      {
        //Cuando Finaliza
      }).fail(function() {
        Mensaje("Error", "No fue posible almacenar la Actividad, por favor intenta nuevamente.");
      });
      
    });

  $("#btnCrearActividad_AgregarItem").on("click", function()
    {
      var objInput_ = $(this).parent("div").find("input");
      var objInput =objInput_[0];

      if ($(objInput).val() != "")
      {
        var objTr = $("#tblCrearActividad_Items tbody").find("tr");
        var bandera = true;
        $.each(objTr, function(index, Objeto)
          {
            if ($(Objeto).text() == $(objInput).val())
              {
                bandera = false;
                Mensaje("Error", "El item ya está en su listado");
              }
          });
        if (bandera)
        {
          var tds = "<tr>";
          tds +=   "<td class='hidden-phone'>" + $(objInput).val() + "</td>";
          tds +=   "<td><button class='btn btn-danger btnCrearActividad_BorrarItem'><i class='icon-trash'></i></button></td>";
          tds += "</tr>";
          $("#tblCrearActividad_Items tbody").append(tds);
          $(objInput).val("");

        }
          
      }
    });

  $(".btnCrearActividad_BorrarItem").live("click", function(evento)
    {
      evento.preventDefault();
      $(this).parent("td").parent("tr").remove();
    });

  $("#txtActividad_TipoRespuesta").on("change", function()
  {
    if ($(this).val() == 2)
    {
      $("#grpSeleccionMultiple").slideDown();
    } else
    {
      $("#grpSeleccionMultiple").hide();
    }

  })
}
function listarItems()
{
  var objTr = $("#tblCrearActividad_Items tbody").find("tr");
  $("#txtCrearActividad_SeleccionMultiple").val("");
  $.each(objTr, function(index, Objeto)
    {
      $("#txtCrearActividad_SeleccionMultiple").val($("#txtCrearActividad_SeleccionMultiple").val() + $(Objeto).text() + "#-");
    }); 
}