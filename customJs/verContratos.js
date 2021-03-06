function verContratos()
{       
         // initiate layout and plugins
         $("#frmVerContratos .chosen").chosen();
         $('.tooltips').tooltip();

         $(".btnVerContrato_Archivos").live("click", verArchivos);
         $(".btnVerContrato_Detalles").live("click", editarContrato_);

         $("#txtVerContratos_BuscarPor").chosen().change(txtVerContratos_BuscarPor_Click);

         $("#btnVerContratos_Buscar").on("click", btnVerContratos_Buscar_Click);

}

function verArchivos()
{
    var Contrato = $(this).parent("div").parent("div").find("h4");
    var idContrato = $(this).attr("idContrato");

    
    $(this).cargarModulo({pagina : "verContratos_Archivos", titulo : "Archivos de " + $(Contrato).text(), icono : "icon-edit"}, function()
      {
        iniciarFinder(idContrato);      
      });
}
function cerrarPorlet_()
 {
      $("#txtVerContratos_ContenedorResultados .icon-chevron-down").on("click", ocultarPortlet);

     jQuery('#txtVerContratos_ContenedorResultados .icon-remove').on ("click", function () {
        jQuery(this).parent(".tools").parent(".widget-title").parent(".widget").remove();
    });
}
function ocultarPortlet()
{
    var obj = $(this).parent(".tools").parent(".widget-title").parent(".widget").find(".widget-body");
    if (jQuery(this).hasClass("icon-chevron-down")) {
        jQuery(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
        obj.slideUp(200);
    } else {
        jQuery(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
        obj.slideDown(200);
    }
}
function txtVerContratos_BuscarPor_Click(evento, Objeto)
{
$.each(Objeto, function(index, value)
  {
    var str = value + ", ";
    if (index == "selected")
    {
      $("#txtVerContratos_Parametros").val($("#txtVerContratos_Parametros").val() + str)
    } else
    {
      $("#txtVerContratos_Parametros").val($("#txtVerContratos_Parametros").val().replace(str, ""));
    }
  });
}

function btnVerContratos_Buscar_Click()
 {
    var pParametros = $("#txtVerContratos_Parametros").val();
    if (pParametros != "")
    {
        $.post("php/buscarContratos.php", {parametros: pParametros, criterio : $("#txtVerContratos_Criterio").val()}, function(data)
        {
          if (data == 0)
          {
            Mensaje("Hey", "No se encontraron resultados");
          } else
          {
            $("#txtVerContratos_ContenedorResultados div").remove();
            var tds = "";
            $.each(data, function(index, value)
              {
                  tds += '<div class="span4">';
                  tds += '<div class="widget">';
                  tds += '   <div class="widget-title">';
                  tds += '       <h4 idContrato="' + value.idContrato + '"><i class="icon-reorder"></i>' + value.Nombre + '</h4>';
                  tds += '       <span class="tools">';
                  tds += '          <a class="icon-chevron-down" href="javascript:;"></a>';
                  tds += '          <a class="icon-remove" href="javascript:;"></a>';
                  tds += '       </span>';
                  tds += '   </div>';
                  tds += '   <div class="widget-body">';
                  tds += '       <div>';
                  tds += '           <b>Descripción:</b>' + value.Descripcion + '<br />';
                  tds += '           <b>Objeto:</b>' + value.Objeto + '<br />';
                  tds += '           <b>Contratante:</b>' + value.Contratante + '<br />';
                  tds += '           <b>Contratista:</b>' + value.Contratista + '<br />';
                  tds += '       </div>';
                  tds += '   </div>';
                  tds += '   <div class="form-actions">';
                  tds += '     <button  class="btn btn-warning btnVerContrato_Archivos" idContrato="' + value.checkSum + '"><i class="icon-copy icon-white"></i> Archivos</button>';
                  tds += '     <button class="btn btn-info btnVerContrato_Detalles"><i class="icon-search icon-white"></i> Detalles</button>';
                  //tds += '     <button class="btn btn-primary"><i class="icon-legal icon-white"></i> Pruebas</button>';
                  tds += '   </div>';
                  tds += '</div>';
                  tds += '</div>';
              });

            $("#txtVerContratos_ContenedorResultados").append(tds);
            PortletDraggable.init();                    
            cerrarPorlet_();
          }

        }, 'json').always(function() 
        {
          //Cuando Finaliza
        }).fail(function() {
          Mensaje("Error", "No fue conectar con el Servidor");
        });
    } else
    {
      Mensaje("Hey", "Tienes que seleccionar por lo menos un parámetro");
    }
      
}
function editarContrato_()
{
  var Contrato = $(this).parent("div").parent("div").find("h4");
  var pIdContrato = $(Contrato).attr("idContrato");
   $(this).cargarModulo({pagina : "editarContrato", titulo : "Editar " + $(Contrato).text() ,icono : "icon-edit"}, function()
    {
      cargarDatosContrato(pIdContrato)
    });
}
function iniciarFinder(idContrato)
{
  if($('#verContratos_Archivos').elfinder('instance'))
    { $('#verContratos_Archivos').elfinder('destroy');}
              
    var elf = $('#verContratos_Archivos').elfinder({
          url : 'Archivos/php/connector.php?Contrato=' + idContrato,
          lang: 'es',  
          handlers:
          {
            upload : function(event) 
                { 
                  
                },
            open: function(event)
                { 
                  
                },
            rm : function(event)
                {
                  
                }
          }           
    }).elfinder('instance');
}