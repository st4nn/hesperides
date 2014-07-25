function verPruebas()
{
 $("#tblPruebas").cargarPruebas({idPrueba: 0},function(Pruebas)
          {
            $("#tblPruebas tbody td").remove();
            var tds = "";
            var estado = "";
            $.each(Pruebas, function (index, Prueba) 
            {
              tds += '<tr class="odd gradeX">';
                  tds += '<td>' + Prueba.idPrueba + '</td>'
                  tds += '<td>' + Prueba.Nombre + '</td>'
                  tds += '<td>' + Prueba.Descripcion + '</td>'
                  tds += '<td class="hidden-phone"><button class="btn btn-primary btnVerPruebas"><i class="icon-legal icon-white"></i> Actividades</button>';
              tds += '</td></tr>';
            });
            $("#tblPruebas tbody").append(tds);
            $("#tblPruebas").crearTabla1({lblMenu : "Pruebas por página"});
          });
}
$.fn.cargarPruebas = function(options, callback)
      {
        var defaults =
        {
          idPrueba : "0"
        }
        var options = $.extend(defaults, options);
        if (callback === undefined)
        {callback = function(){};}

      /*plugin*/
      
        $.post("php/cargarPruebas.php", {usuario : Usuario.id},
          function(data, textStatus, xhr)
          {
            callback(data);
          },"json");
      /*plugin*/

      //Averigua si el parámetro contiene una función de ser así llamarla
        if($.isFunction(options.onComplete)) 
        {options.onComplete.call();}
      };