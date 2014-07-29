$(document).on("ready", appReady);

function appReady()
{
  delete localStorage.hesPu;
  $("#loginform").on('submit', frmSignIn_submit);
}
function frmSignIn_submit(event)
{
  event.preventDefault();
  var cDate = new Date();

  $.post("php/validarUsuario.php", 
    {
      pUsuario : $("#txtUsuario").val(),
      pClave : $("#txtClave").val(),
      pFecha : cDate
    }, function (data)
    {
      if (data != 0)
      {
        localStorage.setItem("hesPu", JSON.stringify(data));  
        window.location.replace("home.html");
      } else
      {
        $(".alert").html("<strong>Error!</strong> Acceso denegado.");
        $(".alert").fadeIn(300).delay(2600).fadeOut(600);
      }
      
    }, 'json').fail(function()
    {
      $(".alert").html("<strong>Error!</strong> No hay acceso al Servidor, por favor revisa tu conexión a red.");
      $(".alert").fadeIn(300).delay(2600).fadeOut(600);
    });
  
}