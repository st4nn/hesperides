$(document).on("ready", appReady);

function appReady()
{
  $("body").on('click', expirarSesion);
}
function expirarSesion()
{
  var objDate = 16;
  if (Usuario == null)
  {
    sessionFlag = false;
  } else
  {
    var objUser = JSON.parse(localStorage.getItem('hesPu'));
    var cDate = new Date();
    var sessionFlag = true;
  
    var pDate = new Date(objUser.cDate);
  
    objDate = cDate - pDate;  
  }

  
    if (Math.round((objDate/1000)/60) < 30 && sessionFlag)
    {
      objUser.cDate = cDate;
      localStorage.setItem("hesPu", JSON.stringify(objUser));    
    } else
    {
      delete localStorage.hesPu;
      window.location.replace("index.html");
    } 
}