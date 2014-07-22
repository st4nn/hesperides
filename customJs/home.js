var Usuario = null;

$(document).on("ready", appReady);

function appReady()
{
  Usuario = JSON.parse(localStorage.getItem('hesPu'));  
  cagarBarraSuperior(Usuario);

  $("#btnEnviarCorreo").live('click', btnEnviarCorreo_Click);

  $("#tablaMensajes tr").live('click', verCorreo);

  //$("#modulo").load("Inicio.html");
  cargarModulo("Inicio", "Inicio", "icon-dashboard");
  //$("#tituloDelModulo h4 span").text("Inicio");
}

function cagarBarraSuperior(pUsuario)
{

  $("#header").load("header.html", function()
    {
      $(".username").text(pUsuario.nombre);
    });
  $("#sideMenu").load("menu.html", function()
    {
      App.init();
      $("#sideMenu li").on("click", sideMenu);
    });

  hacerPush();
}

$.fn.cargarCorreos = function(options, callback)
      {
        var defaults =
        {
          idUsuario : "0",
          Estado: 'Pendiente',
          Tipo: ''
        }
        var options = $.extend(defaults, options);
        if (callback === undefined)
        {callback = function(){};}

      /*plugin*/
      
        $.post("php/cargarCorreos.php", 
          {pUsuario : options.idUsuario, pEstado: options.Estado, pTipo : options.Tipo},
          function(data, textStatus, xhr)
          {
            callback(data);
          },"json");
      /*plugin*/

      //Averigua si el parámetro contiene una función de ser así llamarla
        if($.isFunction(options.onComplete)) 
        {options.onComplete.call();}
      };
$.fn.cargarNotificaciones = function(options, callback)
      {
        var defaults =
        {
          idUsuario : "0",
          Estado: 'Pendiente'
        }
        var options = $.extend(defaults, options);
        if (callback === undefined)
        {callback = function(){};}

      /*plugin*/
      
        $.post("php/cargarNotificaciones.php", 
          {pUsuario : options.idUsuario, pEstado: options.Estado},
          function(data, textStatus, xhr)
          {
            callback(data);
          },"json");
      /*plugin*/

      //Averigua si el parámetro contiene una función de ser así llamarla
        if($.isFunction(options.onComplete)) 
        {options.onComplete.call();}
      };

function sideMenu(event)
{
  if (!($(this).hasClass('has-sub')))
  {
    cargarModulo($(this).attr("pagina"), $(this).text(), $(this).attr("icono"));
    
  }  
}
function hacerPush (argument) 
{
  $("#desplegableCorreos").cargarCorreos({idUsuario: Usuario.id, Estado: 'Pendiente', Tipo : 'Recibidos'}, 
    function(Correos)
    {
      $(".lblContadorMensajes").hide();
      var s_ = "";

      var tds = "<li><p>Tienes <span class='lblContadorMensajes'>0</span> nuevo"+ s_ + " mensaje" + s_ +"</p></li>";
      $.each(Correos, function(index, value)
        {
          if (Correos.length > 1)
          { s_ = "s"; }

          if (index < 5)
          {
            tds += "<li><a href='#'>";
            //tds += '<span class="photo"><i class="icon-envelope"></i></span>';
            //tds += '<span class="photo"><img src="./img/avatar-mini.png" alt="avatar"></span>';
            
            tds += '<span class="subject">';
            tds += '  <span class="from">' + value.nombreRemitente + '</span><br />';

            tds += '  <span class="time">' + value.Fecha + '</span><br />';
            tds += '</span>';
            tds += '<span class="message">' + value.Asunto + '</span>';
            tds += '</a></li>';
          }
        });
      //tds += "<li><a href='inbox.html'>Ver todos los mensajes</a></li>";
      $("#desplegableCorreos").append(tds);
      if (Correos.length > 0)
      {
        $(".lblContadorMensajes").text(Correos.length);  
        $(".lblContadorMensajes").show();
      }
      
    });

  $("#desplegableNotificaciones").cargarNotificaciones({idUsuario: Usuario.id, Estado: 'Pendiente'}, 
    function(Notificaciones)
    {
      $(".lblContadorNotificaciones").hide();
      var s_ = "";
      var es_ = "";

      var tds = "<li><p>Tienes <span class='lblContadorNotificaciones'>0</span> nueva"+ s_ + " Notificacion" + es_ + "</p></li>";
      $.each(Notificaciones, function(index, value)
        {
          if (Notificaciones.length > 1)
          { s_ = "s"; es_ = "es"}

          if (index < 5)
          {
            tds += "<li><a href='#'>";
           
            tds += '<span class="label label-important"><i class="' + value.Icono + '"></i> </span>';
            tds += value.Texto + "<br/>";
            tds += '<span class="small italic">' + value.Fecha + '</span>';
            tds += '</a></li>';
          }
        });
      //tds += "<li><a href='#''>Ver todas las notificaciones</a></li>";
      $("#desplegableNotificaciones").append(tds);
      if (Notificaciones.length > 0)
      {
        $(".lblContadorNotificaciones").text(Notificaciones.length);  
        $(".lblContadorNotificaciones").show();
      }
      
    });
}

$.fn.crearTabla1 = function(options, callback)
{
  var idTabla = $(this).attr("id");
  var defaults =
  {
    lblMenu : "Registros por página"
  }
  var options = $.extend(defaults, options);
  if (callback === undefined)
  {callback = function(){};}

/*plugin*/

  $('#' + idTabla).dataTable().fnDestroy();
  $('#' + idTabla).dataTable({
            "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ " + options.lblMenu + "",
                "oPaginate": {
                    "sPrevious": "Ant",
                    "sNext": "Sig"
                }
            },
            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }]
        });

        jQuery('#' + idTabla + ' .group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).attr("checked", true);
                } else {
                    $(this).attr("checked", false);
                }
            });
            jQuery.uniform.update(set);
        });

        jQuery('#' + idTabla + '_wrapper .dataTables_filter input').addClass("input-medium"); // modify table search input
        jQuery('#' + options.idTabla + '_wrapper .dataTables_length select').addClass("input-mini"); // modify table per page dropdown
/*plugin*/

//Averigua si el parámetro contiene una función de ser así llamarla
  if($.isFunction(options.onComplete)) 
  {options.onComplete.call();}
};
function btnEnviarCorreo_Click(event) 
{
  event.preventDefault();
  console.log($("#txtEnviarMensaje").val());
}
function verCorreo()
{
  $("#txtIdMensaje").val($(this).attr('idMensaje'));
}
function Mensaje(Titulo, Mensaje)
{
  $.gritter.add({
        title: Titulo,
        text: Mensaje
      });
}
function cargarModulo(pagina, titulo, icono)
{
  var texto = titulo;
  titulo = "modulo_" + titulo.replace(" ", "_");
  titulo = titulo.replace(".", "_");
  var tds = "";
  $(".widget-body").slideUp();
  $(".icon-chevron-up").removeClass("icon-chevron-up").addClass("icon-chevron-down");

  if ($('#' + titulo).length)
  {
     $('#' + titulo).show('slide');
     $("#" + titulo + " .widget-body").slideDown();
     $("#" + titulo + " .icon-chevron-down").removeClass("icon-chevron-down").addClass("icon-chevron-up");
  } else
  {
    tds +='<div id="' + titulo + '" class="">';
    tds +='  <div class="widget">';
    tds +='        <div class="widget-title">';
    tds +='           <h4><i class="' + icono + '"></i><span>Cargando...</span></h4>';
    tds +='           <span class="tools">';
    tds +='           <a href="javascript:;" class="icon-chevron-up btnMinimizar"></a>';
    tds +='           <a class="icon-remove btnCerrar" href="javascript:;"></a>';
    tds +='           </span>';
    tds +='        </div>';
    tds +='        <div class="widget-body">';
    tds +='        </div>';
    tds +='  </div>';
    tds +='</div>';
    
    $("#contenedorModulos").append(tds);  
    $.post("cargarFrame.php", {archivo: pagina + ".html"}, 
      function(data)
      {
        $("#" + titulo + " .widget-body").html(data);  
        //$("#" + titulo + " .widget-body").html("<h1>Listo</h1>");
      }, "html").always(function()
      {
          $("#" + titulo + " .widget-title h4 span").text(texto);
          /*$("#" + titulo + " .widget-title h4 i").removeClass('*');
          $("#" + titulo + " .widget-title h4 i").addClass(icono);        
          */

          minimizarPorlet(titulo);
          cerrarPorlet(titulo);
      });
  }
  if (pagina == "Inicio")
  {
    cargarInicio();
  }
}
function minimizarPorlet(id)
{
  //jQuery('#' + id + ' .widget .tools .icon-chevron-down, #' + id + '.widget .tools .icon-chevron-up').on("click", function () {
  jQuery('#' + id + ' .btnMinimizar').on("click", function () {
            var el = $("#" + id + " .widget-body");
            var objTitulo = $("#" + id + " .btnMinimizar");
            if (jQuery(objTitulo).hasClass("icon-chevron-down")) {
                jQuery(objTitulo).removeClass("icon-chevron-down").addClass("icon-chevron-up");
                el.slideDown(200);
            } else {
                jQuery(objTitulo).removeClass("icon-chevron-up").addClass("icon-chevron-down");
                el.slideUp(200);
            }
        });
  $("#" + id + " .widget-title").on("dblclick", function(event) 
  {
      var el = $("#" + id + " .widget-body");
            var objTitulo = $("#" + id + " .btnMinimizar");
            if (jQuery(objTitulo).hasClass("icon-chevron-down")) {
                jQuery(objTitulo).removeClass("icon-chevron-down").addClass("icon-chevron-up");
                el.slideDown(200);
            } else {
                jQuery(objTitulo).removeClass("icon-chevron-up").addClass("icon-chevron-down");
                el.slideUp(200);
            }
  });
}
function cerrarPorlet(id)
{
  jQuery('#' + id + ' .btnCerrar').on("click", function () 
    {
        jQuery('#' + id).hide('slide');
    });
}
function cargarInicio()
{
  $.post('php/cargarEstadisticas_Inicio.php', function(data, textStatus, xhr) 
            {
                $("#txtEstadisticas").slideDown();
                $("#txtThick_Usuarios").val(data.usuarios);
                $("#txtThick_Empresas").val(data.empresas);
                $("#txtThick_Pruebas").val(data.pruebas);
                $("#txtThick_Contratos").val(data.contratos);

                $("#txtNum_Usuarios").text("+" + data.usuarios);
                $("#txtNum_Empresas").text("+" + data.empresas);
                $("#txtNum_Pruebas").text("+" + data.pruebas);
                $("#txtNum_Contratos").text("+" + data.contratos);

            }, 'json').always(function() 
              {
                $(".knob").knob();
                //Cuando Finaliza
              }).fail(function() {
                Mensaje("Error", "No hay conexión con el servidor");
                $("#txtEstadisticas").slideUp();
                $("#txtError").slideDown();
              });
}