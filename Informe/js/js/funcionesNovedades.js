var Zonas = [
    {"Nombre": "NINGUNA",
    "Empresa": "0"},
    {"Nombre": "ENGATIVA",
    "Empresa": "6"},
    {"Nombre": "SAN CRISTOBAL",
    "Empresa": "1"},
    {"Nombre": "CIUDAD BOLIVAR",
    "Empresa": "8"},
    {"Nombre": "BOSA",
    "Empresa": "5"},
    {"Nombre": "CALLE 80",
    "Empresa": "4"},
    {"Nombre": "KENNEDY",
    "Empresa": "7"},
    {"Nombre": "USME",
    "Empresa": "9"},
    {"Nombre": "USAQUEN",
    "Empresa": "1"},
    {"Nombre": "PERDOMO",
    "Empresa": "3"},
    {"Nombre": "SUBA CENTRO",
    "Empresa": "3"},
    {"Nombre": "FONTIBON",
    "Empresa": "2"},
    {"Nombre": "SUBA ORIENTAL",
    "Empresa": "7"},
    {"Nombre": "TINTAL ZONA FRANCA",
    "Empresa": "4"}];

 $(document).on("ready", arranque);
 
function arranque()
{
	$("#artResultado").html("<p>El Link no es válido o no tiene permisos suficientes para ver este Contenido</p>");
	$("#artResultado").hide();
	if(!localStorage.Usuario_SITP)
	{
		delete localStorage.Usuario_SITP;
		window.location.replace("index.html");
	}

	Usuario = JSON.parse(localStorage.Usuario_SITP)[0];
	$("#lblWelcome span").text(Usuario.NickName);

	$("body h1 span").text(Zonas[Usuario.Zona].Nombre);
	$.post("php/EnviarNovedades_C.php", 
		{
			Zona : Usuario.Zona,
			Usuario: Usuario.Id
		},
		function (data) 
		{
			if (data == 0) //No hay información
		 	{
		 		$("#artResultado").show("slide");
		 	}
		 	else //¿Json?
		 	{
		 		$('#tableNovedades').dataTable().fnDestroy();
				$("#tableNovedades").find("tbody").find("tr").remove();

				var tableBody = $("#tableNovedades").find("tbody");
				$.each(data,function(index,value) 
				{
					var tds = "<tr>";
					tds += "<td>" + value.Consecutivo+ "</td>";
							tds += "<td>" + value.CodigoBus + "</td>";
							tds += "<td>" + value.Fecha + "</td>";
							tds += "<td>" + value.Categoria + "</td>";
							tds += "<td>" + value.Grupo + "</td>";
							tds += "<td>" + value.Subgrupo + "</td>";
							tds += "<td>" + value.Item + "</td>";
							tds += "<td>" + value.Observaciones + "</td></tr>";

					tableBody.append(tds);
				});
				$('#tableNovedades').dataTable({
					"sDom": 'CWT<"clear">lfrtip',
						"oTableTools": 
							{
						"sSwfPath": "Tools/datatable/media/swf/copy_csv_xls_pdf.swf",
						"aButtons": [
			                "print",
			                {
			                    "sExtends":    "collection",
			                    "sButtonText": "Guardar",
			                    "aButtons":    [ "csv", "xls", "pdf" ]
			                }
			            			]
							},
							"oColumnFilterWidgets": 
							{
						"sSeparator": "\\s*/+\\s*"
							}
					});
		 	}//Qui
		}
		,"json");
}