function cargarIpal()
{
  $.post("php/ipal/cargarDescripcion.php", {},
    function(data)
    {
      var tds ="";
      $.each(data, function(index, value)
        {
          tds +=  '<li class="span12">';
          tds +=    '<a href="#tab' + value.id + '" data-toggle="tab" class="step active">';
          tds +=      '<span class="number">' + value.id + '</span>';
          tds +=      '<span class="desc"><i class="icon-ok"></i> ' + value.Nombre + '</span>';
          tds +=    '</a>';
          tds +=  '</li>';
        });
          $("#form_wizard_1 form ul").append(tds);
          objWizard();
          
    },"json");
}
function objWizard() 
{
    if (!jQuery().bootstrapWizard) {
        return;
    }

    $('#form_wizard_1').bootstrapWizard({
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        onTabClick: function (tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            // set wizard title
            App.scrollTo($('.page-title'));
        },
        onNext: function (tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            // set done steps
        },
        onPrevious: function (tab, navigation, index) {
            var total = navigation.find('li').length;
            var current = index + 1;
            // set wizard title
        },
        onTabShow: function (tab, navigation, index) {
          $("#form_wizard_1 .page-title:visible").text($(tab).find(".desc").text());
            var total = navigation.find('li').length;
            //var current = index + 1;
            var li_list = navigation.find('li');
            jQuery(li_list[index]).addClass("done");
            var current = $(".done").length;
            var $percent = (current / total) * 100;
            
            $('#form_wizard_1').find('.bar').css({
                width: $percent + '%'
            });
        }
    });

    $('#form_wizard_1 .text-toggle-button').toggleButtons({
            width: 200,
            label: {
                enabled: "Si Aplica",
                disabled: "No Aplica"
            }
        });

    $(".chkIpal_Aplica").on("change", chkIpal_Aplica_Click);
    
}
function chkIpal_Aplica_Click()
{
  var Estado = $(this).find(".chkIpal_Aplica_Control").is(":checked");
  var objControl = $(this).parent(".controls");

  if (!Estado)
  {
    $(objControl).find(".text-toggle-button2").remove();
  } else
  {
    if ($(objControl).find(".text-toggle-button2").length == 0)
    {
      $(objControl).append('<div class="text-toggle-button2 noMostrar"><input type="checkbox" class="toggle" checked/></div>');
      $(objControl).find(".text-toggle-button2").toggleButtons({
              width: 200,
              label: {
                  enabled: "Si",
                  disabled: "No"
              }
          });
    }
  }

}
