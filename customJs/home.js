var Usuario = null;
$(document).on("ready", appReady);

function appReady()
{
  Usuario = JSON.parse(localStorage.getItem('hesPu'));  
  cagarBarraSuperior(Usuario);

  $("#sideMenu li").live("click", sideMenu);

  $("#btnEnviarCorreo").live('click', btnEnviarCorreo_Click);

  $("#tablaMensajes tr").live('click', verCorreo);
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
    $("#modulo").load($(this).attr("pagina") + ".html");

    $("#tituloDelModulo h4 span").text($(this).text());
    $("#tituloDelModulo h4 i").removeClass('*');
    $("#tituloDelModulo h4 i").addClass($(this).attr("icono"));
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