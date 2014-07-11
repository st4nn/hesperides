function verUsuarios()
{
 $("#tblUsuarios").cargarUsuarios({idUsuario: Usuario.id},function(Usuarios)
          {
            $("#tblUsuarios tbody td").remove();
            var tds = "";
            var estado = "";
            $.each(Usuarios, function (index, Usuario) 
            {
              estado = "success";
              if (Usuario.Estado != "Activo")
              {
                estado = "warning";
              }
              
              tds += '<tr class="odd gradeX">';
                  tds += '<td>' + Usuario.idLogin + '</td>'
                  tds += '<td>' + Usuario.Usuario + '</td>'
                  tds += '<td>' + Usuario.Empresa + '</td>'
                  tds += '<td>' + Usuario.Nombre + '</td>'
                  tds += '<td>' + Usuario.Correo + '</td>'
                  tds += '<td>' + Usuario.Perfil + '</td>'
                  tds += '<td class="hidden-phone"><span class="label label-' + estado + '">'+ Usuario.Estado +'</span></td>';
              tds += '</tr>';
            });
            $("#tblUsuarios tbody").append(tds);
            $("#tblUsuarios").crearTabla1({lblMenu : "Usuarios por página"});
          });
}
$.fn.cargarUsuarios = function(options, callback)
      {
        var defaults =
        {
          idUsuario : "0"
        }
        var options = $.extend(defaults, options);
        if (callback === undefined)
        {callback = function(){};}

      /*plugin*/
      
        $.post("php/cargarUsuarios.php", 
          {},
          function(data, textStatus, xhr)
          {
            callback(data);
          },"json");
      /*plugin*/

      //Averigua si el parámetro contiene una función de ser así llamarla
        if($.isFunction(options.onComplete)) 
        {options.onComplete.call();}
      };