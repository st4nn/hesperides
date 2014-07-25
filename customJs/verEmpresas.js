function verEmpresas()
{
 $("#tblEmpresas").cargarEmpresas({idEmpresa: 0},function(Empresas)
          {
            $("#tblEmpresas tbody td").remove();
            var tds = "";
            var estado = "";
            $.each(Empresas, function (index, Empresa) 
            {
              tds += '<tr class="odd gradeX">';
                  tds += '<td>' + Empresa.idEmpresa + '</td>'
                  tds += '<td>' + Empresa.Nombre + '</td>'
                  tds += '<td>' + Empresa.Identificacion + '</td>'
                  tds += '<td>' + Empresa.Direccion + '</td>'
                  tds += '<td>' + Empresa.Telefono + '</td>'
                  tds += '<td>' + Empresa.Correo + '</td>'
                  tds += '<td class="hidden-phone">';
                  //tds += '   <div class="form-actions">';
                  tds += '     <button class="btn btn-primary"><i class="icon-copy icon-white"></i> Contratos</button>';
                  //tds += '     <button class="btn btn-info"><i class="icon-group icon-white"></i> Usuarios</button>';
                  //tds += '   </div></td>';
              tds += '</td></tr>';
            });
            $("#tblEmpresas tbody").append(tds);
            $("#tblEmpresas").crearTabla1({lblMenu : "Empresas por página"});
          });
}
$.fn.cargarEmpresas = function(options, callback)
      {
        var defaults =
        {
          idEmpresa : "0"
        }
        var options = $.extend(defaults, options);
        if (callback === undefined)
        {callback = function(){};}

      /*plugin*/
      
        $.post("php/cargarEmpresas.php", {usuario : Usuario.id},
          function(data, textStatus, xhr)
          {
            callback(data);
          },"json");
      /*plugin*/

      //Averigua si el parámetro contiene una función de ser así llamarla
        if($.isFunction(options.onComplete)) 
        {options.onComplete.call();}
      };