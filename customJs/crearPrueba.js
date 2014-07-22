function crearPrueba()
{
          $("#frmCrearPrueba").on("submit", function(evento)
            {
              evento.preventDefault();
              $.post("php/crearPrueba.php",
              {
                nombre : $('#txtPrueba_Nombre').val(),
                descripcion : $('#txtPrueba_Descripcion').val()
              }, function(data, textStatus, xhr)
              {
                if (data == 1)
                {
                  Mensaje("Ok", "La Prueba ha sido almacenado.");    
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