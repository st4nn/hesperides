function crearUsuario()
{
  $.post("php/cargarPerfiles.php", {usuario : Usuario.id}, function(data)
    {
      var idx = 0;
      var tds = "";
      $.each(data, function(index, perfil)
        {
          tds += '<option value="' + perfil.idPerfil + '">' + perfil.Nombre + '</option>';

          idx++
        });
      if (idx == 0)
      {
        Mensaje("Error", "No fue posible cargar los Perfiles, por favor actuliza la página.");
      } else
      {
        $("#txtCrearUsuario_Perfil option").remove();
        $("#txtCrearUsuario_Perfil").append(tds);
      }
    }, "json").always(function() 
      {
        $.post("php/cargarEmpresas.php", {usuario : Usuario.id}, function(data)
        {
          var idx = 0;
          var tds = "";
          $.each(data, function(index, empresa)
            {
              tds += '<option value="' + empresa.idEmpresa + '">' + empresa.Nombre + '</option>';

              idx++
            });
          if (idx == 0)
          {
            Mensaje("Error", "No fue posible cargar las Empresas, por favor actuliza la página.");
          } else
          {
            $("#txtCrearUsuario_Empresa option").remove();
            $("#txtCrearUsuario_Empresa").append(tds);
          }
        }, "json").always(function() 
          {
            $("#frmCrearUsuario .chosen").chosen();
          }).fail(function() {
            Mensaje("Error", "No fue posible cargar las Empresas, por favor actuliza la página.");
          });
      }).fail(function() {
        Mensaje("Error", "No fue posible cargar los Perfiles, por favor actuliza la página.");
      });

  
      
  
  
  $("#frmCrearUsuario").on("submit", function(evento)
    {
      evento.preventDefault();
      if ($("#txtCrearUsuario_Perfil").val() == "")
      {
        Mensaje("Error", "Por favor selecciona el Perfil");
        $("#txtCrearUsuario_Perfil").focus();
      } else
      {
        if ($("#txtCrearUsuario_Empresa").val() == "")
        {
          Mensaje("Error", "Por favor selecciona la Empresa");
          $("#txtCrearUsuario_Empresa").focus();
        } else
        {
          if ($("#txtCrearUsuario_Clave").val() != $("#txtCrearUsuario_Clave2").val())
          {
            Mensaje("Error", "Las claves no coinciden");
            $("#txtCrearUsuario_Clave").focus();
          } else
          {
            $.post("php/crearUsuario.php",
            {
              nombre : $('#txtCrearUsuario_Nombre').val(),
              correo : $('#txtCrearUsuario_Correo').val(),
              perfil : $('#txtCrearUsuario_Perfil').val(),
              usuario : $('#txtCrearUsuario_Usuario').val(),
              clave : $('#txtCrearUsuario_Clave').val(),
              clave2 : $('#txtCrearUsuario_Clave2').val(),
              empresa : $('#txtCrearUsuario_Empresa').val()
            }, function(data, textStatus, xhr)
            {
              if (data == 1)
              {
                Mensaje("Ok", "El Usuario ha sido almacenado.");    
              } else
              {
                Mensaje("Error", data);    
              }
            }).always(function() 
            {
              //Cuando Finaliza
            }).fail(function() {
              Mensaje("Error", "No fue posible almacenar el Usuario, por favor intenta nuevamente.");
            });
          }
        }
      }
    });
}