var hallazgo = 1;
var Usuario;
var Fichas;
var Documentos_Path;
var radioSet_IdEmpresa = 0;
var Multas = new Array();
var jsonMultas;
var Buses_Relacion = new Array();
var Direccion;
var Coordenadas;
var varCoordenadas;
var varContadorHallazgos = 0;
var varConcesionario = false;
var varInspeccion = 0;
var EstadoHallazgos = [{"Consecutivo": 0,"Descripcion": "Hallazgo Identificado"}, {"Consecutivo": 1,"Descripcion": "Hallazgo Revisado por el Supervisor"}, {"Consecutivo": 2,"Descripcion": "Hallazgo revisado por el Analista"}, {"Consecutivo": 3,"Descripcion": "Hallazgo Aprobado por el Analista"}, {"Consecutivo": 4,"Descripcion": "Hallazgo revisado por el Especialista del área"}, {"Consecutivo": 5,"Descripcion": "Hallazgo validado por el Especialista del área"}, {"Consecutivo": 6,"Descripcion": "Hallazgo conforme"}, {"Consecutivo": 7,"Descripcion": "Posible desincentivo"}, {"Consecutivo": 8,"Descripcion": "Posible desincentivo que inicia proceso contractual"}, {"Consecutivo": 9,"Descripcion": "Posible desincentivo conforme."}, {"Consecutivo": 10,"Descripcion": "Desincentivo"}, {"Consecutivo": 11,"Descripcion": "Desincentivo allanado"}, {"Consecutivo": 12,"Descripcion": "Desincentivo objetado"}, {"Consecutivo": 13,"Descripcion": "Contestado por el Concesionario"}, {"Consecutivo": 14,"Descripcion": "Contestado por el concesionario a TMSA"}];
var publicPrefijo;
var filaSeleccionadaHallazgo;
var CeldaHallazgo;
var pEstadoHallazgoSeleccionado;
var ConcesionarioObservaciones = new Array();
var ConcesionarioHallazgoActivo = 0;
$(document).on("ready", arranque);


function arranque()
{
	GraficasVehiculosZonas();
	$("#DashBoard_Opciones").buttonset();

	$("#DashBoard_Opciones input").on("click", DashBoard_Opciones_input_click);

var cadena = "1234567";
	var f = new Date();
	$("#txtCrearHallazgo_HoraInicio").datepicker({ dateFormat: "yy-mm-dd"});

	$("#lnkInspeccionPeriodica").on('click', EditarInspeccionPeriodica);

	$("#CrearInsPeriodica").on('submit', CrearInsPeriodica_submit);
	$("#btnCrearInsPeriodica").on('click', function(event)
		{
			event.preventDefault();
			$("#CrearInsPeriodica input").val("");
			$("#CrearInsPeriodica").dialog('open');
		});

	$("#CorregirHallazgos").on('submit', CorregirHallazgos_Submit);

	$("#CorregirHallazgos a").live('click', CorregirHallazgos_a_Click);

		$("#CorregirHallazgos").dialog(
			{
				autoOpen: false, 				
				minWidth: 620,
				title : 'Corregir Hallazgo'
			});

		$("#CrearInsPeriodica").dialog(
			{
				autoOpen: false, 				
				minWidth: 620,
				title : 'Corregir Item Inspección Periódica'
			});

	$("#txtHallazgos_Estados input").live("click", txtHallazgos_Estados_Click);
	$("#txtHallazgos_Zonas input").live("click", txtHallazgos_Zonas_Click);
	$("#tableHallazgosCorregir tbody tr").live('click', tableHallazgosCorregir_tr_Click);
	$("#btnHallazgosCorregir_Buscar").on('click', btnHallazgosCorregir_Buscar_Click);

	$(".btnDescargarArchivo").live("click", function(argumento)
		{
			abrirPopup($(this).attr("Url"));
		}
		);
	$("#lnkNovedadesConcesionario").on("click", lnkNovedadesConcesionario_Click)
	$("#btnSeguridadOperacional_Buscar").on("click", btnSeguridadOperacional_Buscar_Click);
	$("#btnVelocidad_Buscar").on("click", btnVelocidad_Buscar_Click);
	$("#btnAlcoholimetria_Buscar").on("click", btnAlcoholimetria_Buscar_Click);
	$("#btnAlcoholimetriaEspecial_Buscar").on("click", btnAlcoholimetriaEspecial_Buscar_Click);
	$("#btnFlotaInoperativa_Buscar").on("click", btnFlotaInoperativa_Buscar_Click);
	$("#btnMatrizFlotaInoperativa_Buscar").on("click", btnMatrizFlotaInoperativa_Buscar_Click);
	$("#btnFlotaInoperativa_Guardar").on("click", FlotaInoperativa_Submit);
	$("#FlotaInoperativa_Zonas input").live("click", FlotaInoperativa_Zonas_Click);
	$("#tableHallazgo tbody td").live("click", tableHallazgo_td_Click);
	$("#btnEnviarCorreo").on("click", btnEnviarCorreo_Click);
	$(".btnRevisarHallazgo").live("click", btnRevisarHallazgo_Click);
	$("#btnReporteHallazgosPorVencer_Buscar").on("click", btnReporteHallazgosPorVencer_Buscar_Click);
	$("#btnGenHallazgos_Descargar").on('click', btnGenHallazgos_Descargar_Click);
	$("#tableGenHallazgos a").live('click', tableGenHallazgos_a_Click);

	$("#btnGenHallazgos_Buscar").on("click", btnGenHallazgos_Buscar_Click)

	$("#Hallazgos_Opciones").buttonset();
	$("#btnCargarInmovilizados_Volver").on("click", btnCargarInmovilizados_Volver_Click);
	$("#btnCargarConductores_Volver").on("click", btnCargarConductores_Volver_Click);
	$("#btnCargarBuses_Volver").on("click", btnCargarBuses_Volver_Click);
	$("#btnCargarInspecciones_Volver").on("click", btnCargarInspecciones_Volver_Click);
	$("#menuVer_Observaciones").live("click", menuVer_Observaciones_Click);
	$(document).on("click", function()
	{
		$("#Hallazgos_menu").hide();
	});
	
	/*
	$("#Hallazgos_menu li").live("click", function()
		{
			window.console && console.log($(this).attr("id"));
		});
	*/
	$("#Hallazgos_menu").menu();
	
	$("#Hallazgos_menu_CambiarEstado").menu();

	$("#tableHallazgos tbody tr").live("contextmenu", function(event) {
    	event.preventDefault();
    	$("#Hallazgos_menu").show();
    	publicPrefijo = $(this).find('information').attr("Prefijo");
    	$("#Hallazgos_menu").css({top: event.pageY + "px", left: event.pageX + "px"});
    	
    	//alert($(this).find("information").attr('Estado'));
	});
	

	$(".btnRotarImagen").live("click", btnRotarImagen_Click);
	$("#Mediciones_Seguridad_Cerrar").on("click", Mediciones_Seguridad_Cerrar_click);
	$("#Hallazgo_Estado").on("change", Hallazgo_Estado_Change);
	$(".btnCorregirNoConformidad").live("click", btnCorregirNoConformidad_Click);
	$("#btnVehiculosNovedadesPendientes_Buscar").on("click", btnVehiculosNovedadesPendientes_Buscar_Click);
	$("#Mediciones_Vehiculos_Cerrar").on("click", Mediciones_Vehiculos_Cerrar);
	$("#tableVehiculos tbody tr").live("click", CargarMedicionVehiculos);

	$("#btnVehiculos_Buscar").on("click", CargarInspecciones_Vehiculos);
	$(".IPObservaciones").live("change", InspeccionPeriodica_AgregarObservaciones);
	$(".IP_ButtonSet input").live("click", IP_ButtonSet_input_Click);
	$(".GuardarCriInmo").live("click", GuardarCriInmo_Click);
	$(".GuardarInsDiaria").live("click", GuardarInsDiaria_Click);
	$(".GuardarInsPeriodica").live("click", GuardarInsPeriodica_Click);
	$(".BorrarInsPeriodica").live("click", BorrarInsPeriodica_Click);
	$(".EliminarMulta").live("click", EliminarMulta_click);
	$(".GuardarMulta").live("click", GuardarMulta_Click);

	$("#btnHallazgoAgregarObservaciones").live("click", btnHallazgoAgregarObservaciones_Click);
	$("#DatosHallazgo_Cerrar").live("click", DatosHallazgo_Cerrar_click);
	$("#btnHallazgos_Buscar").on("click", CargarHallazgos);



	var varFecha = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) ;
	$("#txtOperaciones_Desde, #txtVehiculosInmovilizados_Desde").val(varFecha);
		$("#txtHallazgos_Desde").val(varFecha);
		$("#txtHallazgos_Hasta").val(varFecha);

	$(".VehiculoInspeccionPeriodica").live("click", VehiculoInspeccionPeriodica_Click);
	$("#btnLevantarHallazgo").on("click", btnLevantarHallazgo_click);
	$(".btnHabilitarBus").live("click", HabilitarBus);
	$(".btnFIHabilitarBus").live("click", FIHabilitarBus);

	$("#txtCorregirHallazgos_Fecha").on('change', DashBoard_RangeBx_Change);
	$("#txtCorregirHallazgos_Fecha").datepicker();

	$("#txtMatrizFlotaInoperativa_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtMatrizFlotaInoperativa_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtMatrizFlotaInoperativa_Desde").datepicker();
	$("#txtMatrizFlotaInoperativa_Hasta").datepicker();

	$("#GenHallazgos_Desde").on('change', DashBoard_RangeBx_Change);
	$("#GenHallazgos_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#GenHallazgos_Desde").datepicker();
	$("#GenHallazgos_Hasta").datepicker();

	$("#txtReporteHallazgosPorVencer_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtReporteHallazgosPorVencer_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtReporteHallazgosPorVencer_Desde").datepicker();
	$("#txtReporteHallazgosPorVencer_Hasta").datepicker();

	$("#txtReporteHallazgosPorVencer_DesdeH").on('change', DashBoard_RangeBx_Change);
	$("#txtReporteHallazgosPorVencer_HastaH").on('change', DashBoard_RangeBx_Change);
	$("#txtReporteHallazgosPorVencer_DesdeH").datepicker();
	$("#txtReporteHallazgosPorVencer_HastaH").datepicker();

	$("#txtSeguridadOperacional_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtSeguridadOperacional_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtSeguridadOperacional_Desde").datepicker();
	$("#txtSeguridadOperacional_Hasta").datepicker();
	

	$("#txtVelocidad_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtVelocidad_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtVelocidad_Desde").datepicker();
	$("#txtVelocidad_Hasta").datepicker();

	$("#txtAlcoholimetria_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtAlcoholimetria_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtAlcoholimetria_Desde").datepicker();
	$("#txtAlcoholimetria_Hasta").datepicker();

	$("#txtAlcoholimetriaEspecial_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtAlcoholimetriaEspecial_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtAlcoholimetriaEspecial_Desde").datepicker();
	$("#txtAlcoholimetriaEspecial_Hasta").datepicker();

	

	$("#txtFlotaInoperativa_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtFlotaInoperativa_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtFlotaInoperativa_Desde").datepicker();
	$("#txtFlotaInoperativa_Hasta").datepicker();

	$("#txtFlotaInoperativa_Fecha").on('change', DashBoard_RangeBx_Change);
	$("#txtFlotaInoperativa_Fecha").datepicker();
	$("#txtFlotaInoperativa_Fecha").val(varFecha);
	

	$("#txtOperaciones_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtOperaciones_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtOperaciones_Desde").datepicker();
	$("#txtOperaciones_Hasta").datepicker();

	$("#txtSeguridad_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtSeguridad_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtSeguridad_Desde").datepicker();
	$("#txtSeguridad_Hasta").datepicker();

	$("#txtVehiculos_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtVehiculos_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtVehiculos_Desde").datepicker();
	$("#txtVehiculos_Hasta").datepicker();

	$("#txtHallazgos_Hasta").datepicker();
	$("#txtHallazgos_Desde").datepicker();
	$("#txtHallazgos_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtHallazgos_Hasta").on('change', DashBoard_RangeBx_Change);

	$("#txtVehiculosInmovilizados_Desde").on('change', DashBoard_RangeBx_Change);
	$("#txtVehiculosInmovilizados_Hasta").on('change', DashBoard_RangeBx_Change);
	$("#txtVehiculosInmovilizados_Hasta").datepicker();
	$("#txtVehiculosInmovilizados_Desde").datepicker();
	

	$("#btnOperaciones_Buscar").on("click", CargarOperaciones);
	$("#btnSeguridad_Buscar").on("click", CargarSeguridad);

	$("#btnVehiculos_Habilitar").on("click", btnVehiculos_Habilitar_Click);
	$("#btnVehiculos_Inmovilizar").on("click", Vehiculos_Inmovilizar);
	$("#btnDesplegarCriteriosInmovilizacion").on("click", MostrarCriteriosInmovilizacion);
	$("#btnDesplegarCriteriosHabilitacion").on("click", MostrarCriteriosHabilitacion);
	$("#btnDesplegarCriteriosHabilitacion_").on("click", MostrarCriteriosHabilitacion_);
	$("#btnDesplegarCriteriosInmovilizacion_").on("click", MostrarCriteriosInmovilizacion_);
	$(".SeleccionarInmovilizacion").live("click", SeleccionarInmovilizacion);
	$(".SeleccionarInmovilizacion_").live("click", SeleccionarInmovilizacion_);
	$(".SeleccionarHabilitacion").live("click", SeleccionarHabilitacion);
	$(".SeleccionarHabilitacion_").live("click", SeleccionarHabilitacion_);
	$(".ObservacionesInspeccionDiaria").live("change", InspeccionDiaria_AgregarObservaciones);
	$("#btnVehiculos_NuevoBus").on("click", Vehiculos_NuevaInspeccion);
	$("#btnVehiculos_SinNovedad").on("click", Vehiculos_NuevaInspeccion);
	$("#Mediciones_Cerrar").on("click", Mediciones_Cerrar_click);

	//$("#lnkOperaciones").on("click", CargarOperaciones);
	$("#lnkVehiculos").on("click", ObtenerCoordenadas);
	
	$("#tableOperaciones tbody tr").live("click", CargarMedicion);
	$("#tableSeguridad tbody tr").live("click", CargarMedicionSeguridad);
	$("#tableHallazgos tbody tr").live("click", CargarDatosHallazgo);


	if(!localStorage.Usuario_SITP)
	{CerrarSesion();}

	CargarUsuario();
	CargarDepartamentos();
	
	
	$('#lnkLogout').on('click', CerrarSesion);
		
	$(".MainMenu_Item").on('click', 
		function()
		{ 
			var IdSeccion = $(this).attr("id").replace("lnk", "");
			Seccion("#" + IdSeccion); 
			$("#SelectedSection h4").text($("#" + IdSeccion).attr("Texto"));
		});
	
	$("#tableMyUsersRefresh").on("click", CargarUsuariosPropios);
	
		$('.password').pstrength();
	$("#tableMyUsers tr").live('click', CargarInfoUsuario);
	
	$("#txtCreatingUsersCreate_Company").on("change", function(){cboCompanyCreate_Change("CompanyData", "txtCreatingUsersCreate_Company");});
	$("#txtMyUsersEdit_Company").on("change", function(){cboCompanyCreate_Change("CompanyData_Edit", "txtMyUsersEdit_Company");});

	$("#btnMyUsers_KeyChange").on("click", btnMyUsers_KeyChange_Click)

	$("#btnMyAccount_CreatingUsersCreate_Reset").on("click", function(evento){evento.preventDefault();ResetearContenedor("CreatingUsersCreate");})
	
	$("#btnCompanyDataCancel").on("click", btnCompanyDataCancel_click);
	$("#btnCompanyDataCancel_Edit").on("click", btnCompanyDataCancel_click);

	$("#btnCompanyDataCreate").on("click", function(event){btnCompanyDataCreate_click(event, "txtCreatingUsersCreate_CompanyOther", "txtCreatingUsersCreate_Company", "CreatingUsers_Create", "CompanyData", "txtCreatingUsersCreate_Phone");});
	$("#btnCompanyDataCreate_Edit").on("click", function(event){btnCompanyDataCreate_click(event, "txtCreatingUsersEdit_CompanyOther", "txtMyUsersEdit_Company","MyUsersEdit_Message", "CompanyData_Edit", "txtMyUsersEdit_Phone");});
	
	$("#btnMyUsers_Edit").live("click", btnMyUsers_Edit_click);
	$("#btnMyUsersEditConfirmOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_EditPermissions").live("click", function(){EditarPermisos($(this).attr("idUser"), $(this).attr("UserName"))});
	$("#MyUsersEdit_Permissions_Rol").on('change', CambiarRol);
	
	$("#btnMyUsersEditOk").live("click", btnMyUsersEditOk_click);
	$("#btnMyUsers_LoginAsAUser").live("click", btnMyUsers_LoginAsAUser_click);
	$("#btnMyAccount_Options_Permissions_Delete").live("click", btnMyAccount_Options_Permissions_Delete_click);
	
	$("#lnkCreatingUsers").on('click', function()
		{
			$("#MyAccount_Options_CreatingUsers").dialog(
			{
				autoOpen: false, 				
				minWidth: 620,
				title : 'Crear Usuario'
			});
			$("#MyAccount_Options_CreatingUsers").dialog('open');
			CargarDepartamentos();

			$("#txtCreatingUsersCreate_User").focus();
		});
	$("#CreatingUsersCreate").live("submit", CreatingUsersCreate_submit);

	CargarSITP();
}
function CargarUsuario()
{
	Usuario = JSON.parse(localStorage.Usuario_SITP)[0];
	$("#lblWelcome span").text(Usuario.NickName);
	$("#lblWelcomeRol span").text(Usuario.RolName);
	
	$("#txtMyAccount_Name").val(Usuario.Name);
	$("#txtMyAccount_DisplayName").val(Usuario.NickName);
	$("#txtMyAccount_Email").val(Usuario.Email);
	$("#txtMyAccount_Company").val(Usuario.CompanyName);
		
	$("#rdsAgrupacion").buttonset();
	CargarPermisos(Usuario.Id);
	CargarUsuariosPropios();
	CargarRoles();
	var dFecha = new Date();
	dFecha = dFecha.getDate();
	if (Usuario.Fecha != dFecha)
	{
		CerrarSesion();
		localStorage.setItem('contInspecciones', 0);
	}
	$("#Inspecciones_Realizadas span").text(parseInt(localStorage.contInspecciones));

}
function CargarRoles()
{
	$.post('php/CargarRoles.php',
		{Id_Rol : Usuario.IdInitialRol},
		function(data)
		   {
			   $("#MyUsersEdit_Permissions_Rol option").remove();
			   $("#cboCreatingUsersCreate_Rol option").remove();
			   
				$.each(data,function(index,value) 
				{
					if (data[index].RolId)
					{
						var tds = "<option value='" + value.RolId + "'>" + value.RolName + "</option>";
							  
						$("#MyUsersEdit_Permissions_Rol").append(tds);
						$("#cboCreatingUsersCreate_Rol").append(tds);
					}
				});
		   }, "json"	
		);
}
function CerrarSesion()
{
	delete localStorage.Usuario_SITP;
	window.location.replace("index.html");
}
function DashBoard_RangeBx_Change()
{
	$(this).val(Date.parse($(this).val()).toString("yyyy-MM-dd"));
}
function DiferenciaDias(FechaInicial, FechaFinal)
{  
    var d1 = FechaInicial.split("-");  
    var dat1 = new Date();  
    dat1.setFullYear(d1[0], parseFloat(d1[1])-1, parseFloat(d1[2]));
   
    var d2 = FechaFinal.split("-");  
    var dat2 = new Date();  
    dat2.setFullYear(d2[0], parseFloat(d2[1])-1, parseFloat(d2[2]));
  
    var fin = dat2.getTime() - dat1.getTime();  
    var dias = Math.floor(fin / (1000 * 60 * 60 * 24))    
    return (dias + 1);  
}  
function sumarDiasFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "yyyy-MM-dd").add(NumDias).days().toString("yyyy-MM-dd");
	return obj;
}
function sumarHorasFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "HH-MM-dd").add(NumDias).hours().toString("HH:mm yyyy-MM-dd");
	return obj;
}
function sumarMesesFecha(Fecha, NumDias)
{
	obj = Date.parse(Fecha, "yyyy-MM-dd").add(NumDias).months().toString("MM");
	return obj;
}


function Seccion(obj)
{
	if (screen.width<769)
		{OcultarMenu();}
	/*
	$(".Seccion input, .Seccion_SinMenu input").val("");
//	$(".Seccion div, .Seccion_SinMenu div").fadeOut();

	$(".Seccion input").val("");
	$(".Seccion_SinMenu input").val("");
	*/
	$(".Seccion").fadeOut();
	$(".Seccion_SinMenu").fadeOut();

	$(obj).fadeIn();
}
function btnCompanyDataCancel_click(evento)
{
	evento.preventDefault();
	$("#CompanyData").slideUp();
	$("#CompanyData_Edit").slideUp();
	$("#txtCreatingUsersCreate_Email").focus();	
	$("#txtCreatingUsersCreate_Company").val(1);
}
function btnCompanyDataCreate_click(evento, NombreCampo, NombreSelect, NombreAlerta, NombreSeccion, NombreCampoSiguiente)
{
	evento.preventDefault();
	$.post("php/CrearDepartamento.php",  
	{
		Name: $("#" + NombreCampo).val(),
		IdOwn: Usuario.Id
	}, 
	function(data)
	{	
		data = parseInt(data);
		if (isNaN(data) || data == 0) 
		{ 
			MostrarAlerta(NombreAlerta, "error", "ui-icon-alert", "Error!", "El Departamento ya existe");
		}
		else
		{ 
			MostrarAlerta(NombreAlerta, "default", "ui-icon-circle-check", "Hey!", "El Departamento fue creado");
			
			$("#" + NombreSelect).append("<option value=" + data + ">" + $("#" + NombreCampo).val() + "</option>");	
				$("#" + NombreSeccion).slideUp();
				$("#" + NombreCampoSiguiente).focus();	
			$("#" + NombreSelect).val(data);
		} 
	});		
}
function btnMyUsers_Edit_click()
{	
	ResetearContenedor("MyUsers_Edit");
	var IdUsuario = $(this).attr("idUser");
	var Nombre = $(this).attr("UserName");
	CargarDepartamentos();
	
	var strObj = "Edit " + $(this).attr('UserName');
		$("#MyUsers_Edit").attr("IdUsuario", IdUsuario);
			$("#txtMyUsersEdit_Name").val(Nombre);
			$("#txtMyUsersEdit_DisplayName").val($(this).attr('DisplayName'));
			$("#txtMyUsersEdit_Email").val($(this).attr('Mail'));
			//$("#txtMyUsersEdit_Company").val($(this).attr('IdCompany'));
			$("#txtMyUsersEdit_State").val($(this).attr("State"));
			$("#txtMyUsersEdit_Phone").val($(this).attr("Phone"));
			
		$("#MyUsers_Edit").dialog({
				autoOpen: false, 				
				title: "Editar " + Nombre,
				minWidth: 600,
				buttons: [
							{
								text: "Actualizar",
								click: function() { btnMyUsersEditOk_click();
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		$("#MyUsers_Edit").dialog('open');
}
function btnMyUsersEditOk_click()
{
	var dialogo = $('<div></div>')
		  .html("¿Está seguro que desea actualizar los datos?")
		  .dialog({
			autoOpen: false,
			buttons: [
						{
							text: "Update",
							click: function() { 
												var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
												$.post("php/EditarUsuario.php",
														{
															Id : IdUsuario,
															IdOwn : Usuario.Id,
															Name :  $("#txtMyUsersEdit_Name").val(),
															NickName : $("#txtMyUsersEdit_DisplayName").val(),
															Email : $("#txtMyUsersEdit_Email").val(),
															IdDepartamento: $("#txtMyUsersEdit_Company").val(),
															Phone : $("#txtMyUsersEdit_Phone").val(),
															State : $("#txtMyUsersEdit_State").val()
														},
														function(data)
															{
																if (parseInt(data) >= 0)
																{
																	var IdUsuario = $("#MyUsers_Edit").attr("IdUsuario");
																	dialogo.dialog("close"); 
																	$("#MyUsers_Edit").dialog('close');
																	CargarUsuariosPropios();
																}
															}
													  );
											  }
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close"); 
												$("#MyUsers_Edit").dialog('close');
											  }
						}
					  ],
			modal: true, 
			stack: true,
			title: "confirm Update"
		  });
	dialogo.dialog('open');
}
function btnMyUsers_LoginAsAUser_click()
{
	var IdUsuario = $(this).attr("idUser");
	
	localStorage.setItem("UsuarioSimulado", '[' + JSON.stringify(
	{	"Id": IdUsuario,
		"Name": $(this).attr('UserName'),
		"NickName": $(this).attr('DisplayName'),
		"IdCompany": $(this).attr("IdCompany"),
		"CompanyName": 	$(this).attr("IdCompany"),
		"Email": $(this).attr('Mail'),
		"urlFacebook": $(this).attr("urlFacebook"),
		"urlTwitter": $(this).attr("urlTwitter"),
		"IdInitialRol": $(this).attr("IdInitialRol"),
		"RolName": $(this).attr("RolName")
	}
																) + ']');
	
	abrirPopup("UserLogin.html");
}
function CambiarRol()
{
	$("#UserTableFunctions :checkbox").attr('checked', false);

	$.post("php/CargarPermisosRol.php",
			{IdRol : $("#MyUsersEdit_Permissions_Rol").val()},
			function(data)
			{
				$.each(data,function(index,value) 
				{
					$("#chk" + data[index].IdFunction).attr('checked', true);
				});
			}, "json"
		  );
}
function btnMyAccount_Options_Permissions_Delete_click()
{
	var IdPer = $(this).parent("td").attr("name");
	var Fila = document.getElementsByName($(this).parent("td").attr("name"));
	
	var dialogo = $('<div></div>')
		  .html("Are you sure that you wish to delete this Permission?")
		  .dialog({
			autoOpen: false,
			buttons: [
						{
							text: "Delete",
							click: function() { 
												$.post("php/BorrarPermiso.php",
														{	IdPermission : IdPer	},
														function(data)
															{
																if (parseInt(data) > 0)
																{
																	$("#" + $(Fila[2]).text()).slideUp();
																	CargarPermisos(Usuario.Id)
																	dialogo.dialog("close"); 
																}
															}
													  );
											  }
						},
						{
							text: "Cancel",
							click: function() { $(this).dialog("close"); }
						}
					  ],
			modal: true, 
			stack: true,
			title: "Confirm Delete"
		  });
	dialogo.dialog('open');
}
function CargarUsuariosPropios()
{
	$('#tableMyUsers').dataTable().fnDestroy();
	$("#tableMyUsers").find("tbody").find("tr").remove();

		$.post("php/VerUsuariosPropios.php",
		{ Id : Usuario.Id, pDepartamento : Usuario.IdCompany},																																																																																																																					
		function(data)
		{
			var tableBody = $("#tableMyUsers").find("tbody");
			$.each(data,function(index,value) 
			{
				if (data[index].IdUser)
				{
					var tds = "<tr>";
					tds += "<td>" + data[index].UserName + "<information  idUser = '" + data[index].IdUser +  "' State='" + data[index].State + "' IdCompany='" + data[index].IdCompany + "' UserName='" + data[index].Name + "' DisplayName='" + data[index].NickName + "' Mail='" + data[index].Mail + "' Phone='" + data[index].Empresa + "' Owner='" + data[index].Owner + "' IdInitialRol='" + data[index].IdInitialRol + "' RolName='" + data[index].RolName + "' CompanyName='" + data[index].Company + "'/>"+ "</td>";
										tds += "<td>" + data[index].Name+ "</td>";
										tds += "<td>" + data[index].State+ "</td>";
										tds += "<td>" + data[index].Empresa+ "</td>";
										tds += "<td>" + data[index].Company+ "</td>";
										tds += "<td>" + data[index].RolName+ "</td>";
										tds += "<td>" + data[index].Mail+ "</td></tr>";

					tableBody.append(tds);
				}
			});
			$('#tableMyUsers').dataTable({
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
		}, "json")	;
		
}
function abrirPopup(url)																					
{
	popupWin = window.open(url, 'open_window');
}
function ResetearContenedor(IdContenedor)
{																																										
		  $('#' + IdContenedor).find(':input').each(function() {
			if ($(this).attr('type') != 'submit')
			  {
                $(this).val('');
              }
			});
}
function EditarPermisos(IdUsuario, NombreUsuario)
{
	
$.post("php/VerPermisos.php",
		{ Id : Usuario.Id},
		function(data){
			$("#UserTableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'><input name='chkPermissionState' type='checkbox' id='chk" + data[index].IdFunction + "' AssociatedControl='" + data[index].AssociatedControl + "' IdFunction='" + data[index].IdFunction + "'/></td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#UserTableFunctions").append(tds);
				}
			});
			$.post("php/VerPermisos.php",
								{ Id : IdUsuario},
								function(data2)
								{
									$.each(data2,function(index2,value2)
									{
										$("#chk" + data2[index2].IdFunction).attr("checked", "checked");
									});
								}, "json");
					},
		"json");
		
		$("#MyUsersEdit_Permissions").dialog({
		autoOpen: false, 
		minWidth: 620,
		title: "Editar Permisos de: " + NombreUsuario,
		buttons: [
			{
				text: "Ok",
				click: function() { 
									var tabla = document.getElementById("UserTableFunctions");
									var numFilas = tabla.rows.length;
									var Controles = "";
									var elementos = tabla.getElementsByTagName("input")
									for (i = 0; i < numFilas; i++)
									{
										if($(elementos[i]).is(':checked'))
										{
											Controles += $(elementos[i]).attr("IdFunction") + "@";
										}
									}
									$.post("php/EditarPermiso.php",
											{Functions: Controles, IdUser: IdUsuario},
											function(data)
											{
													$("#MyUsersEdit_Permissions").dialog("close");
											}
										  );
								  }
			},
			{
				text: "Cancel",
				click: function() { $(this).dialog("close"); 
								  }
			}
				  ]
								});
	$("#MyUsersEdit_Permissions").dialog('open');	
	
}
function CargarPermisos(IdUsuario)
{
	$.post("php/VerPermisos.php",
		{ Id : IdUsuario},
		function(data){
			$("#TableFunctions td").remove();
			$.each(data,function(index,value) 
			{
				if (data[index].IdPermission)
				{
					var tds = "<tr id='" + data[index].IdPermission + "'>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Name + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].Description + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'>" + data[index].AssociatedControl + "</td>";
						  tds += "<td name='" + data[index].IdPermission + "'><button title='Delete' id='btnMyAccount_Options_Permissions_Delete' class='ui-button-default ui-button ui-widget ui-corner-all'><strong><span class='ui-icon ui-icon-closethick'></span></strong></button></td>";
						  tds += "<td name='" + data[index].IdPermission + "' IdFunction='" + data[index].IdFunction + "'></td>";
						tds += '</tr>';	
					$("#TableFunctions").append(tds);
					$("#" + data[index].AssociatedControl).slideDown();
					$("#lnkLogout").slideDown();
				}
			});
					},
		"json");
}
function CreatingUsersCreate_submit(evento)
{
		evento.preventDefault();

		if ($("#txtCreatingUsersCreate_Password").val() == $("#txtCreatingUsersCreate_ReTypePassword").val())
		{
			$.post("php/CrearUsuario.php",  
			{
				Id: Usuario.Id,
				User: $("#txtCreatingUsersCreate_User").val(),
				Password: $("#txtCreatingUsersCreate_Password").val(),
				Name: $("#txtCreatingUsersCreate_Name").val(),
				NickName: $("#txtCreatingUsersCreate_DisplayName").val(),
				Email: $("#txtCreatingUsersCreate_Email").val(),
				Company: $("#txtCreatingUsersCreate_Company").val(),
				Phone: $("#txtCreatingUsersCreate_Phone").val(),
				IdRol: $("#cboCreatingUsersCreate_Rol").val()
			}, 
			function(data)
			{
				var Id = parseInt(data);
				if (isNaN(Id)) //No lo Creó
				{ 
					MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Alert!", data);
				}
				else //Si lo Creó
				{ 
					//EditarPermisos(Id, $("#txtCreatingUsersCreate_Name").val());
					MostrarAlerta("CreatingUsers_Create", "default", "ui-icon-circle-check", "Hey!", "El Usuario ha sido creado");
					ResetearContenedor("CreatingUsersCreate");
				} 
			});	
		} else
		{
			MostrarAlerta("CreatingUsers_Create", "error", "ui-icon-alert", "Error!", "Las claves deben coincidir");
		}
}
function MostrarAlerta(NombreContenedor, TipoMensaje, Icono, Strong, Mensaje)
{
	/*NombreContenedor : Id del Div que contiene el MessageAlert
	 * TipoMensaje : {highlight, error, default}
	 * Icono : Icono que acompaña el mensaje ver listado en bootstrap
	 * Mensaje del AlertMessage*/
	 
	$("#" + NombreContenedor).removeClass(function() {return $(this).prev().attr('class');});
	$("#" + NombreContenedor + " span").removeClass("*");
	$("#" + NombreContenedor).addClass("ui-state-" + TipoMensaje);
	$("#" + NombreContenedor + " span").addClass(Icono);
	$("#" + NombreContenedor + " strong").text(Strong);
	$("#" + NombreContenedor + " texto").text(Mensaje);
	$("#" + NombreContenedor).fadeIn(300).delay(2600).fadeOut(600);
}
function CargarInfoUsuario()
{
	/*
	* idUser = data[index].IdUser
	* urlFacebook= data[index].urlFacebook
	* urlTwitter= data[index].urlTwitter
	* State= data[index].State
	* IdCompany= data[index].IdCompany
	* UserName= data[index].Name
	* DisplayName= data[index].NickName
	* Mail= data[index].Mail
	* Owner= data[index].Owner
	* IdInitialRol= data[index].IdInitialRol
	* RolName= data[index].RolName
	* CompanyName= data[index].Company
	* */
	$('#MyUsers_Info_NickName span').text($(this).find('information').attr('DisplayName'));
	$('#MyUsers_Info_Mail span').text($(this).find('information').attr('Mail'));
	$('#MyUsers_Info_Owner span').text($(this).find('information').attr('Owner'));
	$('#MyUsers_Info_Company span').text($(this).find('information').attr('CompanyName'));
	$('#MyUsers_Info_Phone span').text($(this).find('information').attr('Phone'));

	$("#btnMyUsers_LoginAsAUser").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_LoginAsAUser").attr('Phone', $(this).find('information').attr('Phone'));
	$("#btnMyUsers_LoginAsAUser").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_LoginAsAUser").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_LoginAsAUser").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_LoginAsAUser").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_LoginAsAUser").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_LoginAsAUser").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_LoginAsAUser").attr('IdInitialRol', $(this).find('information').attr('IdInitialRol'));
	$("#btnMyUsers_LoginAsAUser").attr('RolName', $(this).find('information').attr('RolName'));

	$("#btnMyUsers_Edit").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_Edit").attr('Phone', $(this).find('information').attr('Phone'));
	$("#btnMyUsers_Edit").attr('State', $(this).find('information').attr('State'));
	$("#btnMyUsers_Edit").attr('IdCompany', $(this).find('information').attr('IdCompany'));
	$("#btnMyUsers_Edit").attr('UserName', $(this).find('information').attr('UserName'));
	$("#btnMyUsers_Edit").attr('DisplayName', $(this).find('information').attr('DisplayName'));
	$("#btnMyUsers_Edit").attr('Mail', $(this).find('information').attr('Mail'));
	$("#btnMyUsers_Edit").attr('Owner', $(this).find('information').attr('Owner'));
	$("#btnMyUsers_Edit").attr('IdInitialRol', $(this).find('information').attr('IdInitialRol'));
	$("#btnMyUsers_Edit").attr('RolName', $(this).find('information').attr('RolName'));

	$("#btnMyUsers_KeyChange").attr('IdUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_KeyChange").attr('UserName', $(this).find('information').attr('UserName'));

	$("#btnMyUsers_EditPermissions").attr('idUser', $(this).find('information').attr('IdUser'));
	$("#btnMyUsers_EditPermissions").attr('Username', $(this).find('information').attr('DisplayName'));

	$("#btnMyUsers_Delete").attr('idUser', $(this).find('information').attr('IdUser'));
}
function cboCompanyCreate_Change(Seccion, Control)
{
	if ($("#" + Control).val() == "otro")
	{
		$("#" + Seccion).slideDown();
	}
	else
	{
		$("#" + Seccion).slideUp();
	}
}
function CargarDepartamentos()
{
	$("#txtCreatingUsersCreate_Phone option").remove()
	$("#txtCreatingUsersCreate_Company option").remove();
	$("#txtMyUsersEdit_Company option").remove();
	$.post("php/CargarDepartamentos.php", {pDepartamento : Usuario.IdCompany},
			function(data)
			{

				$.each(data,function(index,value)
				{
					$("#txtCreatingUsersCreate_Company").append("<option value=" + value.IdDepartamento + ">" + value.Nombre + "</option>");
					$("#txtMyUsersEdit_Company").append("<option value=" + value.IdDepartamento + ">" + value.Nombre + "</option>");
				});
				$("#txtCreatingUsersCreate_Company").append("<option value='otro'>Otro</option>");
				$("#txtMyUsersEdit_Company").append("<option value='otro'>Otro</option>");
			}
		,"json");

	$.post("php/CargarEmpresas.php", {pRol : Usuario.IdInitialRol},
			function(data)
			{

				$.each(data,function(index,value)
				{
					$("#txtCreatingUsersCreate_Phone").append("<option value=" + value.IdEmpresa + ">" + value.Nombre + "</option>");
				});
			}
		,"json");
}
function btnMyUsers_KeyChange_Click()
{
	var Nombre = $(this).attr("UserName");
	var IdUser = $(this).attr("idUser");
	$("#MyUsers_Edit_Key").dialog({
		autoOpen: false, 				
		title: "Cambiar Clave de " + Nombre,
		minWidth: 600,
		buttons: [
					{
						text: "Cambiar",
						click: function() { 
											if ($("#txtMyUsersEdit_ReTypePassword").val() == $("#txtMyUsersEdit_Password").val())
											{
												if($("#txtMyUsersEdit_Password").val() != "")
												{
													CambiarClave(IdUser, $("#txtMyUsersEdit_Password").val());	
													MostrarAlerta("Users_Message", "highlight", "ui-icon-check", "Hey!", "La Clave se ha Cambiado");
													$(this).dialog("close"); 
												}
												else
												{
													MostrarAlerta("MyUsersEdit_Message_Key", "error", "ui-icon-alert", "Error!", "La Clave no puede estar vacía");
												}
											}
											else
											{
												MostrarAlerta("MyUsersEdit_Message_Key", "error", "ui-icon-alert", "Error!", "las Claves no coinciden");
											}
												
										  }
					},
					{
						text: "Cancelar",
						click: function() { $(this).dialog("close"); 
										  }
					}
				  ]
						});
	$("#MyUsers_Edit_Key").dialog('open');
}
function CambiarClave(IdUser, NuevaClave)
{
	$.post("php/CambiarClave.php",
				{
					IdUsuarioMaestro: Usuario.Id,
					Id: IdUser,
					Clave: NuevaClave
				}
		);
}
function OcultarMenu()
{
	if ($("#MainMenu_Footer").is (':visible'))
	{
			$(".Seccion").addClass("Seccion_SinMenu");
			$(".Seccion").removeClass("Seccion");

			$("#MainMenu").hide('slide', 50);
	}
	else
	{
		$(".Seccion_SinMenu").addClass("Seccion");
		$(".Seccion_SinMenu").removeClass("Seccion_SinMenu");

		$("#MainMenu").show('slide', 50);
	}
}
function geolocalizar()
{
	navigator.geolocation.getCurrentPosition(mostrarMapa, errorMapa);
	return 0;
}
function mostrarMapa(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	
	//$("#status").text("Ajá! Estás en " + lat + "," + lon);
	
	
	var coordenada = new google.maps.LatLng(lat,lon);
	/*
	Coordenadas = lat + "," + lon;
	var opcionesMapa  = {
		center: coordenada,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	*/
	
	var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({'latLng': coordenada}, 
		function(results, status) 
		{
	      if (status == google.maps.GeocoderStatus.OK) 
	      {
	        if (results[0]) 
	        {
	          var varDireccion = results[0].formatted_address.split(",");
	          Direccion = varDireccion[0];
	          $("#txtVehiculo_Direccion").val(Direccion);

	        }
	      } 
	      else 
	      {
	        Direccion = "No se ubicó la dirección por " + status;

	      }
	    });
}
function errorMapa()
{
	Direccion = "No se ubicó";
	Coordenadas = Direccion;	

	$("#txtVehiculo_Direccion").text(Direccion);
}

function CompletarConCero(n, length){
   n = n.toString();
   while(n.length < length) n = "0" + n;
   return n;
}

var Empresas = [
    {"Nombre": "NINGUNA"},
    {"Nombre": "CONSORCIO EXPRESS"},
    {"Nombre": "COOBUS"},
    {"Nombre": "EGOBUS"},
    {"Nombre": "ESTE ES MI BUS"},
    {"Nombre": "ETIB"},
    {"Nombre": "GMOVIL"},
    {"Nombre": "MASIVO CAPITAL"},
    {"Nombre": "SUMA"},
    {"Nombre": "TRANZIT"}
];

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
    "Empresa": "4"}
];
var Meses = new Array('', 'Enero', 'Frebrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');

var CodigoBus = new Array();

CodigoBus['Z50'] = 1;
CodigoBus['Z52'] = 1;
CodigoBus['Z53'] = 1;
CodigoBus['Z15'] = 2;
CodigoBus['Z17'] = 2;
CodigoBus['Z18'] = 2;
CodigoBus['Z80'] = 3;
CodigoBus['Z82'] = 3;
CodigoBus['Z83'] = 3;
CodigoBus['Z70'] = 4;
CodigoBus['Z72'] = 4;
CodigoBus['Z73'] = 4;
CodigoBus['Z40'] = 5;
CodigoBus['Z42'] = 5;
CodigoBus['Z43'] = 5;
CodigoBus['Z25'] = 6;
CodigoBus['Z27'] = 6;
CodigoBus['Z28'] = 6;
CodigoBus['Z90'] = 7;
CodigoBus['Z92'] = 7;
CodigoBus['Z93'] = 7;

CodigoBus['Z10'] = 8;
CodigoBus['Z12'] = 8;
CodigoBus['Z13'] = 8;
CodigoBus['Z35'] = 9;
CodigoBus['Z37'] = 9;
CodigoBus['Z38'] = 9;
CodigoBus['Z30'] = 10;
CodigoBus['Z32'] = 10;
CodigoBus['Z33'] = 10;
CodigoBus['Z60'] = 11;
CodigoBus['Z62'] = 11;
CodigoBus['Z63'] = 11;
CodigoBus['Z20'] = 12;
CodigoBus['Z22'] = 12;
CodigoBus['Z23'] = 12;
CodigoBus['Z45'] = 13;
CodigoBus['Z47'] = 13;
CodigoBus['Z48'] = 13;

var InspeccionDiaria = [{"IdInspeccionDiaria":"1","Nombre":"SITEMA DE COMBUSTIBLE","Tipo":"CHASIS"},{"IdInspeccionDiaria":"2","Nombre":"SISTEMA DE ESCAPE","Tipo":"CHASIS"},{"IdInspeccionDiaria":"3","Nombre":"LLANTAS","Tipo":"CHASIS"},{"IdInspeccionDiaria":"4","Nombre":"EJES","Tipo":"CHASIS"},{"IdInspeccionDiaria":"5","Nombre":"CARDAN","Tipo":"CHASIS"},{"IdInspeccionDiaria":"6","Nombre":"FRENOS","Tipo":"CHASIS"},{"IdInspeccionDiaria":"7","Nombre":"DIRECCION","Tipo":"CHASIS"},{"IdInspeccionDiaria":"8","Nombre":"TRANSMISION","Tipo":"CHASIS"},{"IdInspeccionDiaria":"9","Nombre":"MOTOR","Tipo":"CHASIS"},{"IdInspeccionDiaria":"10","Nombre":"SUSPENSION","Tipo":"CHASIS"},{"IdInspeccionDiaria":"11","Nombre":"SISTEMA ELECTRICO","Tipo":"CHASIS"},{"IdInspeccionDiaria":"12","Nombre":"NIVELES DE LIQUIDOS","Tipo":"CHASIS"},{"IdInspeccionDiaria":"13","Nombre":"EXTERIOR","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"14","Nombre":"SISTEMA DE LUCES EXTERIORES","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"15","Nombre":"COMPARTIMIENTOS \/ ACCESOS A COMPONENTES","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"16","Nombre":"VIDRIOS","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"17","Nombre":"PUERTAS","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"18","Nombre":"INTERIOR","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"19","Nombre":"LUCES INTERIORES","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"20","Nombre":"HABITACULO CONDUCTOR","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"21","Nombre":"ELEMENTOS DE SEGURIDAD","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"22","Nombre":"SISTEMAS DE ACCESIBILIDAD","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"23","Nombre":"RUTEROS","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"24","Nombre":"SISTEMA DE RECAUDO","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"25","Nombre":"SIRCI","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"26","Nombre":"IMAGEN","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"27","Nombre":"ASEO","Tipo":"CARROCERIA"},{"IdInspeccionDiaria":"28","Nombre":"DOCUMENTOS","Tipo":"CARROCERIA"}];
var InspeccionDiariaSubGrupos = [{"idInspeccionTipo":"1","Tipo":"TANQUE","IdInspeccionDiaria":"1"},{"idInspeccionTipo":"2","Tipo":"LINEAS DE COMBUSTIBLE","IdInspeccionDiaria":"1"},{"idInspeccionTipo":"3","Tipo":"SEDIMENTADOR","IdInspeccionDiaria":"1"},{"idInspeccionTipo":"4","Tipo":"SILENCIADOR","IdInspeccionDiaria":"2"},{"idInspeccionTipo":"5","Tipo":"TUBERIA","IdInspeccionDiaria":"2"},{"idInspeccionTipo":"6","Tipo":"POSICION 1","IdInspeccionDiaria":"3"},{"idInspeccionTipo":"7","Tipo":"POSICION 2","IdInspeccionDiaria":"3"},{"idInspeccionTipo":"8","Tipo":"POSICION 3","IdInspeccionDiaria":"3"},{"idInspeccionTipo":"9","Tipo":"POSICION 4","IdInspeccionDiaria":"3"},{"idInspeccionTipo":"10","Tipo":"POSICION 5","IdInspeccionDiaria":"3"},{"idInspeccionTipo":"11","Tipo":"POSICION 6","IdInspeccionDiaria":"3"},{"idInspeccionTipo":"12","Tipo":"REPUESTO","IdInspeccionDiaria":"3"},{"idInspeccionTipo":"13","Tipo":"EJE DELANTERO","IdInspeccionDiaria":"4"},{"idInspeccionTipo":"14","Tipo":"EJE TRASERO","IdInspeccionDiaria":"4"},{"idInspeccionTipo":"15","Tipo":"ELEMENTO COMPLETO","IdInspeccionDiaria":"5"},{"idInspeccionTipo":"16","Tipo":"SISTEMA GENERAL","IdInspeccionDiaria":"6"},{"idInspeccionTipo":"17","Tipo":"CONJUNTO DELANTERO","IdInspeccionDiaria":"6"},{"idInspeccionTipo":"18","Tipo":"CONJUNTO TRASERO","IdInspeccionDiaria":"6"},{"idInspeccionTipo":"19","Tipo":"TANQUES DE AIRE","IdInspeccionDiaria":"6"},{"idInspeccionTipo":"20","Tipo":"LINEAS , VALVULAS DEL SISTEMA","IdInspeccionDiaria":"6"},{"idInspeccionTipo":"21","Tipo":"FRENO DE PARQUEO**","IdInspeccionDiaria":"6"},{"idInspeccionTipo":"22","Tipo":"FUNCIONAMIENTO","IdInspeccionDiaria":"7"},{"idInspeccionTipo":"23","Tipo":"MAL FUNCIONAMIENTO GENERAL DEL SISTEMA","IdInspeccionDiaria":"8"},{"idInspeccionTipo":"24","Tipo":"CAJA","IdInspeccionDiaria":"8"},{"idInspeccionTipo":"25","Tipo":"EMBRAGUE","IdInspeccionDiaria":"8"},{"idInspeccionTipo":"26","Tipo":"CARTER","IdInspeccionDiaria":"9"},{"idInspeccionTipo":"27","Tipo":"TURBO","IdInspeccionDiaria":"9"},{"idInspeccionTipo":"28","Tipo":"CORREAS","IdInspeccionDiaria":"9"},{"idInspeccionTipo":"29","Tipo":"CARCASA FILTRO DE AIRE","IdInspeccionDiaria":"9"},{"idInspeccionTipo":"30","Tipo":"CONJUNTO DELANTERO","IdInspeccionDiaria":"10"},{"idInspeccionTipo":"31","Tipo":"CONJUNTO TRASERO","IdInspeccionDiaria":"10"},{"idInspeccionTipo":"32","Tipo":"BATERIAS","IdInspeccionDiaria":"11"},{"idInspeccionTipo":"33","Tipo":"CONEXIONES RUTEOS","IdInspeccionDiaria":"11"},{"idInspeccionTipo":"34","Tipo":"NIVELES DE LIQUIDOS","IdInspeccionDiaria":"12"},{"idInspeccionTipo":"36","Tipo":"BOMPER DELANTERO COSTADO DERECHO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"37","Tipo":"BOMPER DELANTERO COSTADO IZQUIERDO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"38","Tipo":"BOMPER DELANTERO SECCION CENTRAL","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"39","Tipo":"PERSIANA DELANTERA","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"40","Tipo":"LATERAL DERECHO SECCION FRONTAL \/ FALDON","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"41","Tipo":"LATERAL DERECHO SECCION FRONTAL \/ FALDON","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"42","Tipo":"LATERAL DERECHO SECCION TRASERA \/ FALDON","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"43","Tipo":"LATERAL DERECHO SECCION TRASERA \/ TABLERO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"44","Tipo":"LATERAL IZQUIERDO SECCION FRONTAL \/ FALDON","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"45","Tipo":"LATERAL IZQUIERDO SECCION FRONTAL \/ TABLERO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"46","Tipo":"LATERAL IZQUIERDO SECCION TRASERA \/ FALDON","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"47","Tipo":"LATERAL IZQUIERDO SECCION TRASERA \/ TABLERO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"48","Tipo":"BOMPER TRASERO COSTADO DERECHO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"49","Tipo":"BOMPER TRASERO COSTADO IZQUIERDO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"50","Tipo":"BOMPER TRASERO SECCION CENTRAL","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"51","Tipo":"CASCO TRASERO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"52","Tipo":"ESPEJOS COSTADO DERECHO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"53","Tipo":"ESPEJOS COSTADO IZQUIERDO","IdInspeccionDiaria":"13"},{"idInspeccionTipo":"54","Tipo":"LUCES FRONTALES","IdInspeccionDiaria":"14"},{"idInspeccionTipo":"55","Tipo":"LUCES TRASERAS","IdInspeccionDiaria":"14"},{"idInspeccionTipo":"56","Tipo":"LUCES LATERALES DERECHAS","IdInspeccionDiaria":"14"},{"idInspeccionTipo":"57","Tipo":"LUCES LATERALES IZQUIERDAS","IdInspeccionDiaria":"14"},{"idInspeccionTipo":"58","Tipo":"TAPA LLENADO DE COMBUSTIBLE","IdInspeccionDiaria":"15"},{"idInspeccionTipo":"59","Tipo":"TAPA INSPECCION TANQUE DE COMBUSTIBLE","IdInspeccionDiaria":"15"},{"idInspeccionTipo":"60","Tipo":"TAPA INSPECCION BATERIAS","IdInspeccionDiaria":"15"},{"idInspeccionTipo":"61","Tipo":"TAPA INSPECCION TANQUES DE AIRE","IdInspeccionDiaria":"15"},{"idInspeccionTipo":"62","Tipo":"TAPA INSPECCION MOTOR","IdInspeccionDiaria":"15"},{"idInspeccionTipo":"63","Tipo":"VIDRIO FRONTAL","IdInspeccionDiaria":"16"},{"idInspeccionTipo":"64","Tipo":"VIDRIO TRASERO","IdInspeccionDiaria":"16"},{"idInspeccionTipo":"65","Tipo":"VIDRIOS LATERAL DERECHO","IdInspeccionDiaria":"16"},{"idInspeccionTipo":"66","Tipo":"VIDRIOS LATERAL IZQUIERDO","IdInspeccionDiaria":"16"},{"idInspeccionTipo":"67","Tipo":"PUERTA DELANTERA","IdInspeccionDiaria":"17"},{"idInspeccionTipo":"68","Tipo":"PUERTA CENTRAL","IdInspeccionDiaria":"17"},{"idInspeccionTipo":"69","Tipo":"PUERTA TRASERA","IdInspeccionDiaria":"17"},{"idInspeccionTipo":"70","Tipo":"PUERTA CONDUCTOR","IdInspeccionDiaria":"17"},{"idInspeccionTipo":"71","Tipo":"PISO SECCION DELANTERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"72","Tipo":"PISO SECCION TRASERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"73","Tipo":"TABLERO LATERAL DERECHO SECCION DELANTERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"74","Tipo":"TABLERO LATERAL DERECHO SECCION TRASERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"75","Tipo":"TABLERO LATERAL IZQUIERDO SECCION DELANTERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"76","Tipo":"TABLERO LATERAL IZQUIERDO SECCION TRASERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"77","Tipo":"TECHO SECCION DELANTERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"78","Tipo":"TECHO SECCION TRASERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"79","Tipo":"PASAMANOS Y ASIDEROS SECCION DELANTERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"80","Tipo":"PASAMANOS Y ASIDEROS SECCION TRASERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"81","Tipo":"SILLAS SECCION DELANTERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"82","Tipo":"SILLAS SECCION TRASERA","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"83","Tipo":"TIMBRES","IdInspeccionDiaria":"18"},{"idInspeccionTipo":"84","Tipo":"LUCES COSTADO DERECHO","IdInspeccionDiaria":"19"},{"idInspeccionTipo":"85","Tipo":"LUCES COSTADO IZQUIERDO","IdInspeccionDiaria":"19"},{"idInspeccionTipo":"86","Tipo":"LUCES HABITACULO CONDUCTOR","IdInspeccionDiaria":"19"},{"idInspeccionTipo":"87","Tipo":"INFORMADOR INTERNO","IdInspeccionDiaria":"19"},{"idInspeccionTipo":"88","Tipo":"SILLA \/ POSICION DE MANEJO","IdInspeccionDiaria":"20"},{"idInspeccionTipo":"89","Tipo":"PANEL DE INSTRUMENTOS","IdInspeccionDiaria":"20"},{"idInspeccionTipo":"90","Tipo":"EXTINTORES","IdInspeccionDiaria":"21"},{"idInspeccionTipo":"91","Tipo":"CLARABOLLAS","IdInspeccionDiaria":"21"},{"idInspeccionTipo":"92","Tipo":"VENTANAS DE EMERGENCIA","IdInspeccionDiaria":"21"},{"idInspeccionTipo":"93","Tipo":"PLATAFORMA","IdInspeccionDiaria":"22"},{"idInspeccionTipo":"94","Tipo":"ELEVADOR","IdInspeccionDiaria":"22"},{"idInspeccionTipo":"95","Tipo":"ESPACIO SILLA DE RUEDAS","IdInspeccionDiaria":"22"},{"idInspeccionTipo":"96","Tipo":"RUTERO FRONTAL","IdInspeccionDiaria":"23"},{"idInspeccionTipo":"97","Tipo":"RUTERO LATERAL","IdInspeccionDiaria":"23"},{"idInspeccionTipo":"98","Tipo":"RUTERO TRASERO","IdInspeccionDiaria":"23"},{"idInspeccionTipo":"99","Tipo":"RUTERO TRADICIONAL FRONTAL","IdInspeccionDiaria":"23"},{"idInspeccionTipo":"100","Tipo":"SISTEMA VALIDADOR Y DE ACCESO","IdInspeccionDiaria":"24"},{"idInspeccionTipo":"101","Tipo":"UNIDAD LOGICA","IdInspeccionDiaria":"25"},{"idInspeccionTipo":"102","Tipo":"SECCION FRONTAL","IdInspeccionDiaria":"26"},{"idInspeccionTipo":"103","Tipo":"SECCION TRASERA","IdInspeccionDiaria":"26"},{"idInspeccionTipo":"104","Tipo":"SECCION LATERAL DERECHA","IdInspeccionDiaria":"26"},{"idInspeccionTipo":"105","Tipo":"SECCION LATERAL IZQUIERDA","IdInspeccionDiaria":"26"},{"idInspeccionTipo":"106","Tipo":"INTERIOR DEL VEHICULO","IdInspeccionDiaria":"26"},{"idInspeccionTipo":"107","Tipo":"ASEO","IdInspeccionDiaria":"27"},{"idInspeccionTipo":"108","Tipo":"DOCUMENTOS","IdInspeccionDiaria":"28"}];
var InspeccionDiariaSubGruposPreguntas = [{"idInspeccionItem":"1","Pregunta":"Tapa Faltante","IdInspeccionTipo":"1"},{"idInspeccionItem":"2","Pregunta":"Fuga de combustible por la tapa","IdInspeccionTipo":"1"},{"idInspeccionItem":"3","Pregunta":"Tanque suelto","IdInspeccionTipo":"1"},{"idInspeccionItem":"4","Pregunta":"Se\u00f1al del medidor desconectada\/rota","IdInspeccionTipo":"1"},{"idInspeccionItem":"5","Pregunta":"Tanque rayado o golpeado","IdInspeccionTipo":"1"},{"idInspeccionItem":"6","Pregunta":"Proteccion tanque faltante","IdInspeccionTipo":"1"},{"idInspeccionItem":"7","Pregunta":"Proteccion tanque golpeada, mal estado","IdInspeccionTipo":"1"},{"idInspeccionItem":"8","Pregunta":"Fuga entrada y salida del tanque","IdInspeccionTipo":"2"},{"idInspeccionItem":"9","Pregunta":"Fuga a lo largo de las lineas","IdInspeccionTipo":"2"},{"idInspeccionItem":"10","Pregunta":"Fuga entrada y salida del motor","IdInspeccionTipo":"2"},{"idInspeccionItem":"11","Pregunta":"Fuga entrada y salida","IdInspeccionTipo":"3"},{"idInspeccionItem":"12","Pregunta":"Sedimentador Suelto","IdInspeccionTipo":"3"},{"idInspeccionItem":"13","Pregunta":"Silenciador suelto","IdInspeccionTipo":"4"},{"idInspeccionItem":"14","Pregunta":"Tuberia frontal suelta","IdInspeccionTipo":"5"},{"idInspeccionItem":"15","Pregunta":"Tuberia posterior suelta","IdInspeccionTipo":"5"},{"idInspeccionItem":"16","Pregunta":"Rin sucio","IdInspeccionTipo":"6"},{"idInspeccionItem":"17","Pregunta":"Rin rayado","IdInspeccionTipo":"6"},{"idInspeccionItem":"18","Pregunta":"Rin golpeado \/ doblado","IdInspeccionTipo":"6"},{"idInspeccionItem":"19","Pregunta":"Perno\/ Tuerca faltante","IdInspeccionTipo":"6"},{"idInspeccionItem":"20","Pregunta":"Llanta baja de aire","IdInspeccionTipo":"6"},{"idInspeccionItem":"21","Pregunta":"Llanta golpeada","IdInspeccionTipo":"6"},{"idInspeccionItem":"22","Pregunta":"Llanta labrado deficiente","IdInspeccionTipo":"6"},{"idInspeccionItem":"23","Pregunta":"Rin sucio","IdInspeccionTipo":"7"},{"idInspeccionItem":"24","Pregunta":"Rin rayado","IdInspeccionTipo":"7"},{"idInspeccionItem":"25","Pregunta":"Rin golpeado \/ doblado","IdInspeccionTipo":"7"},{"idInspeccionItem":"26","Pregunta":"Perno\/ Tuerca faltante","IdInspeccionTipo":"7"},{"idInspeccionItem":"27","Pregunta":"Llanta baja de aire","IdInspeccionTipo":"7"},{"idInspeccionItem":"28","Pregunta":"Llanta golpeada","IdInspeccionTipo":"7"},{"idInspeccionItem":"29","Pregunta":"Llanta labrado deficiente","IdInspeccionTipo":"7"},{"idInspeccionItem":"30","Pregunta":"Rin sucio","IdInspeccionTipo":"8"},{"idInspeccionItem":"31","Pregunta":"Rin rayado","IdInspeccionTipo":"8"},{"idInspeccionItem":"32","Pregunta":"Rin golpeado \/ doblado","IdInspeccionTipo":"8"},{"idInspeccionItem":"33","Pregunta":"Perno\/ Tuerca faltante","IdInspeccionTipo":"8"},{"idInspeccionItem":"34","Pregunta":"Llanta baja de aire","IdInspeccionTipo":"8"},{"idInspeccionItem":"35","Pregunta":"Llanta golpeada","IdInspeccionTipo":"8"},{"idInspeccionItem":"36","Pregunta":"Llanta labrado deficiente","IdInspeccionTipo":"8"},{"idInspeccionItem":"37","Pregunta":"Rin sucio","IdInspeccionTipo":"9"},{"idInspeccionItem":"38","Pregunta":"Rin rayado","IdInspeccionTipo":"9"},{"idInspeccionItem":"39","Pregunta":"Rin golpeado \/ doblado","IdInspeccionTipo":"9"},{"idInspeccionItem":"40","Pregunta":"Perno\/ Tuerca faltante","IdInspeccionTipo":"9"},{"idInspeccionItem":"41","Pregunta":"Llanta baja de aire","IdInspeccionTipo":"9"},{"idInspeccionItem":"42","Pregunta":"Llanta golpeada","IdInspeccionTipo":"9"},{"idInspeccionItem":"43","Pregunta":"Llanta labrado deficiente","IdInspeccionTipo":"9"},{"idInspeccionItem":"44","Pregunta":"Rin sucio","IdInspeccionTipo":"10"},{"idInspeccionItem":"45","Pregunta":"Rin rayado","IdInspeccionTipo":"10"},{"idInspeccionItem":"46","Pregunta":"Rin golpeado \/ doblado","IdInspeccionTipo":"10"},{"idInspeccionItem":"47","Pregunta":"Perno\/ Tuerca faltante","IdInspeccionTipo":"10"},{"idInspeccionItem":"48","Pregunta":"Llanta baja de aire","IdInspeccionTipo":"10"},{"idInspeccionItem":"49","Pregunta":"Llanta golpeada","IdInspeccionTipo":"10"},{"idInspeccionItem":"50","Pregunta":"Llanta labrado deficiente","IdInspeccionTipo":"10"},{"idInspeccionItem":"51","Pregunta":"Rin sucio","IdInspeccionTipo":"11"},{"idInspeccionItem":"52","Pregunta":"Rin rayado","IdInspeccionTipo":"11"},{"idInspeccionItem":"53","Pregunta":"Rin golpeado \/ doblado","IdInspeccionTipo":"11"},{"idInspeccionItem":"54","Pregunta":"Perno\/ Tuerca faltante","IdInspeccionTipo":"11"},{"idInspeccionItem":"55","Pregunta":"Llanta baja de aire","IdInspeccionTipo":"11"},{"idInspeccionItem":"56","Pregunta":"Llanta golpeada","IdInspeccionTipo":"11"},{"idInspeccionItem":"57","Pregunta":"Llanta labrado deficiente","IdInspeccionTipo":"11"},{"idInspeccionItem":"58","Pregunta":"Rin sucio","IdInspeccionTipo":"12"},{"idInspeccionItem":"59","Pregunta":"Rin rayado","IdInspeccionTipo":"12"},{"idInspeccionItem":"60","Pregunta":"Rin golpeado \/ doblado","IdInspeccionTipo":"12"},{"idInspeccionItem":"61","Pregunta":"Perno\/ Tuerca faltante","IdInspeccionTipo":"12"},{"idInspeccionItem":"62","Pregunta":"Llanta baja de aire","IdInspeccionTipo":"12"},{"idInspeccionItem":"63","Pregunta":"Llanta golpeada","IdInspeccionTipo":"12"},{"idInspeccionItem":"64","Pregunta":"Llanta labrado deficiente","IdInspeccionTipo":"12"},{"idInspeccionItem":"65","Pregunta":"Eje golpeado","IdInspeccionTipo":"13"},{"idInspeccionItem":"66","Pregunta":"Fugas de aceite","IdInspeccionTipo":"13"},{"idInspeccionItem":"67","Pregunta":"Eje golpeado","IdInspeccionTipo":"14"},{"idInspeccionItem":"68","Pregunta":"Fugas de aceite diferencial","IdInspeccionTipo":"14"},{"idInspeccionItem":"69","Pregunta":"Rodamiento suelto","IdInspeccionTipo":"15"},{"idInspeccionItem":"70","Pregunta":"Buje en mal estado \/ roto","IdInspeccionTipo":"15"},{"idInspeccionItem":"71","Pregunta":"Cuerpo golpeado \/ doblado","IdInspeccionTipo":"15"},{"idInspeccionItem":"72","Pregunta":"Union deficiente o faltante de elemneto de sujecion","IdInspeccionTipo":"15"},{"idInspeccionItem":"73","Pregunta":"Union deficiente o faltante de elemneto de sujecion","IdInspeccionTipo":"15"},{"idInspeccionItem":"74","Pregunta":"Elemento protector caida cardan faltante","IdInspeccionTipo":"15"},{"idInspeccionItem":"75","Pregunta":"Mal funcionamiento general del sistema","IdInspeccionTipo":"16"},{"idInspeccionItem":"76","Pregunta":"Presencia de fugas de aire  en el sistema","IdInspeccionTipo":"16"},{"idInspeccionItem":"77","Pregunta":"Fuga de aire \/presencia de aceite en las campanas del vehiculo","IdInspeccionTipo":"17"},{"idInspeccionItem":"78","Pregunta":"Sensor ABS desconectado","IdInspeccionTipo":"17"},{"idInspeccionItem":"79","Pregunta":"Fuga de aire \/presencia de aceite en las campanas del vehiculo","IdInspeccionTipo":"18"},{"idInspeccionItem":"80","Pregunta":"Sensor ABS desconectado","IdInspeccionTipo":"18"},{"idInspeccionItem":"81","Pregunta":"Tanques sueltos","IdInspeccionTipo":"19"},{"idInspeccionItem":"82","Pregunta":"Tanques golpeados","IdInspeccionTipo":"19"},{"idInspeccionItem":"83","Pregunta":"Lineas rotas","IdInspeccionTipo":"20"},{"idInspeccionItem":"84","Pregunta":"Fuga en los acoples","IdInspeccionTipo":"20"},{"idInspeccionItem":"85","Pregunta":"Valvulas golpeadas","IdInspeccionTipo":"20"},{"idInspeccionItem":"86","Pregunta":"Valvulas sueltas","IdInspeccionTipo":"20"},{"idInspeccionItem":"87","Pregunta":"Guaya Suelta","IdInspeccionTipo":"21"},{"idInspeccionItem":"88","Pregunta":"Guaya Rota","IdInspeccionTipo":"21"},{"idInspeccionItem":"89","Pregunta":"Topes de direccion faltantes","IdInspeccionTipo":"22"},{"idInspeccionItem":"90","Pregunta":"Volante de direccion suelto \/ desajustado","IdInspeccionTipo":"22"},{"idInspeccionItem":"91","Pregunta":"Fuga de aceite caja de direccion","IdInspeccionTipo":"22"},{"idInspeccionItem":"92","Pregunta":"MAL FUNCIONAMIENTO GENERAL DEL SISTEMA","IdInspeccionTipo":"23"},{"idInspeccionItem":"93","Pregunta":"Fuga de aceite","IdInspeccionTipo":"24"},{"idInspeccionItem":"94","Pregunta":"Caja golpeada","IdInspeccionTipo":"24"},{"idInspeccionItem":"95","Pregunta":"Fuga de aceite","IdInspeccionTipo":"25"},{"idInspeccionItem":"96","Pregunta":"Carter golpeado","IdInspeccionTipo":"26"},{"idInspeccionItem":"97","Pregunta":"Carter roto","IdInspeccionTipo":"26"},{"idInspeccionItem":"98","Pregunta":"Fuga de aceite","IdInspeccionTipo":"26"},{"idInspeccionItem":"99","Pregunta":"Ductos de entrada y salida sueltas","IdInspeccionTipo":"27"},{"idInspeccionItem":"100","Pregunta":"Turbo fuera de servicio","IdInspeccionTipo":"27"},{"idInspeccionItem":"101","Pregunta":"Correas Rotas \/ mal estado","IdInspeccionTipo":"28"},{"idInspeccionItem":"102","Pregunta":"Estructura suelta","IdInspeccionTipo":"29"},{"idInspeccionItem":"103","Pregunta":"Tapa Faltante","IdInspeccionTipo":"29"},{"idInspeccionItem":"104","Pregunta":"Ballestas sueltas ( grapas y tuercas)","IdInspeccionTipo":"30"},{"idInspeccionItem":"105","Pregunta":"Ballestas Rotas","IdInspeccionTipo":"30"},{"idInspeccionItem":"106","Pregunta":"Bujes rotos","IdInspeccionTipo":"30"},{"idInspeccionItem":"107","Pregunta":"Amortiguador mal estado","IdInspeccionTipo":"30"},{"idInspeccionItem":"108","Pregunta":"Amortiguador suelto","IdInspeccionTipo":"30"},{"idInspeccionItem":"109","Pregunta":"Ballestas sueltas ( grapas y tuercas)","IdInspeccionTipo":"31"},{"idInspeccionItem":"110","Pregunta":"Ballestas Rotas","IdInspeccionTipo":"31"},{"idInspeccionItem":"111","Pregunta":"Bujes rotos","IdInspeccionTipo":"31"},{"idInspeccionItem":"112","Pregunta":"Amortiguador mal estado","IdInspeccionTipo":"31"},{"idInspeccionItem":"113","Pregunta":"Amortiguador suelto","IdInspeccionTipo":"31"},{"idInspeccionItem":"114","Pregunta":"Baterias sueltas","IdInspeccionTipo":"32"},{"idInspeccionItem":"115","Pregunta":"Conexiones defectuosas","IdInspeccionTipo":"32"},{"idInspeccionItem":"116","Pregunta":"Baterias golpeadas","IdInspeccionTipo":"32"},{"idInspeccionItem":"117","Pregunta":"Fuga de Acido","IdInspeccionTipo":"32"},{"idInspeccionItem":"118","Pregunta":"Bornes sucios mal estado","IdInspeccionTipo":"32"},{"idInspeccionItem":"119","Pregunta":"Verificar encendido del vehiculo (motor de arranque)","IdInspeccionTipo":"33"},{"idInspeccionItem":"120","Pregunta":"VERIFICAR LIQUIDO DE FRENOS","IdInspeccionTipo":"34"},{"idInspeccionItem":"121","Pregunta":"VERIFICAR LIQUIDO DE DIRECCION","IdInspeccionTipo":"34"},{"idInspeccionItem":"122","Pregunta":"VERIFICAR LIQUIDO DE EMBRAGUE **","IdInspeccionTipo":"34"},{"idInspeccionItem":"123","Pregunta":"VERIFICAR NIVEL DE ACEITE DEL MOTOR","IdInspeccionTipo":"34"},{"idInspeccionItem":"124","Pregunta":"VERIFICAR NIVEL DE COMBUSTIBLE","IdInspeccionTipo":"34"},{"idInspeccionItem":"125","Pregunta":"VERIFICAR EL ESTADO DE LOS RECIPIENTES DE ALMACENAMIENTO","IdInspeccionTipo":"34"},{"idInspeccionItem":"126","Pregunta":"VERIFICAR PRECENCIA DE LA TAPA RESPECTIVA A CADA RECIPIENTE","IdInspeccionTipo":"34"},{"idInspeccionItem":"127","Pregunta":"Bomper Rayado","IdInspeccionTipo":"36"},{"idInspeccionItem":"128","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"36"},{"idInspeccionItem":"129","Pregunta":"Bomper pintura mal estado","IdInspeccionTipo":"36"},{"idInspeccionItem":"130","Pregunta":"Bomper suelto","IdInspeccionTipo":"36"},{"idInspeccionItem":"131","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"37"},{"idInspeccionItem":"132","Pregunta":"Bomper pintura mal estado","IdInspeccionTipo":"37"},{"idInspeccionItem":"133","Pregunta":"Bomper Rayado","IdInspeccionTipo":"37"},{"idInspeccionItem":"134","Pregunta":"Bomper suelto","IdInspeccionTipo":"37"},{"idInspeccionItem":"135","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"38"},{"idInspeccionItem":"136","Pregunta":"Bomper pintura en mal estado","IdInspeccionTipo":"38"},{"idInspeccionItem":"137","Pregunta":"Bomper Rayado","IdInspeccionTipo":"38"},{"idInspeccionItem":"138","Pregunta":"Bomper suelto","IdInspeccionTipo":"38"},{"idInspeccionItem":"139","Pregunta":"Persiana golpeada","IdInspeccionTipo":"39"},{"idInspeccionItem":"140","Pregunta":"Persiana Rayada","IdInspeccionTipo":"39"},{"idInspeccionItem":"141","Pregunta":"Persiana suelta","IdInspeccionTipo":"39"},{"idInspeccionItem":"142","Pregunta":"Panel golpeado","IdInspeccionTipo":"40"},{"idInspeccionItem":"143","Pregunta":"Panel pintura mal estado","IdInspeccionTipo":"40"},{"idInspeccionItem":"144","Pregunta":"Panel rayado","IdInspeccionTipo":"40"},{"idInspeccionItem":"145","Pregunta":"Panel roto","IdInspeccionTipo":"40"},{"idInspeccionItem":"146","Pregunta":"Panel golpeado","IdInspeccionTipo":"41"},{"idInspeccionItem":"147","Pregunta":"Panel pintura mal estado","IdInspeccionTipo":"41"},{"idInspeccionItem":"148","Pregunta":"Panel rayado","IdInspeccionTipo":"41"},{"idInspeccionItem":"149","Pregunta":"Panel roto","IdInspeccionTipo":"41"},{"idInspeccionItem":"150","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"42"},{"idInspeccionItem":"151","Pregunta":"Bomper pintura mal estado","IdInspeccionTipo":"42"},{"idInspeccionItem":"152","Pregunta":"Bomper Rayado","IdInspeccionTipo":"42"},{"idInspeccionItem":"153","Pregunta":"Bomper suelto","IdInspeccionTipo":"42"},{"idInspeccionItem":"154","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"43"},{"idInspeccionItem":"155","Pregunta":"Bomper pintura mal estado","IdInspeccionTipo":"43"},{"idInspeccionItem":"156","Pregunta":"Bomper Rayado","IdInspeccionTipo":"43"},{"idInspeccionItem":"157","Pregunta":"Bomper suelto","IdInspeccionTipo":"43"},{"idInspeccionItem":"158","Pregunta":"Panel golpeado","IdInspeccionTipo":"44"},{"idInspeccionItem":"159","Pregunta":"Panel pintura mal estado","IdInspeccionTipo":"44"},{"idInspeccionItem":"160","Pregunta":"Panel rayado","IdInspeccionTipo":"44"},{"idInspeccionItem":"161","Pregunta":"Panel roto","IdInspeccionTipo":"44"},{"idInspeccionItem":"162","Pregunta":"Panel golpeado","IdInspeccionTipo":"45"},{"idInspeccionItem":"163","Pregunta":"Panel pintura mal estado","IdInspeccionTipo":"45"},{"idInspeccionItem":"164","Pregunta":"Panel rayado","IdInspeccionTipo":"45"},{"idInspeccionItem":"165","Pregunta":"Panel roto","IdInspeccionTipo":"45"},{"idInspeccionItem":"166","Pregunta":"Panel golpeado","IdInspeccionTipo":"46"},{"idInspeccionItem":"167","Pregunta":"Panel pintura mal estado","IdInspeccionTipo":"46"},{"idInspeccionItem":"168","Pregunta":"Panel rayado","IdInspeccionTipo":"46"},{"idInspeccionItem":"169","Pregunta":"Panel roto","IdInspeccionTipo":"46"},{"idInspeccionItem":"170","Pregunta":"Panel golpeado","IdInspeccionTipo":"47"},{"idInspeccionItem":"171","Pregunta":"Panel pintura mal estado","IdInspeccionTipo":"47"},{"idInspeccionItem":"172","Pregunta":"Panel rayado","IdInspeccionTipo":"47"},{"idInspeccionItem":"173","Pregunta":"Panel roto","IdInspeccionTipo":"47"},{"idInspeccionItem":"174","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"48"},{"idInspeccionItem":"175","Pregunta":"Bomper pintura mal estado","IdInspeccionTipo":"48"},{"idInspeccionItem":"176","Pregunta":"Bomper Rayado","IdInspeccionTipo":"48"},{"idInspeccionItem":"177","Pregunta":"Bomper suelto","IdInspeccionTipo":"48"},{"idInspeccionItem":"178","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"49"},{"idInspeccionItem":"179","Pregunta":"Bomper pintura mal estado","IdInspeccionTipo":"49"},{"idInspeccionItem":"180","Pregunta":"Bomper Rayado","IdInspeccionTipo":"49"},{"idInspeccionItem":"181","Pregunta":"Bomper suelto","IdInspeccionTipo":"49"},{"idInspeccionItem":"182","Pregunta":"Bomper  golpeado","IdInspeccionTipo":"50"},{"idInspeccionItem":"183","Pregunta":"Bomper pintura mal estado","IdInspeccionTipo":"50"},{"idInspeccionItem":"184","Pregunta":"Bomper Rayado","IdInspeccionTipo":"50"},{"idInspeccionItem":"185","Pregunta":"Bomper suelto","IdInspeccionTipo":"50"},{"idInspeccionItem":"186","Pregunta":"Casco Golpeado","IdInspeccionTipo":"51"},{"idInspeccionItem":"187","Pregunta":"Casco pintura mal estado","IdInspeccionTipo":"51"},{"idInspeccionItem":"188","Pregunta":"Casco Rayado","IdInspeccionTipo":"51"},{"idInspeccionItem":"189","Pregunta":"Espejo fisurado","IdInspeccionTipo":"52"},{"idInspeccionItem":"190","Pregunta":"Espejo manchado","IdInspeccionTipo":"52"},{"idInspeccionItem":"191","Pregunta":"Espejo roto","IdInspeccionTipo":"52"},{"idInspeccionItem":"192","Pregunta":"Espejo fisurado","IdInspeccionTipo":"53"},{"idInspeccionItem":"193","Pregunta":"Espejo manchado","IdInspeccionTipo":"53"},{"idInspeccionItem":"194","Pregunta":"Espejo roto","IdInspeccionTipo":"53"},{"idInspeccionItem":"195","Pregunta":"Direccional derecha no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"196","Pregunta":"Direccional derecha rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"197","Pregunta":"Direccional izquierda no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"198","Pregunta":"Direccional izquierda rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"199","Pregunta":"Luz baja derecha no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"200","Pregunta":"Luz baja derecha presenta baja intensidad","IdInspeccionTipo":"54"},{"idInspeccionItem":"201","Pregunta":"Luz baja derecha rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"202","Pregunta":"Luz baja izquierda no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"203","Pregunta":"Luz baja izquierda presenta baja intensidad","IdInspeccionTipo":"54"},{"idInspeccionItem":"204","Pregunta":"Luz baja izquierda rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"205","Pregunta":"Luz delimitadora superior no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"206","Pregunta":"Luz delimitadora superior presenta baja intensidad","IdInspeccionTipo":"54"},{"idInspeccionItem":"207","Pregunta":"Luz delimitadora superior rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"208","Pregunta":"Luz media derecha baja intensidad","IdInspeccionTipo":"54"},{"idInspeccionItem":"209","Pregunta":"Luz media derecha no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"210","Pregunta":"Luz media derecha rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"211","Pregunta":"Luz media Izquierda baja intensidad","IdInspeccionTipo":"54"},{"idInspeccionItem":"212","Pregunta":"Luz media izquierda no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"213","Pregunta":"Luz media izquierda rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"214","Pregunta":"Luz principal  alta derecha no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"215","Pregunta":"Luz principal  alta derecha rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"216","Pregunta":"Luz principal alta derecha baja intensidad","IdInspeccionTipo":"54"},{"idInspeccionItem":"217","Pregunta":"Luz principal alta Izquierda baja intensidad","IdInspeccionTipo":"54"},{"idInspeccionItem":"218","Pregunta":"Luz principal alta izquierda no enciende","IdInspeccionTipo":"54"},{"idInspeccionItem":"219","Pregunta":"Luz principal alta izquierda rota","IdInspeccionTipo":"54"},{"idInspeccionItem":"220","Pregunta":"Direccional derecha  no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"221","Pregunta":"Direccional derecha rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"222","Pregunta":"Direccional izquierda no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"223","Pregunta":"Direccional izquierda rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"224","Pregunta":"Funcion de estacionamiento no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"225","Pregunta":"Luz de freno derecha no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"226","Pregunta":"Luz de freno derecha rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"227","Pregunta":"Luz de freno izquierda no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"228","Pregunta":"Luz de freno izquierda rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"229","Pregunta":"Luz de reversa derecha no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"230","Pregunta":"Luz de reversa derecha rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"231","Pregunta":"Luz de reversa izquierda no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"232","Pregunta":"Luz de reversa izquierda rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"233","Pregunta":"Luz delimitadora superior baja intensidad","IdInspeccionTipo":"55"},{"idInspeccionItem":"234","Pregunta":"Luz delimitadora superior no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"235","Pregunta":"Luz delimitadora superior rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"236","Pregunta":"Luz placa trasera no enciende","IdInspeccionTipo":"55"},{"idInspeccionItem":"237","Pregunta":"Luz placa trasera rota","IdInspeccionTipo":"55"},{"idInspeccionItem":"238","Pregunta":"Tercer stop no funciona baja intensidad","IdInspeccionTipo":"55"},{"idInspeccionItem":"239","Pregunta":"Tercer stop no funciona","IdInspeccionTipo":"55"},{"idInspeccionItem":"240","Pregunta":"Tercer stop roto","IdInspeccionTipo":"55"},{"idInspeccionItem":"241","Pregunta":"Luces delimitadoras no encienden","IdInspeccionTipo":"56"},{"idInspeccionItem":"242","Pregunta":"Luces delimitadoras rotas","IdInspeccionTipo":"56"},{"idInspeccionItem":"243","Pregunta":"Luces no encienden","IdInspeccionTipo":"56"},{"idInspeccionItem":"244","Pregunta":"Luces rotas","IdInspeccionTipo":"56"},{"idInspeccionItem":"245","Pregunta":"Luces delimitadoras no encienden","IdInspeccionTipo":"57"},{"idInspeccionItem":"246","Pregunta":"Luces delimitadoras rotas","IdInspeccionTipo":"57"},{"idInspeccionItem":"247","Pregunta":"Luces no encienden","IdInspeccionTipo":"57"},{"idInspeccionItem":"248","Pregunta":"Luces rotas","IdInspeccionTipo":"57"},{"idInspeccionItem":"249","Pregunta":"Seguro de cierre no funciona","IdInspeccionTipo":"58"},{"idInspeccionItem":"250","Pregunta":"Tapa inexistente","IdInspeccionTipo":"58"},{"idInspeccionItem":"251","Pregunta":"Tapa rayada","IdInspeccionTipo":"58"},{"idInspeccionItem":"252","Pregunta":"Tapa rota","IdInspeccionTipo":"58"},{"idInspeccionItem":"253","Pregunta":"Seguro de cierre no funciona","IdInspeccionTipo":"59"},{"idInspeccionItem":"254","Pregunta":"Tapa inexistente","IdInspeccionTipo":"59"},{"idInspeccionItem":"255","Pregunta":"Tapa rayada","IdInspeccionTipo":"59"},{"idInspeccionItem":"256","Pregunta":"Tapa rota","IdInspeccionTipo":"59"},{"idInspeccionItem":"257","Pregunta":"Seguro de cierre no funciona","IdInspeccionTipo":"60"},{"idInspeccionItem":"258","Pregunta":"Tapa inexistente","IdInspeccionTipo":"60"},{"idInspeccionItem":"259","Pregunta":"Tapa rayada","IdInspeccionTipo":"60"},{"idInspeccionItem":"260","Pregunta":"Tapa rota","IdInspeccionTipo":"60"},{"idInspeccionItem":"261","Pregunta":"Seguro de cierre no funciona","IdInspeccionTipo":"61"},{"idInspeccionItem":"262","Pregunta":"Tapa inexistente","IdInspeccionTipo":"61"},{"idInspeccionItem":"263","Pregunta":"Tapa rayada","IdInspeccionTipo":"61"},{"idInspeccionItem":"264","Pregunta":"Tapa rota","IdInspeccionTipo":"61"},{"idInspeccionItem":"265","Pregunta":"Seguro de cierre no funciona","IdInspeccionTipo":"62"},{"idInspeccionItem":"266","Pregunta":"Tapa inexistente","IdInspeccionTipo":"62"},{"idInspeccionItem":"267","Pregunta":"Tapa rayada","IdInspeccionTipo":"62"},{"idInspeccionItem":"268","Pregunta":"Tapa rota","IdInspeccionTipo":"62"},{"idInspeccionItem":"269","Pregunta":"Asparsores de agua mal funcionamiento","IdInspeccionTipo":"63"},{"idInspeccionItem":"270","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"63"},{"idInspeccionItem":"271","Pregunta":"Parabrisas no funciona","IdInspeccionTipo":"63"},{"idInspeccionItem":"272","Pregunta":"Vidrio fisurado","IdInspeccionTipo":"63"},{"idInspeccionItem":"273","Pregunta":"Vidrio manchado","IdInspeccionTipo":"63"},{"idInspeccionItem":"274","Pregunta":"Vidrio roto","IdInspeccionTipo":"63"},{"idInspeccionItem":"275","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"64"},{"idInspeccionItem":"276","Pregunta":"Vidrio fisurado","IdInspeccionTipo":"64"},{"idInspeccionItem":"277","Pregunta":"Vidrio manchado","IdInspeccionTipo":"64"},{"idInspeccionItem":"278","Pregunta":"Vidrio roto","IdInspeccionTipo":"64"},{"idInspeccionItem":"279","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"65"},{"idInspeccionItem":"280","Pregunta":"Lame vidrios faltante","IdInspeccionTipo":"65"},{"idInspeccionItem":"281","Pregunta":"Mal funcionamiento manija","IdInspeccionTipo":"65"},{"idInspeccionItem":"282","Pregunta":"Seguro manija faltante","IdInspeccionTipo":"65"},{"idInspeccionItem":"283","Pregunta":"Vidrio fijo fisurado","IdInspeccionTipo":"65"},{"idInspeccionItem":"284","Pregunta":"Vidrio fijo manchado","IdInspeccionTipo":"65"},{"idInspeccionItem":"285","Pregunta":"Vidrio fijo roto","IdInspeccionTipo":"65"},{"idInspeccionItem":"286","Pregunta":"Vidrio movil fisurado","IdInspeccionTipo":"65"},{"idInspeccionItem":"287","Pregunta":"Vidrio movil manchado","IdInspeccionTipo":"65"},{"idInspeccionItem":"288","Pregunta":"Vidrio movil roto","IdInspeccionTipo":"65"},{"idInspeccionItem":"289","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"66"},{"idInspeccionItem":"290","Pregunta":"Lame vidrios faltante","IdInspeccionTipo":"66"},{"idInspeccionItem":"291","Pregunta":"Mal funcionamiento manija","IdInspeccionTipo":"66"},{"idInspeccionItem":"292","Pregunta":"Seguro manija faltante","IdInspeccionTipo":"66"},{"idInspeccionItem":"293","Pregunta":"Vidrio fijo fisurado","IdInspeccionTipo":"66"},{"idInspeccionItem":"294","Pregunta":"Vidrio fijo manchado","IdInspeccionTipo":"66"},{"idInspeccionItem":"295","Pregunta":"Vidrio fijo roto","IdInspeccionTipo":"66"},{"idInspeccionItem":"296","Pregunta":"Vidrio movil fisurado","IdInspeccionTipo":"66"},{"idInspeccionItem":"297","Pregunta":"Vidrio movil manchado","IdInspeccionTipo":"66"},{"idInspeccionItem":"298","Pregunta":"Vidrio movil roto","IdInspeccionTipo":"66"},{"idInspeccionItem":"299","Pregunta":"Asideros rotos","IdInspeccionTipo":"67"},{"idInspeccionItem":"300","Pregunta":"Asideros sueltos","IdInspeccionTipo":"67"},{"idInspeccionItem":"301","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"67"},{"idInspeccionItem":"302","Pregunta":"Escalones con filos \/ seccion levantada \/ rota","IdInspeccionTipo":"67"},{"idInspeccionItem":"303","Pregunta":"Escalones sin recubrimiento","IdInspeccionTipo":"67"},{"idInspeccionItem":"304","Pregunta":"Fuga de aire en el sistema","IdInspeccionTipo":"67"},{"idInspeccionItem":"305","Pregunta":"Luz de cortesia no funciona","IdInspeccionTipo":"67"},{"idInspeccionItem":"306","Pregunta":"Mal funcionamiento de apertura y cierre","IdInspeccionTipo":"67"},{"idInspeccionItem":"307","Pregunta":"Pasadores puerta de emergencia inoperantes","IdInspeccionTipo":"67"},{"idInspeccionItem":"308","Pregunta":"Puerta pintura en mal estado","IdInspeccionTipo":"67"},{"idInspeccionItem":"309","Pregunta":"Vidrios rayados","IdInspeccionTipo":"67"},{"idInspeccionItem":"310","Pregunta":"Vidrios rotos","IdInspeccionTipo":"67"},{"idInspeccionItem":"311","Pregunta":"Asideros rotos","IdInspeccionTipo":"68"},{"idInspeccionItem":"312","Pregunta":"Asideros sueltos","IdInspeccionTipo":"68"},{"idInspeccionItem":"313","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"68"},{"idInspeccionItem":"314","Pregunta":"Escalones con filos \/ seccion levantada \/ rota","IdInspeccionTipo":"68"},{"idInspeccionItem":"315","Pregunta":"Escalones sin recubrimiento","IdInspeccionTipo":"68"},{"idInspeccionItem":"316","Pregunta":"Fuga de aire en el sistema","IdInspeccionTipo":"68"},{"idInspeccionItem":"317","Pregunta":"Luz de cortesia no funciona","IdInspeccionTipo":"68"},{"idInspeccionItem":"318","Pregunta":"Mal funcionamiento de apertura y cierre","IdInspeccionTipo":"68"},{"idInspeccionItem":"319","Pregunta":"Puerta pintura en mal estado","IdInspeccionTipo":"68"},{"idInspeccionItem":"320","Pregunta":"Vidrios rayados","IdInspeccionTipo":"68"},{"idInspeccionItem":"321","Pregunta":"Vidrios rotos","IdInspeccionTipo":"68"},{"idInspeccionItem":"322","Pregunta":"Asideros rotos","IdInspeccionTipo":"69"},{"idInspeccionItem":"323","Pregunta":"Asideros sueltos","IdInspeccionTipo":"69"},{"idInspeccionItem":"324","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"69"},{"idInspeccionItem":"325","Pregunta":"Escalones con filos \/ seccion levantada \/ rota","IdInspeccionTipo":"69"},{"idInspeccionItem":"326","Pregunta":"Escalones sin recubrimiento","IdInspeccionTipo":"69"},{"idInspeccionItem":"327","Pregunta":"Fuga de aire en el sistema","IdInspeccionTipo":"69"},{"idInspeccionItem":"328","Pregunta":"Luz de cortesia no funciona","IdInspeccionTipo":"69"},{"idInspeccionItem":"329","Pregunta":"Mal funcionamiento de apertura y cierre","IdInspeccionTipo":"69"},{"idInspeccionItem":"330","Pregunta":"Puerta pintura en mal estado","IdInspeccionTipo":"69"},{"idInspeccionItem":"331","Pregunta":"Vidrios rayados","IdInspeccionTipo":"69"},{"idInspeccionItem":"332","Pregunta":"Vidrios rotos","IdInspeccionTipo":"69"},{"idInspeccionItem":"333","Pregunta":"Empaques en mal estado","IdInspeccionTipo":"70"},{"idInspeccionItem":"334","Pregunta":"Mal funcionamiento","IdInspeccionTipo":"70"},{"idInspeccionItem":"335","Pregunta":"Manija rota","IdInspeccionTipo":"70"},{"idInspeccionItem":"336","Pregunta":"Manija sistema elevavidrios faltante","IdInspeccionTipo":"70"},{"idInspeccionItem":"337","Pregunta":"Puerta pintura en mal estado","IdInspeccionTipo":"70"},{"idInspeccionItem":"338","Pregunta":"Sistema eleva vidrios mal funcionamiento","IdInspeccionTipo":"70"},{"idInspeccionItem":"339","Pregunta":"Vidrios rayados","IdInspeccionTipo":"70"},{"idInspeccionItem":"340","Pregunta":"Vidrios rotos","IdInspeccionTipo":"70"},{"idInspeccionItem":"341","Pregunta":"Piso manchado","IdInspeccionTipo":"71"},{"idInspeccionItem":"342","Pregunta":"Recubrimiento antideslizante mal estado","IdInspeccionTipo":"71"},{"idInspeccionItem":"343","Pregunta":"Piso manchado","IdInspeccionTipo":"72"},{"idInspeccionItem":"344","Pregunta":"Recubrimiento antideslizante mal estado","IdInspeccionTipo":"72"},{"idInspeccionItem":"345","Pregunta":"Tablero Laterar  rayado","IdInspeccionTipo":"73"},{"idInspeccionItem":"346","Pregunta":"Tablero Laterar manchado","IdInspeccionTipo":"73"},{"idInspeccionItem":"347","Pregunta":"Tablero Laterar roto","IdInspeccionTipo":"73"},{"idInspeccionItem":"348","Pregunta":"Tablero Laterar suelto","IdInspeccionTipo":"73"},{"idInspeccionItem":"349","Pregunta":"Tablero Laterar  rayado","IdInspeccionTipo":"74"},{"idInspeccionItem":"350","Pregunta":"Tablero Laterar manchado","IdInspeccionTipo":"74"},{"idInspeccionItem":"351","Pregunta":"Tablero Laterar roto","IdInspeccionTipo":"74"},{"idInspeccionItem":"352","Pregunta":"Tablero Laterar suelto","IdInspeccionTipo":"74"},{"idInspeccionItem":"353","Pregunta":"Tablero Laterar  rayado","IdInspeccionTipo":"75"},{"idInspeccionItem":"354","Pregunta":"Tablero Laterar manchado","IdInspeccionTipo":"75"},{"idInspeccionItem":"355","Pregunta":"Tablero Laterar roto","IdInspeccionTipo":"75"},{"idInspeccionItem":"356","Pregunta":"Tablero Laterar suelto","IdInspeccionTipo":"75"},{"idInspeccionItem":"357","Pregunta":"Tablero Laterar  rayado","IdInspeccionTipo":"76"},{"idInspeccionItem":"358","Pregunta":"Tablero Laterar manchado","IdInspeccionTipo":"76"},{"idInspeccionItem":"359","Pregunta":"Tablero Laterar roto","IdInspeccionTipo":"76"},{"idInspeccionItem":"360","Pregunta":"Tablero Laterar suelto","IdInspeccionTipo":"76"},{"idInspeccionItem":"361","Pregunta":"Protector parlantes faltante","IdInspeccionTipo":"77"},{"idInspeccionItem":"362","Pregunta":"Protector parlantes mal estado","IdInspeccionTipo":"77"},{"idInspeccionItem":"363","Pregunta":"Techo  roto","IdInspeccionTipo":"77"},{"idInspeccionItem":"364","Pregunta":"Techo rayado","IdInspeccionTipo":"77"},{"idInspeccionItem":"365","Pregunta":"Tercho manchado","IdInspeccionTipo":"77"},{"idInspeccionItem":"366","Pregunta":"Protector parlantes faltante","IdInspeccionTipo":"78"},{"idInspeccionItem":"367","Pregunta":"Protector parlantes mal estado","IdInspeccionTipo":"78"},{"idInspeccionItem":"368","Pregunta":"Techo  roto","IdInspeccionTipo":"78"},{"idInspeccionItem":"369","Pregunta":"Techo rayado","IdInspeccionTipo":"78"},{"idInspeccionItem":"370","Pregunta":"Tercho manchado","IdInspeccionTipo":"78"},{"idInspeccionItem":"371","Pregunta":"Aristas y filos cortantes presentes","IdInspeccionTipo":"79"},{"idInspeccionItem":"372","Pregunta":"Elementos sin recubrimiento","IdInspeccionTipo":"79"},{"idInspeccionItem":"373","Pregunta":"Elementos sueltos","IdInspeccionTipo":"79"},{"idInspeccionItem":"374","Pregunta":"Elementos sin recubrimiento","IdInspeccionTipo":"80"},{"idInspeccionItem":"375","Pregunta":"Elementos sin recubrimiento","IdInspeccionTipo":"80"},{"idInspeccionItem":"376","Pregunta":"Elementos sueltos","IdInspeccionTipo":"80"},{"idInspeccionItem":"377","Pregunta":"Sillas con grafitis o manchadas","IdInspeccionTipo":"81"},{"idInspeccionItem":"378","Pregunta":"Sillas preferenciales  sin cinturon de seguridad","IdInspeccionTipo":"81"},{"idInspeccionItem":"379","Pregunta":"Sillas rotas","IdInspeccionTipo":"81"},{"idInspeccionItem":"380","Pregunta":"Sillas sueltas","IdInspeccionTipo":"81"},{"idInspeccionItem":"381","Pregunta":"Sillas con grafitis o manchadas","IdInspeccionTipo":"82"},{"idInspeccionItem":"382","Pregunta":"Sillas preferenciales  sin cinturon de seguridad","IdInspeccionTipo":"82"},{"idInspeccionItem":"383","Pregunta":"Sillas rotas","IdInspeccionTipo":"82"},{"idInspeccionItem":"384","Pregunta":"Sillas sueltas","IdInspeccionTipo":"82"},{"idInspeccionItem":"385","Pregunta":"Timbre en mal funcionamiento","IdInspeccionTipo":"83"},{"idInspeccionItem":"386","Pregunta":"Timbre rotos","IdInspeccionTipo":"83"},{"idInspeccionItem":"387","Pregunta":"Luces baja intensidad","IdInspeccionTipo":"84"},{"idInspeccionItem":"388","Pregunta":"Luces no encienden","IdInspeccionTipo":"84"},{"idInspeccionItem":"389","Pregunta":"Proteccion luces rota","IdInspeccionTipo":"84"},{"idInspeccionItem":"390","Pregunta":"Luces baja intensidad","IdInspeccionTipo":"85"},{"idInspeccionItem":"391","Pregunta":"Luces no encienden","IdInspeccionTipo":"85"},{"idInspeccionItem":"392","Pregunta":"Proteccion luces rota","IdInspeccionTipo":"85"},{"idInspeccionItem":"393","Pregunta":"Luces baja intensidad","IdInspeccionTipo":"86"},{"idInspeccionItem":"394","Pregunta":"Luces no encienden","IdInspeccionTipo":"86"},{"idInspeccionItem":"395","Pregunta":"Proteccion luces rota","IdInspeccionTipo":"86"},{"idInspeccionItem":"396","Pregunta":"Informador no funciona","IdInspeccionTipo":"87"},{"idInspeccionItem":"397","Pregunta":"Informador Roto","IdInspeccionTipo":"87"},{"idInspeccionItem":"398","Pregunta":"Cinturon de seguridad en mal estado","IdInspeccionTipo":"88"},{"idInspeccionItem":"399","Pregunta":"Parasol en mal estado","IdInspeccionTipo":"88"},{"idInspeccionItem":"400","Pregunta":"Parasol faltante","IdInspeccionTipo":"88"},{"idInspeccionItem":"401","Pregunta":"Silla desajustada","IdInspeccionTipo":"88"},{"idInspeccionItem":"402","Pregunta":"Silla rota","IdInspeccionTipo":"88"},{"idInspeccionItem":"403","Pregunta":"Tapiceria en mal estado","IdInspeccionTipo":"88"},{"idInspeccionItem":"404","Pregunta":"Barra de cambios mal estado","IdInspeccionTipo":"89"},{"idInspeccionItem":"405","Pregunta":"Desempa\u00f1ador mal funcionamiento","IdInspeccionTipo":"89"},{"idInspeccionItem":"406","Pregunta":"Guardapolvo barra de cambios faltante","IdInspeccionTipo":"89"},{"idInspeccionItem":"407","Pregunta":"Odometro no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"408","Pregunta":"Palanca \/ switch freno de parqueo mal estado","IdInspeccionTipo":"89"},{"idInspeccionItem":"409","Pregunta":"Palancas \/ switch accionamiento limpiabrisas no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"410","Pregunta":"Palancas \/ switch accionamiento luces no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"411","Pregunta":"Panel \/ Millare roto","IdInspeccionTipo":"89"},{"idInspeccionItem":"412","Pregunta":"Pedal acelerador mal estado","IdInspeccionTipo":"89"},{"idInspeccionItem":"413","Pregunta":"Pedal embrague mal estado","IdInspeccionTipo":"89"},{"idInspeccionItem":"414","Pregunta":"Pedal freno mal estado","IdInspeccionTipo":"89"},{"idInspeccionItem":"415","Pregunta":"Pito mal funcionamiento","IdInspeccionTipo":"89"},{"idInspeccionItem":"416","Pregunta":"Presion PSI \/ BAR no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"417","Pregunta":"Tacometro no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"418","Pregunta":"Temperatura motor no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"419","Pregunta":"Testigo baja nivel de aceite no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"420","Pregunta":"Testigo direccionales no funcionan","IdInspeccionTipo":"89"},{"idInspeccionItem":"421","Pregunta":"Testigo falla de motor no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"422","Pregunta":"Testigo freno de parqueo no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"423","Pregunta":"Testigo luces no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"424","Pregunta":"Testigo nivel de combustible no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"425","Pregunta":"Testigo temperatura alta no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"426","Pregunta":"Velocimetro no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"427","Pregunta":"Volante desajustado","IdInspeccionTipo":"89"},{"idInspeccionItem":"428","Pregunta":"Volante en mal estado","IdInspeccionTipo":"89"},{"idInspeccionItem":"429","Pregunta":"Voltimetro no funciona","IdInspeccionTipo":"89"},{"idInspeccionItem":"430","Pregunta":"Elementos de fijacion rotos","IdInspeccionTipo":"90"},{"idInspeccionItem":"431","Pregunta":"Extintor faltante","IdInspeccionTipo":"90"},{"idInspeccionItem":"432","Pregunta":"Extintor vencido \/ sin carga","IdInspeccionTipo":"90"},{"idInspeccionItem":"433","Pregunta":"Clarabolla inoperante","IdInspeccionTipo":"91"},{"idInspeccionItem":"434","Pregunta":"Elemento de fragmentacion o expulsion faltantes","IdInspeccionTipo":"92"},{"idInspeccionItem":"435","Pregunta":"Mal funcionamiento","IdInspeccionTipo":"93"},{"idInspeccionItem":"436","Pregunta":"Piso sin recubrimiento","IdInspeccionTipo":"93"},{"idInspeccionItem":"437","Pregunta":"Mal funcionamiento","IdInspeccionTipo":"94"},{"idInspeccionItem":"438","Pregunta":"Piso sin recubrimiento","IdInspeccionTipo":"94"},{"idInspeccionItem":"439","Pregunta":"Cinturon en mal estado","IdInspeccionTipo":"95"},{"idInspeccionItem":"440","Pregunta":"Cinturones faltantes","IdInspeccionTipo":"95"},{"idInspeccionItem":"441","Pregunta":"Piso sin recubrimiento","IdInspeccionTipo":"95"},{"idInspeccionItem":"442","Pregunta":"Timbre no funciona","IdInspeccionTipo":"95"},{"idInspeccionItem":"443","Pregunta":"Rutero no funciona","IdInspeccionTipo":"96"},{"idInspeccionItem":"444","Pregunta":"Rutero Roto","IdInspeccionTipo":"96"},{"idInspeccionItem":"445","Pregunta":"Rutero no funciona","IdInspeccionTipo":"97"},{"idInspeccionItem":"446","Pregunta":"Rutero Roto","IdInspeccionTipo":"97"},{"idInspeccionItem":"447","Pregunta":"Rutero no funciona","IdInspeccionTipo":"98"},{"idInspeccionItem":"448","Pregunta":"Rutero Roto","IdInspeccionTipo":"98"},{"idInspeccionItem":"449","Pregunta":"Rutero mal estado","IdInspeccionTipo":"99"},{"idInspeccionItem":"450","Pregunta":"Rutero Roto","IdInspeccionTipo":"99"},{"idInspeccionItem":"451","Pregunta":"Estructura suelta \/ mal estado","IdInspeccionTipo":"100"},{"idInspeccionItem":"452","Pregunta":"Sensor de lectura mal funcionamiento","IdInspeccionTipo":"100"},{"idInspeccionItem":"453","Pregunta":"Torniquete mal funcionamiento","IdInspeccionTipo":"100"},{"idInspeccionItem":"454","Pregunta":"Unidad golpeada","IdInspeccionTipo":"101"},{"idInspeccionItem":"455","Pregunta":"Unidad mal funcionamiento","IdInspeccionTipo":"101"},{"idInspeccionItem":"456","Pregunta":"Unidad no enciende","IdInspeccionTipo":"101"},{"idInspeccionItem":"457","Pregunta":"Unidad rota","IdInspeccionTipo":"101"},{"idInspeccionItem":"458","Pregunta":"Cinta reflectiva delimitadora  en mal estado","IdInspeccionTipo":"102"},{"idInspeccionItem":"459","Pregunta":"Cinta reflectiva delimitadora faltante","IdInspeccionTipo":"102"},{"idInspeccionItem":"460","Pregunta":"Placa del vehiculo mal estado","IdInspeccionTipo":"102"},{"idInspeccionItem":"461","Pregunta":"Vinilo accesibilidad faltante","IdInspeccionTipo":"102"},{"idInspeccionItem":"462","Pregunta":"Vinilo accesibilidad mal estado","IdInspeccionTipo":"102"},{"idInspeccionItem":"463","Pregunta":"Vinilos numero operacional faltante","IdInspeccionTipo":"102"},{"idInspeccionItem":"464","Pregunta":"Vinilos numero operacional mal estado","IdInspeccionTipo":"102"},{"idInspeccionItem":"465","Pregunta":"Cinta reflectiva delimitadora  en mal estado","IdInspeccionTipo":"103"},{"idInspeccionItem":"466","Pregunta":"Cinta reflectiva delimitadora faltante","IdInspeccionTipo":"103"},{"idInspeccionItem":"467","Pregunta":"Placa del vehiculo mal estado","IdInspeccionTipo":"103"},{"idInspeccionItem":"468","Pregunta":"Vinilo accesibilidad faltante","IdInspeccionTipo":"103"},{"idInspeccionItem":"469","Pregunta":"Vinilo accesibilidad mal estado","IdInspeccionTipo":"103"},{"idInspeccionItem":"470","Pregunta":"Vinilos numero operacional faltante","IdInspeccionTipo":"103"},{"idInspeccionItem":"471","Pregunta":"Vinilos numero operacional mal estado","IdInspeccionTipo":"103"},{"idInspeccionItem":"472","Pregunta":"Cinta reflectiva delimitadora  en mal estado","IdInspeccionTipo":"104"},{"idInspeccionItem":"473","Pregunta":"Cinta reflectiva delimitadora faltante","IdInspeccionTipo":"104"},{"idInspeccionItem":"474","Pregunta":"Vinilo accesibilidad faltante","IdInspeccionTipo":"104"},{"idInspeccionItem":"475","Pregunta":"Vinilo accesibilidad mal estado","IdInspeccionTipo":"104"},{"idInspeccionItem":"476","Pregunta":"Vinilo Placa del vehiculo mal estado","IdInspeccionTipo":"104"},{"idInspeccionItem":"477","Pregunta":"Vinilos numero operacional faltante","IdInspeccionTipo":"104"},{"idInspeccionItem":"478","Pregunta":"Vinilos numero operacional mal estado","IdInspeccionTipo":"104"},{"idInspeccionItem":"479","Pregunta":"Cinta reflectiva delimitadora  en mal estado","IdInspeccionTipo":"105"},{"idInspeccionItem":"480","Pregunta":"Cinta reflectiva delimitadora faltante","IdInspeccionTipo":"105"},{"idInspeccionItem":"481","Pregunta":"Vinilo accesibilidad faltante","IdInspeccionTipo":"105"},{"idInspeccionItem":"482","Pregunta":"Vinilo accesibilidad mal estado","IdInspeccionTipo":"105"},{"idInspeccionItem":"483","Pregunta":"Vinilo Placa del vehiculo mal estado","IdInspeccionTipo":"105"},{"idInspeccionItem":"484","Pregunta":"Vinilos numero operacional faltante","IdInspeccionTipo":"105"},{"idInspeccionItem":"485","Pregunta":"Vinilos numero operacional mal estado","IdInspeccionTipo":"105"},{"idInspeccionItem":"486","Pregunta":"Mapa esquema de ruta faltante","IdInspeccionTipo":"106"},{"idInspeccionItem":"487","Pregunta":"Mapa esquema de ruta mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"488","Pregunta":"Placa codigo de identificacion mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"489","Pregunta":"Placa codigo de indentificacion faltante","IdInspeccionTipo":"106"},{"idInspeccionItem":"490","Pregunta":"Se\u00f1alizacion de restricciones faltante","IdInspeccionTipo":"106"},{"idInspeccionItem":"491","Pregunta":"Se\u00f1alizacion de restricciones mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"492","Pregunta":"Se\u00f1alizacion espacio silla de ruedas faltante","IdInspeccionTipo":"106"},{"idInspeccionItem":"493","Pregunta":"Se\u00f1alizacion extintores faltante","IdInspeccionTipo":"106"},{"idInspeccionItem":"494","Pregunta":"Se\u00f1alizacion extintores mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"495","Pregunta":"Se\u00f1alizacion salidas de emergencia faltantes","IdInspeccionTipo":"106"},{"idInspeccionItem":"496","Pregunta":"Se\u00f1alizacion salidas de emergencia mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"497","Pregunta":"Se\u00f1alizacion silla de ruedas mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"498","Pregunta":"Se\u00f1alizacion sillas preferenciales faltante","IdInspeccionTipo":"106"},{"idInspeccionItem":"499","Pregunta":"Se\u00f1alizacion sillas preferenciales mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"500","Pregunta":"Vinilo capacidad de pasajeros en mal estado","IdInspeccionTipo":"106"},{"idInspeccionItem":"501","Pregunta":"Vinilo capacidad de pasajeros faltante","IdInspeccionTipo":"106"},{"idInspeccionItem":"502","Pregunta":"CAROCERIA SUCIA","IdInspeccionTipo":"107"},{"idInspeccionItem":"503","Pregunta":"ESPEJOS SUCIOS","IdInspeccionTipo":"107"},{"idInspeccionItem":"504","Pregunta":"HABITACULO CONDUCTOR SUCIO","IdInspeccionTipo":"107"},{"idInspeccionItem":"505","Pregunta":"INTERIOR SUCIO","IdInspeccionTipo":"107"},{"idInspeccionItem":"506","Pregunta":"LUCES SUCIAS","IdInspeccionTipo":"107"},{"idInspeccionItem":"507","Pregunta":"RINES SUCIOS","IdInspeccionTipo":"107"},{"idInspeccionItem":"508","Pregunta":"SILLAS SUCIAS","IdInspeccionTipo":"107"},{"idInspeccionItem":"509","Pregunta":"VIDRIOS SUCIOS","IdInspeccionTipo":"107"},{"idInspeccionItem":"510","Pregunta":"LICENCIA DE TRANSITO FALTANTE \/ VENCIDA","IdInspeccionTipo":"108"},{"idInspeccionItem":"511","Pregunta":"REVISION TECNICOMECANICA FALTANTE \/ VENCIDA","IdInspeccionTipo":"108"},{"idInspeccionItem":"512","Pregunta":"SEGURO OBLIGATORIO SOAT FALTANTE \/ VENCIDO","IdInspeccionTipo":"108"},{"idInspeccionItem":"513","Pregunta":"SEGURO RESPONSABILIDAD CIVIL FALTANTE \/ VENCIDO","IdInspeccionTipo":"108"},{"idInspeccionItem":"514","Pregunta":"TARJETA DE OPERACI\u00d3N FALTANTE \/ VENCIDA","IdInspeccionTipo":"108"}];

var InspeccionPeriodica = [{"Id":"1001","Nombre":"DOCUMENTOS"},{"Id":"1002","Nombre":"ASIENTO CONDUCTOR"},{"Id":"1003","Nombre":"PANEL DE INSTRUMENTOS**"},{"Id":"1004","Nombre":"VIDRIOS PANOR\u00c1MICOS"},{"Id":"1005","Nombre":"VENTANAS"},{"Id":"1006","Nombre":"SE\u00d1ALIZACI\u00d3N"},{"Id":"1007","Nombre":"PUERTAS**"},{"Id":"1008","Nombre":"SILLAS PASAJEROS"},{"Id":"2001","Nombre":"PANELES LATERALES Y BARRERAS DE PROTECCI\u00d3N."},{"Id":"2002","Nombre":"PASAMANOS Y ASIDEROS"},{"Id":"2003","Nombre":"PISO PLATAFORMA"},{"Id":"2004","Nombre":"TECHO INTERNO Y LATERALES"},{"Id":"2005","Nombre":"CLARABOYAS"},{"Id":"2006","Nombre":"TIMBRE PARA SOLICITUD DE PARADA"},{"Id":"2007","Nombre":"ASEO"},{"Id":"3001","Nombre":"RUTEROS "},{"Id":"3002","Nombre":"CAJA DE CONTROL Y DE FUSIBLES"},{"Id":"3003","Nombre":"ILUMINACI\u00d3N INTERIOR"},{"Id":"3004","Nombre":"EQUIPO AUXILIAR"},{"Id":"3005","Nombre":"CABLEADO"},{"Id":"3006","Nombre":"BATER\u00cdAS"},{"Id":"4001","Nombre":"UNIDAD L\u00d3GICA Y PANTALLA DE INTERACCI\u00d3N"},{"Id":"4002","Nombre":"UNIDAD L\u00d3GICA, CONSOLA Y RECEPTOR GPS"},{"Id":"5001","Nombre":"FUNCIONAMIENTO DE LAS PUERTAS EN CASO DE EMERGENCIA)**"},{"Id":"5002","Nombre":"SALIDAS DE EMERGENCIA"},{"Id":"5003","Nombre":"EXTINTORES"},{"Id":"5004","Nombre":"VARIOS"},{"Id":"6001","Nombre":"NIVELES"},{"Id":"6002","Nombre":"CORREAS DE TRANSMISI\u00d3N"},{"Id":"6003","Nombre":"MOTOR"},{"Id":"6004","Nombre":"MANGUERAS DE ADMISI\u00d3N DE AIRE"},{"Id":"6005","Nombre":"FILTRO DE AIRE"},{"Id":"6006","Nombre":"RADIADOR"},{"Id":"6007","Nombre":"INTERCOOLER"},{"Id":"6008","Nombre":"VENTILADOR"},{"Id":"6010","Nombre":"COMPRESOR"},{"Id":"6011","Nombre":"TURBOCOMPRESOR"},{"Id":"6012","Nombre":"SISTEMA DE ESCAPE"},{"Id":"7001","Nombre":"SISTEMA DE COMBUSTIBLE"},{"Id":"7002","Nombre":"TANQUE"},{"Id":"8001","Nombre":"CAJA DE VELOCIDADES"},{"Id":"8002","Nombre":"\u00c1RBOL DE TRANSMISI\u00d3N"},{"Id":"8003","Nombre":"CARDAN"},{"Id":"8004","Nombre":"EJE TRASERO "},{"Id":"9001","Nombre":"BALLESTAS Y AMORTIGUADORES"},{"Id":"9002","Nombre":"SUSPENSI\u00d3N NEUM\u00c1TICA"},{"Id":"9003","Nombre":"BARRAS DE TORSI\u00d3N Y DE REACCI\u00d3N"},{"Id":"9004","Nombre":"BARRAS ESTABILIZADORAS"},{"Id":"10001","Nombre":"LLANTAS Y RINES"},{"Id":"10002","Nombre":"EJE DELANTERO"},{"Id":"10003","Nombre":"DIRECCI\u00d3N"},{"Id":"10004","Nombre":"JUNTAS ESF\u00c9RICAS Y R\u00d3TULAS DE LA DIRECCI\u00d3N"},{"Id":"11101","Nombre":"PASTILLAS DE LOS FRENOS"},{"Id":"11102","Nombre":"DISCOS DE FRENO"},{"Id":"11103","Nombre":"SENSOR DESGASTE DE PASTILLAS"},{"Id":"11104","Nombre":"MORDAZAS FRENOS"},{"Id":"11105","Nombre":"AJUSTADORES"},{"Id":"11106","Nombre":"ZAPATAS Y CAMPANAS "},{"Id":"11107","Nombre":"TANQUES DE AIRE DEL SISTEMA DE FRENOS NEUM\u00c1TICO"},{"Id":"11108","Nombre":"SE\u00d1AL DE ADVERTENCIA DE BAJA PRESI\u00d3N"},{"Id":"11109","Nombre":"MANGUERAS DEL SISTEMA NEUM\u00c1TICO"},{"Id":"11110","Nombre":"V\u00c1LVULAS DEL SISTEMA NEUM\u00c1TICO"},{"Id":"11111","Nombre":"C\u00c1MARAS DE AIRE"},{"Id":"11112","Nombre":"SISTEMA DE FRENOS HIDR\u00c1ULICO"},{"Id":"11113","Nombre":"ELEMENTOS SISTEMA DE FRENOS"},{"Id":"11114","Nombre":"SENSORES DE ABS"},{"Id":"11115","Nombre":"MATERIAL DE FRICCI\u00d3N"},{"Id":"11116","Nombre":"FRENO DE AHOGO"},{"Id":"11201","Nombre":"PRUEBA DE ESTANQUEIDAD SISTEMA DE ACCIONAMIENTO NEUM\u00c1TICO DE FRENOS "},{"Id":"11202","Nombre":"TIEMPO DE CARGA DEL AIRE (SISTEMA DE ACCIONAMIENTO NEUM\u00c1TICO DE FRENOS)"},{"Id":"11203","Nombre":"FRENO DE AHOGO"},{"Id":"11301","Nombre":"FUNCIONAMIENTO DE LOS FRENOS"},{"Id":"11302","Nombre":"FUNCIONAMIENTO DEL ABS"},{"Id":"12001","Nombre":"FRONTAL"},{"Id":"12002","Nombre":"LATERALES"},{"Id":"12003","Nombre":"TRASERA"},{"Id":"12004","Nombre":"PARTE INFERIOR DE LA CARROCERIA"},{"Id":"12005","Nombre":"ASEO"},{"Id":"13001","Nombre":"PLATAFORMA ACCESO DISCAPACITADOS"},{"Id":"13002","Nombre":"ESPACIO PARA DISCAPACITADOS EN SILLA DE RUEDAS"},{"Id":"13003","Nombre":"SILLAS PREFERENCIALES"}] ;
var InspeccionPeriodicaPreguntas = [{"Id":"1","IdInspeccionPeriodica":"1001","Nombre":"Seguro obligatorio SOAT"},{"Id":"2","IdInspeccionPeriodica":"1001","Nombre":"Licencia de tr\u00e1nsito"},{"Id":"3","IdInspeccionPeriodica":"1001","Nombre":"Revisi\u00f3n t\u00e9cnico mec\u00e1nica"},{"Id":"4","IdInspeccionPeriodica":"1001","Nombre":"Seguro de responsabilidad civil"},{"Id":"5","IdInspeccionPeriodica":"1001","Nombre":"Tarjeta de operaci\u00f3n"},{"Id":"6","IdInspeccionPeriodica":"1001","Nombre":"Tarjeta de operaci\u00f3n de TRANSMILENIO"},{"Id":"7","IdInspeccionPeriodica":"1002","Nombre":" Verificar manualmente el funcionamiento y estado del cintur\u00f3n de seguridad, funcionamiento del sistema retr\u00e1ctil (si lo tiene), estado de las hebillas y cinta, comprobar estado de fijaci\u00f3n de los anclajes."},{"Id":"8","IdInspeccionPeriodica":"1002","Nombre":" Revisar el funcionamiento de la alarma visual y sonora, que se active en el caso en el cual el conductor inicie el movimiento del veh\u00edculo sin la utilizaci\u00f3n de los cinturones de seguridad."},{"Id":"9","IdInspeccionPeriodica":"1002","Nombre":" Revisar el estado y ajuste del volante, palanca de freno de mergencia, columna de la direcci\u00f3n y las palancas de control de luces direccionales, limpia parabrisas, etc."},{"Id":"10","IdInspeccionPeriodica":"1002","Nombre":" Revisar el estado de los pedales, millar\u00e9 y parasoles."},{"Id":"11","IdInspeccionPeriodica":"1002","Nombre":" Examinar el estado y fijaci\u00f3n de la silla del conductor y de los espejos internos."},{"Id":"12","IdInspeccionPeriodica":"1002","Nombre":" Verificar el funcionamiento de la amortiguaci\u00f3n hidr\u00e1ulica o neum\u00e1tica regulable, verificar la regulaci\u00f3n horizontal, vertical y del espaldar las cuales deben permitir como m\u00ednimo un movimiento horizontal de m\u00e1s o menos 150 mil\u00edmetros en el eje longitudinal, un movimiento vertical de m\u00e1s o menos 100 mil\u00edmetros en el eje vertical y un \u00e1ngulo de inclinaci\u00f3n del espaldar de entre 0 y 20 grados medidos respecto a la vertical."},{"Id":"13","IdInspeccionPeriodica":"1003","Nombre":"Indicadores Nivel de combustible"},{"Id":"14","IdInspeccionPeriodica":"1003","Nombre":"Indicadores Tac\u00f3metro"},{"Id":"15","IdInspeccionPeriodica":"1003","Nombre":"Indicadores Veloc\u00edmetro"},{"Id":"16","IdInspeccionPeriodica":"1003","Nombre":"Indicadores Man\u00f3metros"},{"Id":"17","IdInspeccionPeriodica":"1003","Nombre":"Indicadores Temperatura motor"},{"Id":"18","IdInspeccionPeriodica":"1003","Nombre":"Indicadores Volt\u00edmetro"},{"Id":"19","IdInspeccionPeriodica":"1003","Nombre":"Indicadores Od\u00f3metro"},{"Id":"20","IdInspeccionPeriodica":"1003","Nombre":"Testigos Bajo nivel de combustible"},{"Id":"21","IdInspeccionPeriodica":"1003","Nombre":"Testigos Alta temperatura motor"},{"Id":"22","IdInspeccionPeriodica":"1003","Nombre":"Testigos Baja presi\u00f3n aceite"},{"Id":"23","IdInspeccionPeriodica":"1003","Nombre":"Testigos Luces (bajas y altas)"},{"Id":"24","IdInspeccionPeriodica":"1003","Nombre":"Testigos Luz freno y reversa"},{"Id":"25","IdInspeccionPeriodica":"1003","Nombre":"Testigos Freno de parqueo"},{"Id":"26","IdInspeccionPeriodica":"1003","Nombre":"Testigos Luces direccionales"},{"Id":"27","IdInspeccionPeriodica":"1003","Nombre":"Testigos ABS"},{"Id":"28","IdInspeccionPeriodica":"1003","Nombre":"Testigos Luces parqueo"},{"Id":"29","IdInspeccionPeriodica":"1003","Nombre":"Testigos Puertas abiertas"},{"Id":"30","IdInspeccionPeriodica":"1003","Nombre":"Testigos Cintur\u00f3n de seguridad"},{"Id":"31","IdInspeccionPeriodica":"1003","Nombre":"Testigos Falla de motor"},{"Id":"32","IdInspeccionPeriodica":"1003","Nombre":"Testigos Desgaste pastillas"},{"Id":"33","IdInspeccionPeriodica":"1003","Nombre":"Testigos Solicitud de parada"},{"Id":"34","IdInspeccionPeriodica":"1003","Nombre":"Testigos Freno de servicio"},{"Id":"35","IdInspeccionPeriodica":"1003","Nombre":"Testigos Bater\u00edas (alternador)"},{"Id":"36","IdInspeccionPeriodica":"1004","Nombre":" Inspeccionar internamente los vidrios panor\u00e1micos delantero (parabrisas) y trasero, as\u00ed como el estado de los cauchos de fijaci\u00f3n."},{"Id":"37","IdInspeccionPeriodica":"1004","Nombre":" Revisar que los vidrios panor\u00e1micos no presenten marcas de impactos, que no est\u00e9n vencidos, que no est\u00e9n rayados obstaculizando el campo normal de visualizaci\u00f3n del conductor."},{"Id":"38","IdInspeccionPeriodica":"1005","Nombre":" Inspeccionar internamente el estado de los vidrios de todas las ventanas, revisar la fijaci\u00f3n de todas ellas y los empaques."},{"Id":"39","IdInspeccionPeriodica":"1005","Nombre":" Verificar el funcionamiento de las ventanas m\u00f3viles y que cuenten con los lamevidrios, felpas, cauchos y manijas."},{"Id":"40","IdInspeccionPeriodica":"1005","Nombre":" Comprobar que los vidrios de todas las ventanas se encuentren sin marcas de impactos."},{"Id":"41","IdInspeccionPeriodica":"1006","Nombre":" Verificar se\u00f1alizaci\u00f3n al interior del m\u00f3vil seg\u00fan manual de imagen, revisar estado de adhesivos y policarbonatos."},{"Id":"42","IdInspeccionPeriodica":"1007","Nombre":" Verificar si las puertas abren y cierran seg\u00fan el tiempo preestablecido (2 seg.) y si hay amortiguaci\u00f3n al final del recorrido."},{"Id":"43","IdInspeccionPeriodica":"1007","Nombre":" Comprobar el perfecto estado de los empaques de las puertas."},{"Id":"44","IdInspeccionPeriodica":"1007","Nombre":" Verificar el estado de los vidrios de las puertas."},{"Id":"45","IdInspeccionPeriodica":"1007","Nombre":" Comprobar el perfecto estado de la pintura interior de las puertas y la fijaci\u00f3n de los asideros."},{"Id":"46","IdInspeccionPeriodica":"1007","Nombre":" Verificar el estado de los soportes del (los) cilindro(s) y las articulaciones del sistema de apertura."},{"Id":"47","IdInspeccionPeriodica":"1007","Nombre":" Revisar que no haya fugas de aire en las mangueras o en el cilindro."},{"Id":"48","IdInspeccionPeriodica":"1007","Nombre":" Verificar las v\u00e1lvulas de cierre y de apertura en caso de emergencia."},{"Id":"49","IdInspeccionPeriodica":"1007","Nombre":" Verificar el funcionamiento de la chapa y puerta del conductor."},{"Id":"50","IdInspeccionPeriodica":"1008","Nombre":" Verificar uno a uno el estado de fijaci\u00f3n de las sillas."},{"Id":"51","IdInspeccionPeriodica":"1008","Nombre":" Verificar el estado f\u00edsico de la silla, debe estar libre de filos, aristas o de cualquier elemento corto punzante que pueda provocar lesiones a los pasajeros."},{"Id":"52","IdInspeccionPeriodica":"1008","Nombre":" Los asientos para pasajeros adyacentes al pasillo central deben poseer pasamanos o asideros de sujeci\u00f3n laterales que faciliten a los ni\u00f1os una sujeci\u00f3n firme y segura, estos pasamanos o asideros no deben afectar el ancho libre de pasillo establecido."},{"Id":"53","IdInspeccionPeriodica":"2001","Nombre":" Verificar el estado de fijaci\u00f3n de los paneles."},{"Id":"54","IdInspeccionPeriodica":"2001","Nombre":" Revisar fijaci\u00f3n de las mamparas."},{"Id":"55","IdInspeccionPeriodica":"2001","Nombre":" Verificar que no presenten deterioro o roturas."},{"Id":"56","IdInspeccionPeriodica":"2001","Nombre":" Verificar el estado de los tubos (estructura) que est\u00e1n al rededor de las mamparas y las aseguran."},{"Id":"57","IdInspeccionPeriodica":"2002","Nombre":" Verificar el estado de los pasamanos y asideros."},{"Id":"58","IdInspeccionPeriodica":"2002","Nombre":" Comprobar una correcta fijaci\u00f3n en los soportes de los pasamanos."},{"Id":"59","IdInspeccionPeriodica":"2002","Nombre":" Verificar que est\u00e9n libres de filos, aristas o de cualquier elemento corto punzante que pueda provocar lesiones a los pasajeros."},{"Id":"60","IdInspeccionPeriodica":"2003","Nombre":" Verificar el estado del piso de la plataforma y los escalones de acceso. Debe ser antideslizante, no debe presentar agujeros, ni obst\u00e1culos que puedan ocasionar lesiones o accidentes."},{"Id":"61","IdInspeccionPeriodica":"2004","Nombre":" Comprobar el estado de la tapicer\u00eda o recubrimiento."},{"Id":"62","IdInspeccionPeriodica":"2004","Nombre":" Verificar el estado de las rejillas de ventilaci\u00f3n y los parlantes de audio."},{"Id":"63","IdInspeccionPeriodica":"2005","Nombre":" Comprobar su f\u00e1cil apertura y cierre."},{"Id":"64","IdInspeccionPeriodica":"2005","Nombre":" Verificar el estado de fijaci\u00f3n y funcionamiento en caso de emergencia."},{"Id":"65","IdInspeccionPeriodica":"2006","Nombre":" Verificar el correcto funcionamiento del timbre para solicitud de parada, as\u00ed como el estado y fijaci\u00f3n del obturador."},{"Id":"66","IdInspeccionPeriodica":"2007","Nombre":" Comprobar que todo el interior del veh\u00edculo se encuentre limpio; techos, pisos, paneles laterales, acr\u00edlicos de luces, vidrios, sillas, puertas, pasamanos y asideros, claraboyas, etc."},{"Id":"67","IdInspeccionPeriodica":"3001","Nombre":" Verificar el funcionamiento y estado de los ruteros e instalaci\u00f3n el\u00e9ctrica (frontal, lateral y trasero). "},{"Id":"68","IdInspeccionPeriodica":"3001","Nombre":" Inspeccionar el control del rutero, realizar pruebas de cambio de destinos y de iluminaci\u00f3n."},{"Id":"69","IdInspeccionPeriodica":"3001","Nombre":" Verificar estado de tablas de ruta y sus soportes."},{"Id":"70","IdInspeccionPeriodica":"3001","Nombre":" Verificar funcionamiento de iluminaci\u00f3n para tabla de ruta."},{"Id":"71","IdInspeccionPeriodica":"3002","Nombre":" Verificar visualmente el estado de los rel\u00e9s, uniones y todos los componentes de la caja el\u00e9ctrica principal; las uniones el\u00e9ctricas deben hacer buen contacto y no deben presentar muestras de corrosi\u00f3n."},{"Id":"72","IdInspeccionPeriodica":"3002","Nombre":" Verificar que la caja de fusibles no presente s\u00edntomas de cortos o falta de fusibles de protecci\u00f3n."},{"Id":"73","IdInspeccionPeriodica":"3002","Nombre":" Verificar funcionamiento del master swicht."},{"Id":"74","IdInspeccionPeriodica":"3003","Nombre":" Verificar el funcionamiento del control de encendido y la iluminaci\u00f3n interior en los pasillos, en los accesos de las puertas, as\u00ed como la iluminaci\u00f3n de la cabina del conductor, que no haya l\u00e1mparas rotas, sucias o con baja intensidad."},{"Id":"75","IdInspeccionPeriodica":"3003","Nombre":" La zona de las puertas deber\u00e1 tener sistema de iluminaci\u00f3n autom\u00e1tica que ilumine el piso del veh\u00edculo. Este sistema de iluminaci\u00f3n se debe activar durante el periodo en el cual permanezcan abiertas las puertas, siempre y cuando el sistema de iluminaci\u00f3n interior est\u00e9 encendido."},{"Id":"76","IdInspeccionPeriodica":"3004","Nombre":" Verificar la palanca de accionamiento de los limpia parabrisas, del pito y de los ventiladores y extractores, as\u00ed como el estado de las rejillas y perillas de ventilaci\u00f3n del puesto del operador y desempa\u00f1ador de vidrios panor\u00e1micos."},{"Id":"77","IdInspeccionPeriodica":"3005","Nombre":" Verificar que no existan cables sin aislamiento o que hagan contacto con partes met\u00e1licas del bus, o que est\u00e9n fuera de los ductos de protecci\u00f3n."},{"Id":"78","IdInspeccionPeriodica":"3006","Nombre":" Verificar el estado de la caja de bater\u00edas y los puntos de fijaci\u00f3n al chasis, que los bornes no est\u00e1n sulfatados, que los terminales est\u00e9n ajustados y cuente con soportes de sujeci\u00f3n de las bater\u00edas."},{"Id":"79","IdInspeccionPeriodica":"3006","Nombre":" Verificar que no presente fugas de \u00e1cido."},{"Id":"80","IdInspeccionPeriodica":"4001","Nombre":" Verificar el estado, las protecciones y las conexiones de la unidad l\u00f3gica y de la pantalla de interacci\u00f3n del conductor."},{"Id":"81","IdInspeccionPeriodica":"4001","Nombre":" Realizar pruebas enviando y recibiendo mensajes preestablecidos con el Centro de Control."},{"Id":"82","IdInspeccionPeriodica":"4002","Nombre":" Comprobar el funcionamiento del validador."},{"Id":"83","IdInspeccionPeriodica":"4002","Nombre":" Verificar el estado y funcionamiento del sistema de comunicaci\u00f3n."},{"Id":"84","IdInspeccionPeriodica":"4002","Nombre":" Comprobar el funcionamiento de los sensores de apertura y cierre de las puertas."},{"Id":"85","IdInspeccionPeriodica":"4002","Nombre":" Verificar el funcionamiento del bot\u00f3n de p\u00e1nico."},{"Id":"86","IdInspeccionPeriodica":"4002","Nombre":" Comprobar el funcionamiento del micr\u00f3fono ambiente."},{"Id":"87","IdInspeccionPeriodica":"5001","Nombre":" Verificar el funcionamiento del sistema que permita abrir las puertas desde el interior o exterior del veh\u00edculo en caso de emergencia."},{"Id":"88","IdInspeccionPeriodica":"5001","Nombre":" Verificar que el sistema interno de accionamiento de emergencia est\u00e9 claramente se\u00f1alizado y protegido con tapas de policarbonato color rojo trasl\u00facido."},{"Id":"89","IdInspeccionPeriodica":"5001","Nombre":" Inspeccionar si las se\u00f1ales de las salidas y sus indicaciones est\u00e1n legibles."},{"Id":"90","IdInspeccionPeriodica":"5001","Nombre":" Verificar el sistema que permite invertir el movimiento de la puerta en todo momento en el curso de cierre o de apertura."},{"Id":"91","IdInspeccionPeriodica":"5001","Nombre":" Comprobar el funcionamiento del sistema de bloqueo de cada una de las hojas de las puertas que impida su apertura mientras el veh\u00edculo se encuentra en movimiento (\u00c1ngel de la guarda)."},{"Id":"92","IdInspeccionPeriodica":"5001","Nombre":" Verificar el sistema auditivo (menor a 50 dB(A)) y luminoso en cada una de las puertas de servicio y emergencia que permita a los pasajeros identificar que las puertas se van a abrir o a cerrar."},{"Id":"93","IdInspeccionPeriodica":"5001","Nombre":" Verificar que el sistema que evita que veh\u00edculo se ponga en movimiento con las puertas abiertas funcione correctamente (\u00e1ngel de la guarda."},{"Id":"94","IdInspeccionPeriodica":"5002","Nombre":" Verificar si las claraboyas y ventanas son de f\u00e1cil accionamiento en caso de emergencia."},{"Id":"95","IdInspeccionPeriodica":"5002","Nombre":" Comprobar que cuente con todos los dispositivos de expulsi\u00f3n o fragmentaci\u00f3n en caso de emergencia debidamente se\u00f1alizados."},{"Id":"96","IdInspeccionPeriodica":"5003","Nombre":" Verificar la fecha de vencimiento y nivel de carga."},{"Id":"97","IdInspeccionPeriodica":"5003","Nombre":" Verificar que est\u00e1n bien ubicados para un f\u00e1cil acceso y se\u00f1alizados, as\u00ed como el estado de las boquillas y elementos de fijaci\u00f3n."},{"Id":"98","IdInspeccionPeriodica":"5004","Nombre":" Inspeccionar el botiqu\u00edn de primeros auxilios."},{"Id":"99","IdInspeccionPeriodica":"5004","Nombre":" Verificar que el m\u00f3vil cuente con llanta de repuesto y kit de carretera."},{"Id":"100","IdInspeccionPeriodica":"5004","Nombre":" Verificar que el m\u00f3vil cuente con accesorios reflectivos de se\u00f1alizaci\u00f3n en caso de varada."},{"Id":"101","IdInspeccionPeriodica":"6001","Nombre":" Verificar nivel de aceite motor."},{"Id":"102","IdInspeccionPeriodica":"6001","Nombre":" Verificar nivel de l\u00edquido refrigerante."},{"Id":"103","IdInspeccionPeriodica":"6001","Nombre":" Verificar nivel de aceite hidr\u00e1ulico."},{"Id":"104","IdInspeccionPeriodica":"6002","Nombre":" Comprobar el estado de conservaci\u00f3n y tensi\u00f3n de las correas en motor, ventilador, alternador, compresor y del accionamiento hidr\u00e1ulico de la direcci\u00f3n."},{"Id":"105","IdInspeccionPeriodica":"6002","Nombre":" Revisar estado de poleas y tensores."},{"Id":"106","IdInspeccionPeriodica":"6003","Nombre":" Revisar estado de soportes del motor, radiador, intercooler, protecci\u00f3n ventilador, enfocador ventilador y compresor."},{"Id":"107","IdInspeccionPeriodica":"6003","Nombre":" Comprobar ajuste en pernos de sujeci\u00f3n de los soportes."},{"Id":"108","IdInspeccionPeriodica":"6003","Nombre":" Verificar que no haya fugas en el motor y el estado del carter."},{"Id":"109","IdInspeccionPeriodica":"6004","Nombre":" Verificar el estado y la fijaci\u00f3n de los ductos de admisi\u00f3n de aire."},{"Id":"110","IdInspeccionPeriodica":"6005","Nombre":" Revisar estado del filtro de aire."},{"Id":"111","IdInspeccionPeriodica":"6005","Nombre":" Revisar indicador de restricci\u00f3n del filtro de aire."},{"Id":"112","IdInspeccionPeriodica":"6005","Nombre":" Revisar el estado de la carcasa del filtro de aire."},{"Id":"113","IdInspeccionPeriodica":"6006","Nombre":" Verificar el estado de limpieza del panel exterior del radiador."},{"Id":"114","IdInspeccionPeriodica":"6006","Nombre":" Revisar ruteo y estado de mangueras y abrazaderas."},{"Id":"115","IdInspeccionPeriodica":"6006","Nombre":" Verificar nivel de refrigerante y estado del tanque de expansi\u00f3n."},{"Id":"116","IdInspeccionPeriodica":"6006","Nombre":" Verificar que no tenga fugas o da\u00f1os."},{"Id":"117","IdInspeccionPeriodica":"6006","Nombre":" Verificar conexiones y ajuste del termostato del radiador."},{"Id":"118","IdInspeccionPeriodica":"6007","Nombre":" Verificar que no tenga fugas o da\u00f1os."},{"Id":"119","IdInspeccionPeriodica":"6007","Nombre":" Verificar soportes, enfocadores y limpieza de intercooler."},{"Id":"120","IdInspeccionPeriodica":"6007","Nombre":" Verificar estado de abrazaderas intercooler."},{"Id":"121","IdInspeccionPeriodica":"6008","Nombre":" Revisar embrague del ventilador."},{"Id":"122","IdInspeccionPeriodica":"6008","Nombre":" Revisar motor ventilador."},{"Id":"123","IdInspeccionPeriodica":"6008","Nombre":" Revisar estado del ventilador y su fijaci\u00f3n."},{"Id":"124","IdInspeccionPeriodica":"6010","Nombre":" Revisar la fijaci\u00f3n del compresor."},{"Id":"125","IdInspeccionPeriodica":"6010","Nombre":" Revisar ajuste de los componentes del compresor."},{"Id":"126","IdInspeccionPeriodica":"6010","Nombre":" Revisar si hay fugas en la salida y entrada de aire al compresor."},{"Id":"127","IdInspeccionPeriodica":"6010","Nombre":" Verificar visulamente que no existan fugas (de aire y de aceite) o ruidos anormales en el compresor o en cualquiera de los elementos del sistema."},{"Id":"128","IdInspeccionPeriodica":"6011","Nombre":" Verificar el estado de limpieza y de conservaci\u00f3n del turbo compresor, el carb\u00f3n y el aceite en el lado de compresi\u00f3n del turbo o un mal apriete de la carcasa del turbo compresor indican que hay una disminuci\u00f3n en la potencia del motor y por tanto un aumento del consumo de combustible."},{"Id":"129","IdInspeccionPeriodica":"6011","Nombre":" Verificar el estado y ajuste de los ductos de entrada y salida."},{"Id":"130","IdInspeccionPeriodica":"6012","Nombre":" Verificar estado y ajuste del tubo de escape y boquilla."},{"Id":"131","IdInspeccionPeriodica":"6012","Nombre":" Verificar estado y ajuste del silenciador."},{"Id":"132","IdInspeccionPeriodica":"7001","Nombre":" Comprobarar el ajuste de las conexiones y tuber\u00edas as\u00ed como la ausencia de fugas."},{"Id":"133","IdInspeccionPeriodica":"7001","Nombre":" Revisar el estado de mangueras tanto r\u00edgidas como flexibles del sistema de alimentaci\u00f3n y retorno a la bomba."},{"Id":"134","IdInspeccionPeriodica":"7001","Nombre":" Verificar estado de la boma de inyecci\u00f3n."},{"Id":"135","IdInspeccionPeriodica":"7001","Nombre":" Revisar drenaje filtro trampa (sedimentador) de combustible, su estado y que no presente fugas."},{"Id":"136","IdInspeccionPeriodica":"7002","Nombre":" Revisar la fijaci\u00f3n del tanque de combustible."},{"Id":"137","IdInspeccionPeriodica":"7002","Nombre":" Verificar que el tanque de combustible cuente con tapa y protecci\u00f3n."},{"Id":"138","IdInspeccionPeriodica":"8001","Nombre":" Verificar que la caja no presente golpes."},{"Id":"139","IdInspeccionPeriodica":"8001","Nombre":" Comprobar ajuste en los soportes."},{"Id":"140","IdInspeccionPeriodica":"8001","Nombre":" Verificar que no existan fugas."},{"Id":"141","IdInspeccionPeriodica":"8001","Nombre":" Comprobar funcionamiento del embrague."},{"Id":"142","IdInspeccionPeriodica":"8001","Nombre":" La barra de control no debe presentar excesiva holgura en su maniobrabilidad."},{"Id":"143","IdInspeccionPeriodica":"8002","Nombre":" Verificar que no exista desgaste de las crucetas del \u00e1rbol de transmisi\u00f3n."},{"Id":"144","IdInspeccionPeriodica":"8002","Nombre":" Comprobar el ajuste en los tornillos de la transmisi\u00f3n."},{"Id":"145","IdInspeccionPeriodica":"8003","Nombre":" Verificar estado del cuerpo, soportes, rodamientos y bujes del cardan."},{"Id":"146","IdInspeccionPeriodica":"8003","Nombre":" Comprobar el estado del soporte dispuesto para los casos en los que se suelta el cardan."},{"Id":"147","IdInspeccionPeriodica":"8004","Nombre":" Verificar que no se presentan fugas o fisuras en el diferencial."},{"Id":"148","IdInspeccionPeriodica":"8004","Nombre":" Verificar el estado de los cubos y disposici\u00f3n t\u00e1ndem (pachas)."},{"Id":"149","IdInspeccionPeriodica":"8004","Nombre":" Verificar el ajuste en las uniones atornilladas."},{"Id":"150","IdInspeccionPeriodica":"8004","Nombre":" Comprobar que los respiraderos est\u00e9n limpios."},{"Id":"151","IdInspeccionPeriodica":"9001","Nombre":" Comprobar que los soportes de suspensi\u00f3n no presenten fisuras."},{"Id":"152","IdInspeccionPeriodica":"9001","Nombre":" Verificar en las ballestas el estado de las hojas, tornillo central y grapas."},{"Id":"153","IdInspeccionPeriodica":"9001","Nombre":" Verificar que los amortig\u00fcadores no presenten desgaste en los bujes, as\u00ed como fugas o golpes."},{"Id":"154","IdInspeccionPeriodica":"9002","Nombre":" Comprobar que no existan fugas en los fuelles neum\u00e1ticos (bombonas)."},{"Id":"155","IdInspeccionPeriodica":"9002","Nombre":" Verificar el funcionamiento y ajuste de las v\u00e1lvulas niveladoras."},{"Id":"156","IdInspeccionPeriodica":"9002","Nombre":" Verificar el funcionamiento de la regulaci\u00f3n de nivel tanto en el ascenso como en el descenso (esta operaci\u00f3n se activa con un conmutador del panel de instrumentos)."},{"Id":"157","IdInspeccionPeriodica":"9002","Nombre":" Es importante que los fuelles de aire (bombonas) de cada eje est\u00e9n nivelados, pues pueden ocasionar dificultades al conducir el veh\u00edculo."},{"Id":"158","IdInspeccionPeriodica":"9003","Nombre":" Verificar el estado de los cojines de caucho de las barras de reacci\u00f3n y de torsi\u00f3n."},{"Id":"159","IdInspeccionPeriodica":"9003","Nombre":" Verificar estado de los pernos y soportes de fijaci\u00f3n."},{"Id":"160","IdInspeccionPeriodica":"9004","Nombre":" Verificar el estado de los bujes."},{"Id":"161","IdInspeccionPeriodica":"9004","Nombre":" Verificar estado de los pernos y soportes de fijaci\u00f3n."},{"Id":"162","IdInspeccionPeriodica":"10001","Nombre":" Inspeccionar visualmente las llantas de manera que no evidencien da\u00f1os, desgastes, cortes o anomal\u00edas en el reencauche."},{"Id":"163","IdInspeccionPeriodica":"10001","Nombre":" Se debe verificar la profundidad de las ranuras de las llantas en la totalidad de la banda de rodamiento, la profundidad m\u00ednimo debe ser de 2 mm en la parte con mayor desgaste."},{"Id":"164","IdInspeccionPeriodica":"10001","Nombre":" Revisar rines, no deben presentar fisuras, golpes o abolladuras, no debe tener desgaste en los orificios de fijaci\u00f3n y los pernos\/tuercas de fijaci\u00f3n deben estar completos."},{"Id":"165","IdInspeccionPeriodica":"10002","Nombre":" Verificar que no est\u00e9 golpeado y que no presente fugas de aceite"},{"Id":"166","IdInspeccionPeriodica":"10003","Nombre":" Verificar la posici\u00f3n del volante respecto a la direcci\u00f3n del veh\u00edculo."},{"Id":"167","IdInspeccionPeriodica":"10003","Nombre":" Comprobar que existan los topes de direcci\u00f3n."},{"Id":"168","IdInspeccionPeriodica":"10003","Nombre":" Verificar si la direcci\u00f3n hidr\u00e1ulica asistida presenta fugas de aceite, as\u00ed como el estado de la bomba."},{"Id":"169","IdInspeccionPeriodica":"10003","Nombre":" Verificar el estado y ajuste de la caja de la direcci\u00f3n, as\u00ed como comprobar que no presente fugas."},{"Id":"170","IdInspeccionPeriodica":"10003","Nombre":" Verificar nivel de aceite hidr\u00e1ulico de la direcci\u00f3n."},{"Id":"171","IdInspeccionPeriodica":"10004","Nombre":" Verificar si los guardapolvos de las juntas esf\u00e9ricas y las r\u00f3tulas est\u00e1n en buen estado."},{"Id":"172","IdInspeccionPeriodica":"10004","Nombre":" Verificar si hay desgaste en las r\u00f3tulas o en las juntas homocin\u00e9ticas de transmisi\u00f3n de la direcci\u00f3n."},{"Id":"173","IdInspeccionPeriodica":"10004","Nombre":" Verificar sistema de conexiones mec\u00e1nicas de la direcci\u00f3n (Barra de direcci\u00f3n, terminales, brazo pitman, columna de direcci\u00f3n)."},{"Id":"174","IdInspeccionPeriodica":"11101","Nombre":" Verificar el espesor de pastillas, debe estar dentro del rango de operaci\u00f3n que determina la pesta\u00f1a de desgaste que posee la misma."},{"Id":"175","IdInspeccionPeriodica":"11102","Nombre":" Verificar estado de los discos."},{"Id":"176","IdInspeccionPeriodica":"11102","Nombre":" Comprobar si existen grietas o desgaste excesivo en los discos, no deben tener grietas m\u00e1s largas que la mitad del ancho del \u00e1rea de fricci\u00f3n."},{"Id":"177","IdInspeccionPeriodica":"11103","Nombre":" Verificar estado y que est\u00e9 conectado el sensor de desgaste de pastillas ubicado en cada una de las posiciones que cuentan con freno de disco."},{"Id":"178","IdInspeccionPeriodica":"11104","Nombre":" Verificar el estado del guardapolvo y abrazaderas."},{"Id":"179","IdInspeccionPeriodica":"11104","Nombre":" Inspeccionar fijaci\u00f3n y estado de las mordazas."},{"Id":"180","IdInspeccionPeriodica":"11105","Nombre":" Verificar los ajustadores de tensi\u00f3n, halando con fuerza cada ajustador accesible. Si un ajustador de tensi\u00f3n se mueve aproximadamente m\u00e1s de una pulgada donde la varilla de empuje se une al mismo, requiere ser ajustado."},{"Id":"181","IdInspeccionPeriodica":"11106","Nombre":" Verificar visualmente el estado y desgaste de estos componentes del sistema**"},{"Id":"182","IdInspeccionPeriodica":"11107","Nombre":" Verificar que el sistema de drenaje en los tanques de almacenamiento de aire est\u00e1 funcionando."},{"Id":"183","IdInspeccionPeriodica":"11107","Nombre":" Inspeccionar si la v\u00e1lvula de alivio o de drenaje est\u00e1 funcionado correctamente."},{"Id":"184","IdInspeccionPeriodica":"11107","Nombre":" Verificar que los tanques se encuentren ajustados y que no est\u00e9n golpeados."},{"Id":"185","IdInspeccionPeriodica":"11108","Nombre":" Estando el sistema con suficiente presi\u00f3n de aire para que no se encienda la se\u00f1al de advertencia de baja presi\u00f3n, abrir el switch de encendido, presionar y soltar el pedal de freno para disminuir la presi\u00f3n del tanque de aire. La se\u00f1al de advertencia de baja presi\u00f3n de aire deber\u00e1 activarse antes de que la presi\u00f3n en el tanque de aire descienda a menos de la m\u00ednima indicada por el fabricante**."},{"Id":"186","IdInspeccionPeriodica":"11109","Nombre":" Verificar las mangueras de aire conectadas a las c\u00e1maras de freno para asegurarse de que no presenten roce con otro elemento del sistema y que no est\u00e9n cortadas o estropeadas debido al rozamiento."},{"Id":"187","IdInspeccionPeriodica":"11110","Nombre":" Revisar el estado general de todas las v\u00e1lvulas del sistema neum\u00e1tico y que no presenten fugas de aire."},{"Id":"188","IdInspeccionPeriodica":"11111","Nombre":" Verificar el estado y comprobar que no presenten fugas"},{"Id":"189","IdInspeccionPeriodica":"11112","Nombre":" Verificar que el sistema no presente fugas."},{"Id":"190","IdInspeccionPeriodica":"11112","Nombre":" Inspeccionar la bomba, el suavizador y los cilindros en las ruedas, no deben presentar fugas."},{"Id":"191","IdInspeccionPeriodica":"11112","Nombre":" Verificar ductos y mangueras, que no presenten desgaste, aprisionamiento, fisura y est\u00e9n correctamente soportados; as\u00ed como verificar que no presenten roce con otro elemento del sistema y que no est\u00e9n cortadas o estropeadas debido al rozamiento."},{"Id":"192","IdInspeccionPeriodica":"11112","Nombre":" Verificar nivel de l\u00edquido en el dep\u00f3sito de la bomba."},{"Id":"193","IdInspeccionPeriodica":"11113","Nombre":" Inspeccionar visualmente las lineas, dep\u00f3sitos, v\u00e1lvulas y c\u00e1maras, verificar que no presenten fugas, golpes, fisuras, aprisionamientos, desajustes o desgaste."},{"Id":"194","IdInspeccionPeriodica":"11113","Nombre":" Verificar el ajuste y correcta disposici\u00f3n de todos los componentes del sistema."},{"Id":"195","IdInspeccionPeriodica":"11113","Nombre":" Verificar que las partes mec\u00e1nicas est\u00e9n completas y en su lugar y que no est\u00e9n rotas."},{"Id":"196","IdInspeccionPeriodica":"11114","Nombre":" Verificar estado y que se encuentren conectados los sensores del sistema ABS en cada una de las posiciones.**"},{"Id":"197","IdInspeccionPeriodica":"11115","Nombre":" Verificar que el revestimiento de los frenos (el material de fricci\u00f3n) no est\u00e9 suelto o embebido en aceite, grasa o l\u00edquido de frenos."},{"Id":"198","IdInspeccionPeriodica":"11115","Nombre":" Verificar que el material de fricci\u00f3n no est\u00e9 peligrosamente delgado."},{"Id":"199","IdInspeccionPeriodica":"11116","Nombre":" Verificar la correcta sujeci\u00f3n de la v\u00e1lvula del freno de ahogo."},{"Id":"200","IdInspeccionPeriodica":"11201","Nombre":" Cargar el sistema de frenos, presionar el pedal del freno a fondo, liberar el freno de estacionamiento y apagar el motor; mantener el pedal del freno presionado a fondo durante 2 minutos y observar los man\u00f3metros. Verificar que la p\u00e9rdida de presi\u00f3n no exceda lo permitido por el fabricante**. Si existe una p\u00e9rdida de presi\u00f3n mayor, inspeccionar visualmente todos los tubos del sistema de aire comprimido, con el pedal de freno presionado a fondo; los tubos del sistema de frenos tanto r\u00edgidos como flexibles, buscando fugas de aire, tubos desgastados por roce u otros da\u00f1os."},{"Id":"201","IdInspeccionPeriodica":"11202","Nombre":" Aplicar el freno de estacionamiento. Encender y mantener el motor a una velocidad de rotaci\u00f3n de aproximadamente 1000 rpm y verificar el tiempo de carga del sistema hasta alcanzar la presion nominal de trabajo (Valor suministrado por el fabricante)**."},{"Id":"202","IdInspeccionPeriodica":"11202","Nombre":" Con el motor en ralent\u00ed presionar el pedal del freno algunas veces hasta alcanzar una presi\u00f3n por debajo de la recomendada por el fabricante**. Tomar el tiempo de carga; por tiempo de carga normal se entiende que para subir una presi\u00f3n de 30 a 58 Psi (2 a 4 Bar)**, el intervalo de tiempo es de m\u00e1ximo 2 minutos."},{"Id":"203","IdInspeccionPeriodica":"11203","Nombre":" Verificar el funcionamiento de la v\u00e1lvula de accionamiento del freno de ahogo."},{"Id":"204","IdInspeccionPeriodica":"11301","Nombre":" Verificar que los frenos funcionan correctamente sin empujar para un lado o para otro, o sin bloquear las ruedas."},{"Id":"205","IdInspeccionPeriodica":"11301","Nombre":" Los man\u00f3metros de aire comprimido deben indicar una presi\u00f3n normal."},{"Id":"206","IdInspeccionPeriodica":"11301","Nombre":" Verificar el efecto de frenado del freno de estacionamiento intentando conducir el veh\u00edculo con el freno de estacionamiento aplicado."},{"Id":"207","IdInspeccionPeriodica":"11301","Nombre":" Comprobar el funcionamiento del retardador o freno de ahogo."},{"Id":"208","IdInspeccionPeriodica":"11302","Nombre":" Verificar el correcto funcionamiento del sistema ABS, la luz testigo del control del sistema ABS se debe apagar al superar la velocidad de 8 Km\/h)**"},{"Id":"209","IdInspeccionPeriodica":"12001","Nombre":" Verificar el funcionamiento y estado de los limpia parabrisas y sistema lava vidrios (bomba, l\u00edneas y dep\u00f3sito de agua)."},{"Id":"210","IdInspeccionPeriodica":"12001","Nombre":" Verificar estado, fijaci\u00f3n y legibilidad de la placa."},{"Id":"211","IdInspeccionPeriodica":"12001","Nombre":" Verificar esteriormente el estado y fijaci\u00f3n de los vidrios panor\u00e1micos delanteros y sus empaques."},{"Id":"212","IdInspeccionPeriodica":"12001","Nombre":" Comprobar el estado y funcionamiento de las luces frontales (altas y bajas), luces direccionales, luces de parqueo y luces delimitadoras de carrocer\u00eda."},{"Id":"213","IdInspeccionPeriodica":"12001","Nombre":" Verificar el estado y ajuste de los espejos retrovisores y auxiliares."},{"Id":"214","IdInspeccionPeriodica":"12001","Nombre":" Verificar estado de la se\u00f1al\u00e9tica de acuerdo con el manual de imagen."},{"Id":"215","IdInspeccionPeriodica":"12001","Nombre":" Comprobar que no existan rayones y golpes, as\u00ed como el perfecto estado de la pintura y ajuste del bomper delantero y la persiana."},{"Id":"216","IdInspeccionPeriodica":"12002","Nombre":" Comprobar el perfecto estado de la pintura de los tableros, faldones, boceles y lado exterior de las puertas, as\u00ed como verificar que no presenten golpes ni rayones."},{"Id":"217","IdInspeccionPeriodica":"12002","Nombre":" Verificar el estado de la se\u00f1al\u00e9tica de acuerdo con el manual de imagen."},{"Id":"218","IdInspeccionPeriodica":"12002","Nombre":" Examinar exteriormente el estado de los empaques y fijaci\u00f3n de ventanas y vidrios de las puertas."},{"Id":"219","IdInspeccionPeriodica":"12002","Nombre":" Verificar funcionamiento, ajuste y estado de las puertas (incluida la del conductor, si tiene)."},{"Id":"220","IdInspeccionPeriodica":"12002","Nombre":" Verificar estado del habit\u00e1culo para bater\u00edas, y el ajuste de las puertas de todos los habit\u00e1culos adicionales."},{"Id":"221","IdInspeccionPeriodica":"12002","Nombre":" Verificar estado y funcionamiento de las luces delimitadoras y direccionales laterales."},{"Id":"222","IdInspeccionPeriodica":"12003","Nombre":" Verificar estado de la se\u00f1al\u00e9tica de acuerdo con el manual de imagen, no debe estar deteriorada."},{"Id":"223","IdInspeccionPeriodica":"12003","Nombre":" Verificar exteriormente el estado y fijaci\u00f3n del vidrio panor\u00e1mico trasero y sus empaques."},{"Id":"224","IdInspeccionPeriodica":"12003","Nombre":" Comprobar que no exitan rayones y golpes, as\u00ed como el perfecto estado de la pintura y ajuste del bomper y casco trasero."},{"Id":"225","IdInspeccionPeriodica":"12003","Nombre":" Comprobar funcionamiento de las luces de frenado, luces de reversa, luz placa, luces de parqueo, luces direccionales y luces delimitadoras de carrocer\u00eda."},{"Id":"226","IdInspeccionPeriodica":"12004","Nombre":" Verificar que no haya abolladuras o sintomas de corrosi\u00f3n en los elementos estructurales."},{"Id":"227","IdInspeccionPeriodica":"12004","Nombre":" Verificar el estado general de los bastidores del chasis y las punteras, que no presenten grietas, fisuras ni golpes."},{"Id":"228","IdInspeccionPeriodica":"12005","Nombre":" Comprobar que toda la parte exterior del veh\u00edculo est\u00e9 limpia, tableros, faldones, puertas, vidrios, rines, llantas, etc."},{"Id":"229","IdInspeccionPeriodica":"12005","Nombre":" Comprobar que toda la parte inferior del veh\u00edculo se encuentre limpia, chasis, motor, caja de cambios, etc."},{"Id":"230","IdInspeccionPeriodica":"13001","Nombre":" Inspeccionar estado general y ajuste del sistema para acceso de personas discapacitadas."},{"Id":"231","IdInspeccionPeriodica":"13001","Nombre":" Verificar funcionamiento del dispositivo para acceso de personas discapacitadas."},{"Id":"232","IdInspeccionPeriodica":"13002","Nombre":" Comprobar que est\u00e9 correctamente se\u00f1alizado el espacio dispuesto para discapacitados en silla de ruedas."},{"Id":"233","IdInspeccionPeriodica":"13002","Nombre":" Verificar el estado y ajuste del cintur\u00f3n dispuesto en el espacio para discapacitados en silla de ruedas."},{"Id":"234","IdInspeccionPeriodica":"13002","Nombre":" Verificar el funcionamiento del timbre dispuesto en la zona de discapacitados en silla de ruedas."},{"Id":"235","IdInspeccionPeriodica":"13003","Nombre":" Comprobar que exista la cantidad de sillas de acuerdo a la tipolog\u00eda del bus y a la norma NTC-5701."},{"Id":"236","IdInspeccionPeriodica":"13003","Nombre":" Verificar ajuste y se\u00f1alizaci\u00f3n."},{"Id":"237","IdInspeccionPeriodica":"13003","Nombre":" Verificar funcionamiento de los cinturones de seguridad."}];


var varBuses;
var varEmpresaBus = new Array();
var Buses_Autocomplete;
var Buses_Autocomplete_Cond = false;
var InspeccionDiara_GruposRevisados = new Array();
var InspeccionDiara_ItemRevisado = new Array();
var varSeccion;

function CargarSITP()
{
	$.each(Empresas, function(index, value)
	{
		var tds ="<option value='" + index +"'>" + value.Nombre +"</option>";
			
	}	);	

	if (Usuario.IdInitialRol == 4) //Concesionario
	{
		$("#MainMenu li").hide();
		$("#lnkHallazgos").show();
		$("#btnActividadesCampana").show();
		$("#lnkLogout").show();
		
		$("#Hallazgo_Estado").hide();
		$("#lblHallazgo_Estado").hide();
		
		$("#lblHallazgos_Zonas").hide();
		$("#txtHallazgos_Zona").hide();
		$("#txtHallazgos_Zonas").hide();

		$("#lblHallazgos_Estados").show();
		$("#txtHallazgos_Estados").show();
		$("#ReporteHallazgosPorVencer_Zonas").hide();

		$("#lnkReporteHallazgosPorVencer").show();

		$("#lnkNovedadesConcesionario").show();
		varConcesionario = true;
	}
	
	if (Usuario.IdInitialRol == 7 && Usuario.IdCompany == 3) // Tecnico Vehiculos
	{
		$("#MainMenu li").hide();
		$("#lnkVehiculosInmovilizados").show();
		$("#lnkVehiculosNovedadesPendientes").show();
		$("#lnkVehiculos").show();
		$("#lnkHallazgos").show();
		$("#lnkReporteHallazgosPorVencer").show();
		$("#lnkFlotaInoperativa").show();
		$("#lnkReporteFlotaInoperativa").show();
		
		$("#lnkLogout").show();
	}
	if (Usuario.IdInitialRol == 7 && Usuario.IdCompany != 3) // Otros Tecnicos
	{
		$("#MainMenu li").hide();
		
		$("#lnkLogout").show();
	}

	var tdsEstado ="";
	$.each(EstadoHallazgos, function(index, value)
	{
		if (index >= 7)
		{
			$("#GenHallazgos_Estado").append("<option value='" + value.Consecutivo + "'>" + value.Descripcion + "</option>");	
		}
		

		if (Usuario.IdInitialRol < 4 || Usuario.IdInitialRol == 9)
		{
			$("#Hallazgo_Estado").append("<option value='" + value.Consecutivo + "'>" + value.Descripcion + "</option>");	
			$("#txtHallazgos_Estados").append('<input type="checkbox" id="rdb_Hallazgo_Estado' + index + '" name="rdb_Hallazgo_Estado" value="' + value.Consecutivo + '" /><label for="rdb_Hallazgo_Estado' + index + '">' + value.Descripcion + '</label>');
		} else
		{
			/*
			if (Usuario.Id == 146 && index < 1)
			{
				$("#Hallazgo_Estado").append("<option value='" + value.Consecutivo + "'>" + value.Descripcion + "</option>");		
			} 
			
			if (Usuario.Id > 146 && index < 3)
			{
				$("#Hallazgo_Estado").append("<option value='" + value.Consecutivo + "'>" + value.Descripcion + "</option>");		
			} 
			*/
			if (Usuario.IdInitialRol == 6 && index <= 3) //Analista
			{
				$("#Hallazgo_Estado").append("<option value='" + value.Consecutivo + "'>" + value.Descripcion + "</option>");		
				$("#txtHallazgos_Estados").append('<input type="checkbox" id="rdb_Hallazgo_Estado' + index + '" name="rdb_Hallazgo_Estado" value="' + value.Consecutivo + '" /><label for="rdb_Hallazgo_Estado' + index + '">' + value.Descripcion + '</label>');
			} 
			if ((Usuario.IdInitialRol == 5 && index <= 7) || index == 13)// Especialista
			{
				$("#Hallazgo_Estado").append("<option value='" + value.Consecutivo + "'>" + value.Descripcion + "</option>");		
				$("#txtHallazgos_Estados").append('<input type="checkbox" id="rdb_Hallazgo_Estado' + index + '" name="rdb_Hallazgo_Estado" value="' + value.Consecutivo + '" /><label for="rdb_Hallazgo_Estado' + index + '">' + value.Descripcion + '</label>');
			}
			if (Usuario.IdInitialRol == 4 && index >= 5) // Concesionario
			{
				$("#txtHallazgos_Estados").append('<input type="checkbox" id="rdb_Hallazgo_Estado' + index + '" name="rdb_Hallazgo_Estado" value="' + value.Consecutivo + '" /><label for="rdb_Hallazgo_Estado' + index + '">' + value.Descripcion + '</label>');
			}
		}
	});

	$("#txtHallazgos_Estados").buttonset();

	if (Usuario.Id != 1)
	{
		$("#Dashboard section").hide();
		$("#Dashboard div").hide();
	}
	
	if (Usuario.IdInitialRol == 6 && Usuario.IdCompany == 3) //Analista Vehiculos
	{
		$("#MainMenu li").hide();
		$("#lnkVehiculos").show();
		$("#lnkHallazgos").show();
		$("#lnkOperaciones").show();
		$("#lnkReporteVehiculos").show();
		$("#lnkVehiculosNovedadesPendientes").show();
		$("#lnkVehiculosInmovilizados").show();
		$("#lnkVehiculosInmovilizados").show();
		$("#lnkUbicacionTecnicos").show();
		$("#lnkReporteHallazgos").show();
		$("#lnkReporteHallazgosPorVencer").show();
		$("#lnkFlotaInoperativa").show();
		$("#lnkReporteFlotaInoperativa").show();
		$("#lnkMatrizFlotaInoperativa").show();
		
		$("#lnkHallazgosCorregir").show();

		$("#lnkSubirInspecciones").show();
		$("#lnkSubirHallazgos").show();
		
		$("#lnkLogout").show();
	}
	if (Usuario.IdInitialRol == 6 && Usuario.IdCompany == 4) //Analista Seguridad
	{
		$("#MainMenu li").hide();
		$("#lnkHallazgos").show();
		$("#lnkUbicacionTecnicos").show();
		$("#lnkReporteHallazgos").show();
		$("#lnkReporteHallazgosPorVencer").show();
		$("#lnkSeguridad").show();		
		$("#lnkAlcoholimetria").show();
		$("#lnkVelocidad").show();
		$("#lnkSeguridadOperacional").show();
		$("#lnkAlcoholimetriaEspecial").show();
		$("#lnkHallazgosCorregir").show();

		$("#lnkSubirInspecciones").show();
		$("#lnkSubirHallazgos").show();
		
		$("#lnkLogout").show();
	}
	if (Usuario.IdInitialRol == 6 && Usuario.IdCompany == 5) //Analista Operaciones
	{
		$("#MainMenu li").hide();
		$("#lnkHallazgos").show();
		$("#lnkUbicacionTecnicos").show();
		$("#lnkReporteHallazgos").show();
		$("#lnkReporteHallazgosPorVencer").show();
		$("#lnkOperaciones").show();

		$("#lnkSubirInspecciones").show();
		$("#lnkSubirHallazgos").show();
		$("#lnkHallazgosCorregir").show();
		
		$("#lnkLogout").show();
	}

	if (Usuario.IdInitialRol == 5 && Usuario.IdCompany == 3) //Especialista Vehiculos
	{
		$("#MainMenu li").hide();
		$("#lnkVehiculos").show();
		$("#lnkHallazgos").show();
		$("#lnkReporteVehiculos").show();
		$("#lnkVehiculosNovedadesPendientes").show();
		$("#lnkUbicacionTecnicos").show();
		$("#lnkReporteHallazgosPorVencer").show();
		$("#lnkReporteHallazgos").show();
		
		$("#lnkSubirInspecciones").show();
		$("#lnkSubirHallazgos").show();
		$("#lnkInspeccionPeriodica").show();

		$("#lnkVehiculosInmovilizados").show();
		$("#lnkFlotaInoperativa").show();
		$("#lnkReporteFlotaInoperativa").show();
		$("#lnkMatrizFlotaInoperativa").show();
		$("#lnkHallazgosCorregir").show();
		$("#lnkUsers").show();

		$("#lnkLogout").show();
	}
	if (Usuario.IdInitialRol == 5 && Usuario.IdCompany == 4) //Especialista Seguridad
	{
		$("#MainMenu li").hide();
		$("#lnkHallazgos").show();
		$("#lnkSeguridad").show();
		$("#lnkUbicacionTecnicos").show();
		$("#lnkReporteHallazgosPorVencer").show();
		$("#lnkReporteHallazgos").show();
		$("#lnkAlcoholimetria").show();
		$("#lnkVelocidad").show();
		$("#lnkSeguridadOperacional").show();
		$("#lnkAlcoholimetriaEspecial").show();

		$("#lnkSubirInspecciones").show();
		$("#lnkSubirHallazgos").show();
		$("#lnkHallazgosCorregir").show();
		$("#lnkUsers").show();

		$("#lnkLogout").show();
	}
	if (Usuario.IdInitialRol == 5  && Usuario.IdCompany == 5) //Especialista Operaciones
	{
		$("#MainMenu li").hide();
		$("#lnkHallazgos").show();
		$("#lnkOperaciones").show();
		$("#lnkUbicacionTecnicos").show();
		$("#lnkReporteHallazgosPorVencer").show();
		$("#lnkReporteHallazgos").show();

		$("#lnkSubirInspecciones").show();
		$("#lnkSubirHallazgos").show();
		$("#lnkHallazgosCorregir").show();
		$("#lnkUsers").show();

		$("#lnkLogout").show();
	}

	if (Usuario.IdInitialRol == 8) //Sincronizacion
	{
		$("#MainMenu li").hide();
		$("#lnkHallazgos").show();
		$("#lnkSubirBuses").show();
		$("#lnkSubirConductores").show();
		$("#lnkSubirInmovilizados").show();

		$("#lnkSubirInspecciones").show();
		$("#lnkSubirHallazgos").show();
		$("#lnkHallazgosCorregir").show();

		$("#lnkLogout").show();
	}

	if (Usuario.IdInitialRol == 9) //Juridica
	{
		$("#MainMenu li").hide();
		$("#lnkHallazgos").show();
		$("#lnkReporteHallazgos").show();
		//alert("El sistema está en mantenimiento, por favor intente mas tarde");

		$("#lnkLogout").show();
	}

	$("#txtHallazgo_ComprobadoPor_Contador").val(Usuario.NickName);
	
	/*
	if (Usuario.IdInitialRol == 2 && Usuario.IdEmpresa == 11) //Administrador Transmilenio
	{
		
		EditarMultas();
		CriteriosInmovilizacion();
		EditarInspeccionDiaria();
		EditarInspeccionPeriodica();
	}
	*/

	$.each(Zonas, function(index, value)
		{
			var tds ="<option value='" + index +"'>" + value.Nombre +"</option>";
			$("#VehiculosInmovilizados_Zona").append(tds);
			$("#FlotaInoperativa_Zona").append(tds);
			$("#Alcoholimetria_Zona").append(tds);
			$("#AlcoholimetriaEspecial_Zona").append(tds);
			$("#Velocidad_Zona").append(tds);
			$("#SeguridadOperacional_Zona").append(tds);
			//$("#txtHallazgos_Zona").append(tds);
			
		});
	$("#btnVehiculosInmovilizados_Buscar").on("click", btnVehiculosInmovilizados_Buscar_Click);
	
	$("#btnOcultarMenu").on("click", OcultarMenu);

	$("#txtVehiculo_Fecha").datepicker();
	$('#txtVehiculo_Fecha').on('change', DashBoard_RangeBx_Change);

	$("#txtVehiculo_NoInterno").keydown(txtVehiculo_NoInterno_Cambiando);
	//var varEmpresaBus = [[{"NInterno": "1"}, {"NInterno": "2"}],[{"NInterno": "3"}, {"NInterno": "4"}]];

	ButtonSetZonas($("#Vehiculos_Zonas"), "Vehiculos", 0, "radio");
	ButtonSetZonas($("#ReporteHallazgosPorVencer_Zonas"), "ReporteHallazgosPorVencer", 0, "radio");
	ButtonSetZonas($("#VehiculosNovedadesPendientes_Zonas"), "VehiculosNovedadesPendientes", 0, "radio");
	ButtonSetZonas($("#FlotaInoperativa_Zonas"), "FlotaInoperativa", 0, "radio");
	ButtonSetZonas($("#txtHallazgos_Zonas"), "Hallazgos", 0, "checkbox");
	

	var tds = '<input type="radio" id="rdb_VehiculosNovedadesPendientes_Zona14" name="rdb_VehiculosNovedadesPendientes_Zona" idZona="0" value="0" />';
					tds += '<label for="rdb_VehiculosNovedadesPendientes_Zona14">Todas</label>';
					$("#VehiculosNovedadesPendientes_Zonas").append(tds);
			$("#VehiculosNovedadesPendientes_Zonas").buttonset();
	

	$("#Vehiculos_Zonas input").live("click", Vehiculos_Zonas_Click);

	$("#radioset_Vehiculo_TipoInspeccion, #Vehiculos_InspeccionDiaria_Tipo").buttonset();

	$("#btnVehiculo_InspeccionPer_Tipos_SubGrupos_Volver").on("click", btnVehiculo_InspeccionPer_Tipos_SubGrupos_Volver_Click);

	$("#Vehiculos_InspeccionPeriodica_Categorias button").on("click", Vehiculos_InspeccionPeriodica_Categorias_button_Click);

	$("#radioset_Vehiculo_TipoInspeccion input").on("click", radioset_Vehiculo_TipoInspeccion_input_Click);
	$("#Vehiculos_InspeccionDiaria_Tipo input").on('click', Vehiculos_InspeccionDiaria_Tipo_input_Click);
	$("#btnVehiculo_InspeccionDiaria_Tipos_SubGrupos_Volver").on("click", btnVehiculo_InspeccionDiaria_Tipos_SubGrupos_Volver_Click);
	$(".VehiculoInspeccionDiaria").live("click", VehiculoInspeccionDiaria_Click);
	$(".VehiculoInspeccionDiariaSubGrupo").live("click", VehiculoInspeccionDiariaSubGrupo_Click);

	
	
	$( "ul.droptrue" ).sortable({
      connectWith: "ul",
      dropOnEmpty: true,
      beforeStop: function( event, ui ) 
      {
      	//alert($(ui.item[0]).attr("id"));
      	//alert($(ui.item[0]).parentNode);
      	
		if ($(ui.item[0].parentNode).attr("id") == "Vehiculo_InspeccionDiaria_Contenedores_NoConforme")
		{
			if ($("#txtObsInspeccionDiaria" + $(ui.item[0]).attr("idInspeccionItem")).length == 0)
			{
				//$("#InspeccionDiaria_Pendientes").append("<li id='liObsInspeccionDiaria" + $(ui.item[0]).attr("idInspeccionItem") + "'>" + $(ui.item[0]).text() +"</li>");
				CrearInspeccionDiaria($(ui.item[0]).attr("idInspeccionItem"), $(ui.item[0]).attr("IdInspeccionTipo"), $(ui.item[0]).text())
				
				//$("#btnInspeccionDiaria_Pendientes_2").text(parseInt($("#btnInspeccionDiaria_Pendientes_2").text()) + 1);

			}
		}
		if ($(this).attr("id") == "Vehiculo_InspeccionDiaria_Contenedores_NoConforme" & $(ui.item[0].parentNode).attr("id") != "Vehiculo_InspeccionDiaria_Contenedores_NoConforme")
		{
			$("#lblObsInspeccionDiaria" + $(ui.item[0]).attr("idInspeccionItem")).remove();
			$("#txtObsInspeccionDiaria" + $(ui.item[0]).attr("idInspeccionItem")).remove();
			$("#liObsInspeccionDiaria" + $(ui.item[0]).attr("idInspeccionItem")).remove();

			InspeccionDiaria_EliminarNoConformidad($(ui.item[0]).attr("idInspeccionItem"));

			$.each(InspeccionDiara_ItemRevisado, function(index, value)
				{
					if ($(ui.item[0]).attr("idInspeccionItem") == value)
						{
							InspeccionDiara_ItemRevisado.splice(index, 1);
						}
				});
			$("#btnInspeccionDiaria_Pendientes_2").text(InspeccionDiara_ItemRevisado.length);
			//$("#btnInspeccionDiaria_Pendientes_2").text(parseInt($("#btnInspeccionDiaria_Pendientes_2").text()) - 1);
		}
		
		$("#btnInspeccionDiaria_Pendientes_2").text(InspeccionDiara_ItemRevisado.length);
		
		if (InspeccionDiara_ItemRevisado.length > 0)
			{	$("#btnVehiculos_SinNovedad").slideUp();	}
		else
			{	$("#btnVehiculos_SinNovedad").slideDown();	}
      }
    });

	$("#btnVehiculo_InspeccionDiaria_Tipos_SubGrupos_Volver2").on("click", btnVehiculo_InspeccionDiaria_Tipos_SubGrupos_Volver2_Click);

	$.post("php/CargarCriteriosInmovilizacion.php",
			function(data)
			{
				$("#txtVehiculo_CodigoInmovilizacion")
				.autocomplete(
					{
						source: data,
						select: function( event, ui ) 
								{
									$("#txtVehiculo_CodigoInmovilizacion").val(ui.item.Id);
									$("#txtVehiculo_CriterioInmovilizacion").val(ui.item.Codigo);
									$("#txtVehiculo_CausaInmovilizacion").val(ui.item.Descripcion);
									 
						          return false;
								}
					});

				$("#txtVehiculo_CodigoHabilitacion")
				.autocomplete(
					{
						source: data,
						select: function( event, ui ) 
								{
									$("#txtVehiculo_CodigoHabilitacion").val(ui.item.Id);
									$("#txtVehiculo_CriterioHabilitacion").val(ui.item.Codigo);
									$("#txtVehiculo_CausaHabilitacion").val(ui.item.Descripcion);
									 
						          return false;
								}
					});

				$("#txtVehiculo_CodigoHabilitacion_")
				.autocomplete(
					{
						source: data,
						select: function( event, ui ) 
								{
									$("#txtVehiculo_CodigoHabilitacion_").val(ui.item.Id);
									$("#txtVehiculo_CriterioHabilitacion_").val(ui.item.Codigo);
									$("#txtVehiculo_CausaHabilitacion_").val(ui.item.Descripcion);
									 
						          return false;
								}
					});

				$("#txtFlotaInoperativa_CodigoInmovilizacion")
				.autocomplete(
					{
						source: data,
						select: function( event, ui ) 
								{
									$("#txtFlotaInoperativa_CodigoInmovilizacion").val(ui.item.Id);
									$("#txtFlotaInoperativa_CriterioInmovilizacion").val(ui.item.Codigo);
									$("#txtFlotaInoperativa_CausaInmovilizacion").val(ui.item.Descripcion);
									 
						          return false;
								}
					});

			}
			,"json");

	$("#btnInspeccionDiaria_Pendientes").on("click", btnInspeccionDiaria_Pendientes_click);

	$(".txtHallazgo_CodigoMulta").live("change", function(data)
		{
			var NumHallazgo = $(this).attr("id").replace("txtHallazgo_CodigoMulta_", "");
			
			CargarDescripcionMultas(NumHallazgo);
		});

	$.post("php/CargarMultas.php",
			function(data)
			{
				jsonMultas = data;
				$.each(data, function(index, value)
						{
							Multas[value.Codigo] = value.Descripcion;
						if (!(index%2==0))
							{
								$("#tableHallazgosPorSeleccionar_Contador tbody").append("<tr><td>" + value.Codigo +"</td><td>" + value.Descripcion + "</td><td><button varContador='0' Mu_Codigo='"+ value.Codigo +"' class='SeleccionarMulta ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Seleccionar'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td></tr>");
							}
						}

					);
			}
			,"json");

	$.post("php/CargarCriteriosInmovilizacion2.php",
			function(data)
			{
				$.each(data, function(index, value)
						{
							$("#tableCriteriosPorSeleccionar tbody").append("<tr><td>" +  value.Descripcion +"</td><td>" + value.Codigo + "</td><td><button CR_Codigo='"+ value.Id +"' CR_Tipo ='" + value.Descripcion + "' CR_SubTipo='" + value.Codigo +"' class='SeleccionarInmovilizacion ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Seleccionar'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td></tr>");
							$("#tableCriteriosPorSeleccionar_ tbody").append("<tr><td>" +  value.Descripcion +"</td><td>" + value.Codigo + "</td><td><button CR_Codigo='"+ value.Id +"' CR_Tipo ='" + value.Descripcion + "' CR_SubTipo='" + value.Codigo +"' class='SeleccionarInmovilizacion_ ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Seleccionar'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td></tr>");
							$("#tableCriteriosPorSeleccionar_Hab tbody").append("<tr><td>" +  value.Descripcion +"</td><td>" + value.Codigo + "</td><td><button CR_Codigo='"+ value.Id +"' CR_Tipo ='" + value.Descripcion + "' CR_SubTipo='" + value.Codigo +"' class='SeleccionarHabilitacion ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Seleccionar'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td></tr>");
							$("#tableCriteriosPorSeleccionar_Hab_ tbody").append("<tr><td>" +  value.Descripcion +"</td><td>" + value.Codigo + "</td><td><button CR_Codigo='"+ value.Id +"' CR_Tipo ='" + value.Descripcion + "' CR_SubTipo='" + value.Codigo +"' class='SeleccionarHabilitacion_ ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Seleccionar'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td></tr>");
						}

					);
			}
			,"json");

	$(".btnDesplegarMultas").live("click", DesplegarMultas);

	$(".SeleccionarMulta").live("click", SeleccionarMulta);
	
}

function ButtonSetZonas(Contenedor, Seccion, idEmpresa, Tipo)
{
	$(Contenedor).find("input").remove();
	$(Contenedor).find("label").remove();

	$.each(Zonas, function(index, Zona)
		{
			if (index > 0)
			{
				if (Zona.Empresa == idEmpresa || idEmpresa == 0)
				{
					var tds = '<input type="' + Tipo +  '" id="rdb_'+ Seccion +'_Zona' + index + '" name="rdb_'+ Seccion +'_Zona" idZona="' + index + '" value="' + index + '" />';
					tds += '<label for="rdb_'+ Seccion +'_Zona' + index + '">' + Zona.Nombre + '</label>';
					checked = '';
					$(Contenedor).append(tds);
				}
			}
		});
	$(Contenedor).buttonset();
}

function Vehiculos_Zonas_Click()
{
	radioSet_IdEmpresa = $(this).attr("idZona");
	CargarBuses(radioSet_IdEmpresa, 'txtVehiculo_NoInterno');
	$("#txtVehiculo_NoInterno").val("");
	Buses_Autocomplete_Cond = false;

	
}

function txtVehiculo_NoInterno_Cambiando(evento)
{
	var Str = $("#txtVehiculo_NoInterno").val() + String.fromCharCode(evento.keyCode);
	if(/z/g.test(Str) || /Z/g.test(Str))
		{
			//$("#Estado").text("Global");
			if(Buses_Autocomplete != "Global")
			{
				Buses_Autocomplete_Cond = false;	
				Buses_Autocomplete = "Global";
			}
			
		}
	else
		{
			//$("#Estado").text("Local");
			if(Buses_Autocomplete != "Local")
			{
				Buses_Autocomplete_Cond = false;	
				Buses_Autocomplete = "Local";
			}
		}

	if (!Buses_Autocomplete_Cond)
	{
		if(Buses_Autocomplete == "Global")
			{
				CargarBuses(0, 'txtVehiculo_NoInterno');
			}
		if(Buses_Autocomplete == "Local")
			{

				CargarBuses(radioSet_IdEmpresa, 'txtVehiculo_NoInterno');
			}	
			Buses_Autocomplete_Cond = true;		
	}
}
function CargarBuses(pIdZona, varIdtxt)
{
	$.post("php/AutocompletarBuses.php", 
			{
				IdZona : pIdZona
			},
			function(data)
			{
				$("#" + varIdtxt).autocomplete({ 
						source: data, 
						select: function( event, ui ) 
							{
								//
								$("#Vehiculo_ConfirmarInspeccion span").text(ui.item.NInterno);
								$("#Vehiculo_ConfirmarInspeccion").dialog({
										autoOpen: false, 				
										title: "Iniciar Inspección",
										minWidth: 200,
										buttons: [
													{
														text: "Si",
														click: function() { 
																			$(this).dialog("close");
																			$("#btnVehiculos_NuevoBus").show("slide")
																			$("#txtVehiculo_NoInterno").attr("disabled",true);
																			txtDatosDeVehiculo_Select(event, ui);
																		  }
													},
													{
														text: "No",
														click: function() { $(this).dialog("close"); 
																		  }
													}
												  ]
														});
								$("#Vehiculo_ConfirmarInspeccion").dialog('open');
							}});
			},
		"json");
}
function txtDatosDeVehiculo_Select(evento, ui)
{
	var f = new Date();

	geolocalizar();

	$("#txtVehiculo_Fecha").val(f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2));
	$("#txtVehiculo_Hora").val(CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2));

	$("#radioset_Vehiculo_TipoInspeccion").slideDown();
}


function radioset_Vehiculo_TipoInspeccion_input_Click()
{
	$("#Vehiculos section").hide("slide");

	if ($(this).attr("id").replace("rdbV_TipoInspeccion", '') == 1)
	{
		VehiculosCrearInspeccion(1);
		$("#Vehiculos_InspeccionDiaria").show("slide");
		$("#Vehiculos_InspeccionDiaria_Tipo").show("slide");
		$("#btnVehiculos_SinNovedad").slideDown();

		hallazgo = $(this).attr("id").replace("rdbV_TipoInspeccion", '');

	}
	
	if ($(this).attr("id").replace("rdbV_TipoInspeccion", '') == 2)
	{//$("#rdbV_TipoInspeccion_InspeccionPeriodica").slideDown();
		VehiculosCrearInspeccion(2);
		$("#Vehiculos_InspeccionPeriodica").show("slide");
		$("#Vehiculos_InspeccionPeriodica_Categorias").slideDown();

		Vehiculos_InspeccionPeriodica_Click()
		
	}
	
	if ($(this).attr("id").replace("rdbV_TipoInspeccion", '') == 3)
	{
		$("#rdbV_TipoInspeccion_Hallazgo").slideDown();
		//$("#HallazgoVehiculo").hide('slide');
		
		MostrarHallazgos();

	}
	if ($(this).attr("id").replace("rdbV_TipoInspeccion", '') == 4)
	{$("#Vehiculos_Inmovilizar").show("slide");}
	if ($(this).attr("id").replace("rdbV_TipoInspeccion", '') == 5)
	{
		CargarHabilitacionBus();
	}
}
function Vehiculos_InspeccionDiaria_Tipo_input_Click()
{
	$(".VehiculoInspeccionDiaria").remove();
	var Categoria = $(this).attr("Categoria");
	$.each(InspeccionDiaria, function(index, value)
	{
		if (value.Tipo == Categoria )
		{
			var tds = "<button class='VehiculoInspeccion_SinRevisar VehiculoInspeccionDiaria' IdInspeccionDiaria='" + value.IdInspeccionDiaria + "'>"
			tds += value.Nombre + "</button>";
			$("#Vehiculo_InspeccionDiaria_Tipos").append(tds);
		}
	});
	
	
	$("#Vehiculo_InspeccionDiaria_Tipos").show("slide");
	$("#Vehiculo_InspeccionDiaria_").slideDown();
}
function btnVehiculo_InspeccionDiaria_Tipos_SubGrupos_Volver_Click()
{
	$("#Vehiculo_InspeccionDiaria_Tipos_SubGrupos").hide("slide");	
	$("#Vehiculo_InspeccionDiaria_Tipos").show("slide");
}

function VehiculoInspeccionDiaria_Click()
{
	$("#Vehiculo_InspeccionDiaria_Tipos").hide("slide");
	varSeccion = $(this).text();
	
			$(".VehiculoInspeccionDiariaSubGrupo").remove();
			$("#Vehiculo_InspeccionDiaria_Tipos_SubGrupos h4").remove();
			
			 $("#Vehiculo_InspeccionDiaria_Tipos_SubGrupos").append("<h4>" + varSeccion + "</h4>");
			 var idInspeccionDiaria = $(this).attr("IdInspeccionDiaria");
			$.each(InspeccionDiariaSubGrupos, function(index, value)
					{
						if (value.IdInspeccionDiaria == idInspeccionDiaria)
						{
							var varRevisado = "VehiculoInspeccion_SinRevisar";
							
							$.each(InspeccionDiara_GruposRevisados, function(index2, value2)
								{
									if (value.idInspeccionTipo == value2)
									{
										varRevisado = "VehiculoInspeccion_Revisado";
									}
								});

							var tds = "<button class='" + varRevisado + " VehiculoInspeccionDiariaSubGrupo' IdInspeccionTipo='" + value.idInspeccionTipo + "'>"
							tds += value.Tipo + "</button>";
							$("#Vehiculo_InspeccionDiaria_Tipos_SubGrupos").append(tds);
						}
					});
		
	$("#Vehiculo_InspeccionDiaria_Tipos_SubGrupos").show("slide");

}
function VehiculoInspeccionDiariaSubGrupo_Click()
{
	$(this).removeClass("VehiculoInspeccion_SinRevisar");
	$(this).addClass("VehiculoInspeccion_Revisado");

	InspeccionDiara_GruposRevisados.push($(this).attr("IdInspeccionTipo"));

	$("#Vehiculo_InspeccionDiaria_Tipos_SubGrupos").hide("slide");
	$("#Vehiculo_InspeccionDiaria_Contenedores ul li").remove();

	if (hallazgo == 1)
	{
		var IdInspeccionTipo = $(this).attr("IdInspeccionTipo");
	 	$("#Vehiculo_InspeccionDiaria_Contenedores_Titulo").text(varSeccion);

		$("#Vehiculo_InspeccionDiaria_Contenedores_NoAplica li").remove();
		$("#Vehiculo_InspeccionDiaria_Contenedores_NoConforme li").remove();
				$.each(InspeccionDiariaSubGruposPreguntas, function(index, value)
						{
							if (value.IdInspeccionTipo == IdInspeccionTipo)
							{
								var tds = "<li class='ui-state-default' idInspeccionItem='" + value.idInspeccionItem + "' idInspeccionTipo='" + value.IdInspeccionTipo + "'>"
								tds += value.Pregunta + "</li>";
	
								var Bandera = false;
								$.each(InspeccionDiara_ItemRevisado, function(index2, value2)
								{
									if (value2 == value.idInspeccionItem)
									{
										$("#Vehiculo_InspeccionDiaria_Contenedores_NoConforme").append(tds);
										Bandera = true;
									}
								}
								);
								if (!Bandera)
								{
									$("#Vehiculo_InspeccionDiaria_Contenedores_NoAplica").append(tds);	
								}
							}
						});
		$("#Vehiculo_InspeccionDiaria_Contenedores").show("slide");
		$("#Vehiculo_InspeccionDiaria_Contenedores_NoConforme").height($("#Vehiculo_InspeccionDiaria_Contenedores_NoAplica").height());
		
	}

		if (hallazgo == 2)
	{
		$.post("php/CargarVehiculo_InspeccionDiariaTipoSubGrupoPreguntas.php", 
			{IdInspeccionTipo: $(this).attr("IdInspeccionTipo")},
			function(data)
			{
				$(".Vehiculo_InspeccionDiaria_Contenedores_NoAplica li").remove();
				$.each(data, function(index, value)
						{
							var tds = "<li class='ui-state-default' idInspeccionItem='" + value.idInspeccionItem + "'>"
							tds += value.Pregunta + "<div id='radiosetPregunta'+" + value.idInspeccionItem + ">"
								tds += "<input type='radio' id='rdbV_TipoInspeccion1_' name='rdbV_Pregunta' value='1'/>"
								tds += "<label for='rdbV_TipoInspeccion1'>Bueno</label>"
								tds += "<input type='radio' id='rdbV_TipoInspeccion2_' name='rdbV_Pregunta' value='2' />"
								tds += "<label for='rdbV_TipoInspeccion2'>Malo</label>"
								tds += "<input type='radio' id='rdbV_TipoInspeccion3_' name='rdbV_Pregunta' value='3' />"
								tds += "<label for='rdbV_TipoInspeccion3' checked='checked'>No Aplica</label>"
								tds += "</div></li>";
						});
			}
			, "json");
		$("#Vehiculo_InspeccionDiaria_Contenedores").show("slide");
	}
}
function btnVehiculo_InspeccionDiaria_Tipos_SubGrupos_Volver2_Click()
{
	$("#Vehiculo_InspeccionDiaria_Contenedores").hide("slide");
	$("#Vehiculo_InspeccionDiaria_Tipos_SubGrupos").show("slide");	
}
function btnInspeccionDiaria_Pendientes_click()
{
	if ($("#InspeccionDiaria_Pendientes").is (':visible'))
	{
		$("#InspeccionDiaria_Pendientes").hide("slide");
		$("#btnInspeccionDiaria_Pendientes_1").text("Pendientes");
		$("#btnInspeccionDiaria_Pendientes").css("left", 0);
	}
	else
	{
		$("#InspeccionDiaria_Pendientes").show("slide", function()
			{
				cargarNovedadesVehiculo();
				$("#btnInspeccionDiaria_Pendientes_1").text("Ocultar");
				$("#btnInspeccionDiaria_Pendientes").css("left", parseInt($("#InspeccionDiaria_Pendientes").css("width")) + 58);
						$("#InspeccionDiaria_Pendientes").html($("#VehiculosNovedadesPendientesPopUp").html());
			}
			);
		
	}
	
}

function CargarDescripcionMultas(NumHallazgo)
{
	var CodHallazgo = $("#txtHallazgo_CodigoMulta_" + NumHallazgo).val().toUpperCase();
	$("#txtHallazgo_CodigoMulta_" + NumHallazgo).val(CodHallazgo);

	$("#tableHallazgosSeleccionados_" + NumHallazgo + " tbody tr").remove();

	var str = $("#txtHallazgo_CodigoMulta_" + NumHallazgo).val().split(", ");
	$.each(str, function (index, value)
			{
				if (value)
				{
					if (Multas[value])
					{
						$("#tableHallazgosSeleccionados_" + NumHallazgo + " tbody").append("<tr><td>" + value +"</td><td>" + Multas[value] + "</td></tr>");
					}
					else
					{
						$("#tasbleHallazgosSeleccionados_" + NumHallazgo + " tbody").append("<tr style='background-color:red'><td>" + value +"</td><td>VALOR NO ENCONTRADO</td></tr>");	
					}
				}
			}
		);
}
function DesplegarMultas()
{
	if ($("#tableHallazgosPorSeleccionar_" + $(this).attr("varContador")).is(':visible'))
	{
		$("#tableHallazgosPorSeleccionar_" + $(this).attr("varContador")).hide('slide');
	}
	else
	{
		$("#tableHallazgosPorSeleccionar_" + $(this).attr("varContador")).show('slide');
	}
}
function SeleccionarMulta()
{
	var varNumHallazgo = $(this).attr("varContador");

	$("#txtHallazgo_CodigoMulta_" + varNumHallazgo).val($(this).attr('Mu_Codigo'));
	$("#tableHallazgosPorSeleccionar_" + $(this).attr("varContador")).hide('slide');
	CargarDescripcionMultas(varNumHallazgo);
}
function MostrarHallazgos()
{
	var CodigoHallazgos = $("#Hallazgo").html().replace(/Contador/g, varContadorHallazgos);
				
		$("#Hallazgos_S").append("<div id='Hallazgo_" + varContadorHallazgos+ "'></div>");
		$("#Hallazgo_" + varContadorHallazgos).append(CodigoHallazgos);

		var f = new Date();
		var Hora = Usuario.Id + "-" + f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + "-" + CompletarConCero(f.getHours(), 2) + "-" + CompletarConCero(f.getMinutes(), 2) + "-" + CompletarConCero(f.getSeconds(), 	2);
		
		$("#txtHallazgo_Fecha_"+ varContadorHallazgos).val(f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + ":" + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2));

		$("#Hallazgo_" + varContadorHallazgos + " .ifrSubir").attr("src", "Tools/subir/index.html?Hora=" + Hora + "&Usuario=" + Usuario.Id);

		$("#btnDesplegarMultas_" + varContadorHallazgos).attr("varContador", varContadorHallazgos);
		$("#tableHallazgosPorSeleccionar_" + varContadorHallazgos + " .SeleccionarMulta").attr("varContador", varContadorHallazgos);

		var tmpHallazgo = varContadorHallazgos;
		$("#txtHallazgo_CodigoMulta_" + varContadorHallazgos)
				.autocomplete(
					{
						source: jsonMultas,
						select: function( event, ui ) 
								{
									autoCompleteHallazgos(ui.item.Codigo, tmpHallazgo);
						          	return false;
								}
					});
				
	
		$("#Hallazgo_" + varContadorHallazgos).dialog({
				autoOpen: false, 				
				title: "Levantar Hallazgo",
				minHeight: 200,
				minWidth: 600,
				buttons: [
							{
								text: "Otro Hallazgo",
								click: function() { MostrarHallazgos(); 
												  }
							},
							{
								text: "Guardar",
								click: function() { 
														GuardarHallazgo2(Hora, tmpHallazgo);
														$(this).dialog("close"); 
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		$("#Hallazgo_" + varContadorHallazgos).dialog('open');
		$("#txtHallazgo_NInterno2_" + varContadorHallazgos).val($("#txtVehiculo_NoInterno").val());
		$("#txtHallazgo_CodConductor_" + varContadorHallazgos).slideUp();
		$("#lblHallazgo_CodCondutor_" + varContadorHallazgos).slideUp();

		$("#txtHallazgo_ComprobadoPor_" + varContadorHallazgos).val(Usuario.NickName);
		$("#txtHallazgo_Ruta_" + varContadorHallazgos).val("Patio");
		

		varContadorHallazgos++;
}
function CargarOperaciones()
{
	$(".imgCargando").show();

	$('#tableOperaciones').dataTable().fnDestroy();
	$("#tableOperaciones").find("tbody").find("tr").remove();

	$.post("php/CargarInspecciones.php",
		{
			Desde: $("#txtOperaciones_Desde").val(),
			Hasta: $("#txtOperaciones_Hasta").val(),
			Medicion: $("#txtOperaciones_TipoMedicion").val()
		},
			function(data)
			{
			if (data != 0)
				{
					var tableBody = $("#tableOperaciones").find("tbody");
					$.each(data, function(index, value)
						{
									var tds = "<tr>";
										tds += "<td>" + value.IdInspeccion + "<information Prefijo='" + value.Prefijo + "' idInspeccion= '" + value.IdInspeccion +  "' Coordenadas='" + value.Coordenadas + "' /></td>";
										tds += "<td>" + value.PicoAMPM + "</td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.FechaFinal+ "</td>";
										tds += "<td>" + value.Tiempo+ "</td>";
										tds += "<td>" + value.Empresa+ "</td>";
										tds += "<td>" + value.Zona + "</td>";
										tds += "<td>" + value.Bus+ "</td>";
										tds += "<td>" + value.Tipo+ "</td>";
										tds += "<td>" + value.Novedades+ "</td>";
										tds += "<td>" + value.Usuario+ "</td></tr>";
							tableBody.append(tds);
						}

					);
				}

				$('#tableOperaciones').dataTable( {
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
				} );
				$(".imgCargando").hide();
			}
			,"json");
}
function CargarMedicion(IdInspeccion)
{
	var idInspeccion = $(this).find('information').attr("Prefijo");
	var Coordenadas = $(this).find('information').attr("Coordenadas");
	
	$("#divTableOperaciones").hide("slide");
	$("#Operaciones_Mediciones").show("slide");

	$.post("php/CargarMediciones.php", {IdInspeccion: idInspeccion}, function(data)
		{

			$("#Operaciones_Mediciones div").remove();
			$.each(data, function(index, value)
				{

					var tds = "<div>";
						tds += "<article>Hora Inicio: " + value.HoraInicio + "</article>";
						tds += "<article>Hora Final: " + value.HoraFinal + "</article>";
						tds += "<article>Tiempo de la Medición: " + value.TiempoPrueba + " Minutos</article>";
						tds += "<article>Observaciones: " + value.Observaciones + "</article><br />";
						
						/*
						tds += "<label class='labelForm' for='IPObservaciones_" + value.Id + "'>Observaciones: </label>";
						tds += "<textarea style='position:aboslute;float:right;right:10em' class='inputForm' type='text' id='IPObservaciones_"+ value.Id + "' placeholder='Observaciones'></textarea>";
						//tds += "<article id='Medicion_Direccion_" + value.IdMedicion +"'>Direccion: </article>";
						tds += '<button class="ui-button-success ui-button ui-widget ui-corner-all">Agregar Observación</button>';
						*/
					tds += "</div>";
					$("#Operaciones_Mediciones").append(tds);
				});

			$.post("php/CargarHallazgos2.php", {Prefijo: idInspeccion},
				function(data2)
				{
					$.each(data2, function(index, value)
					{
						var tds = "<div>";
							tds += "<article>Consecutivo: " + value.Consecutivo + "</article>";
							tds += "<article>Fecha: " + value.Fecha + "</article>";
							tds += "<article>No Bus: " + value.NoInterno + "</article>";
							tds += "<article>Ruta: " + value.Ruta + "</article>";
							tds += "<article>Infraccion: " + value.CodInfra + "\n" + value.Descripcion + "</article><br />";
							tds += "<article>Observaciones: " + value.Observaciones + "</article><br />";
						tds += "</div>";
						$("#Operaciones_Mediciones").append(tds);
					});
		
				}
				, "json");

			$.post("php/CargarArchivos.php", {Prefijo: idInspeccion}, function(data3)
			{
				

				$.each(data3, function(index, value)
				{

					var tds = "<div id='img_" + index + "'>";
						tds +="<a href='"+ value.Url + "' rel='shadowbox[" + idInspeccion + "]'>" + value.Fecha + " Agregado Por: " + value.Usuario + "</a><br />";
						
						var cadena = value.Url.substring((value.Url.length - 4), value.Url.length);
						if (cadena != ".png" && cadena != ".bmp" && cadena != ".gif" && cadena != "jpeg" && cadena != ".jpg")
						{
							tds += "<a href='Tools/subir/server/php/files/" + idInspeccion + "_" + value.Nombre + "'>Descargar Archivo " + cadena + "</a>";
						} else
						{
							tds +="<img Angulo='" + value.Angulo + "' src='Tools/subir/server/php/files/" + idInspeccion + "_" + value.Nombre + "' id='" + idInspeccion + "_" + value.Nombre + "' height='400' width='400' rel='shadowbox[" + idInspeccion + "]' />";
							tds += "<button Prefijo='" + idInspeccion + "' Nombre='" + value.Nombre + "' class='btnRotarImagen ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Rotar'><span class='ui-button-icon-primary ui-icon ui-icon-arrowrefresh-1-e'></span></button>";	
						}
						
					tds += "</div>";
					$("#Operaciones_Mediciones").append(tds);
					$("#img_" + index + " img").rotate(parseInt(value.Angulo));
					Shadowbox.init();

				});

			}
			,"json");
		}
		,"json");
	

}
function Mediciones_Cerrar_click()
{
	$("#Operaciones_Mediciones").hide("slide");
	
	$("#divTableOperaciones").show("slide");

}

function mostrarMapa2(latitude, longitude, Objeto)
{
	var lat = latitude;
	var lon = longitude;
	
	var coordenada = new google.maps.LatLng(lat,lon);

	var opcionesMapa  = {
		center: coordenada,
		zoom: 18,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	
	var mapa = new google.maps.Map($("#mapa_" + Objeto)[0],opcionesMapa);

	
	var opcionesChinche = {
		position: coordenada,
		map: mapa,
		title: "Coordenadas de Medición"
	};
	var chinche = new google.maps.Marker(opcionesChinche);

	var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({'latLng': coordenada}, 
		function(results, status) 
		{
	      if (status == google.maps.GeocoderStatus.OK) 
	      {
	        if (results[0]) 
	        {
	          //$("#Direccion").text(results[0].address_components[1].long_name);
	          var Direccion = results[0].formatted_address.split(",");
	          $("#Medicion_Direccion_" + Objeto).text(Direccion[0]);
	        }
	      } 
	      else 
	      {
	        $("#Medicion_Direccion_" + Objeto).text("No se ubicó la dirección por " + status);
	      }
	    });
	
	$("#mapa_canvas").css("height", "20em")
					 .css("margin", "0 auto")
					 .css("width", "100%");
}
function VehiculosCrearInspeccion(TipoInspeccion)
{
	var f = new Date();
	var nInspecciones;
	if (Usuario.Fecha != f.getDate())
	{
		localStorage.setItem('contInspecciones', 1);
	} else
	{
		if(!localStorage.contInspecciones)
		{
			localStorage.setItem('contInspecciones', 1);	
		} else
		{
			localStorage.setItem('contInspecciones', parseInt(localStorage.contInspecciones) + 1);	
		}
	}
	$("#Inspecciones_Realizadas span").text(parseInt(localStorage.contInspecciones));

	
	var varFecha = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);

	var CodZ = $("#txtVehiculo_NoInterno").val().substring(0,3).toUpperCase();
	var varZona = CodigoBus[CodZ];
	var varEmpresa;

	
	
	$.each(Zonas, function(index, value)
		{
			if (index == varZona)
			{
				varEmpresa = value.Empresa;
				return false;
			}
		});
	$.post("php/CrearInspeccion.php",
			{	
				InspeccionesTipo: TipoInspeccion,
				idDepartamento : 3,
				Fecha: varFecha,
				CodigoInterno: $("#txtVehiculo_NoInterno").val(),
				BusConductor: "BUS",
				idEmpresa: varEmpresa,
				idLogin: Usuario.Id,
				Coordenadas: varCoordenadas
			},
			function(data)
			{
				varInspeccion = data;
				$.post("php/CargarPendientesInspeccionDiaria.php", { CodigoBus : $("#txtVehiculo_NoInterno").val()},
					function(data2)
					{
						if (data2.length)
						{
							$.each(data2, function(index, value)
								{

									var pItem = value.idInspeccionItem;
									var pTexto = value.Pregunta;

									var tds = "<input class='inputForm ObservacionesInspeccionDiaria' type='text' idInspeccion='" + value.Consecutivo + "' id='txtObsInspeccionDiaria" + pItem + "' required value='" + value.Observaciones + "'>";
									tds += "<label class='labelForm'  id='lblObsInspeccionDiaria" + pItem + "' for='txt" + pItem + "'>" + pTexto + ":</label>";
									//$("#InspeccionDiaria_Pendientes").append("<li id='liObsInspeccionDiaria" + pItem + "'>" + pTexto +"</li>");
									InspeccionDiara_ItemRevisado.push(pItem);
									
									$('#InspeccionDiaria_Observaciones').append(tds);
								});
							$("#btnInspeccionDiaria_Pendientes_2").text(InspeccionDiara_ItemRevisado.length);
						}
					}, "json");

			});
}


function ObtenerCoordenadas()
{
	navigator.geolocation.getCurrentPosition(devCoordenads, errorMapa);
}
function devCoordenads(datos)
{
	var lat = datos.coords.latitude;
	var lon = datos.coords.longitude;
	varCoordenadas =  lat + "," + lon;
}
function Vehiculos_NuevaInspeccion()
{
	$("#btnVehiculos_NuevoBus").hide("slide");
	$("#txtVehiculo_NoInterno").val("");
	$("#txtVehiculo_NoInterno").removeAttr("disabled");

	$("#txtVehiculo_Fecha").val("");
	$("#txtVehiculo_Hora").val("");
	$("#txtVehiculo_Direccion").val("");
	
	$("#InspeccionDiaria_Pendientes li").remove();
	$("#InspeccionDiaria_Observaciones label").remove();
	$("#InspeccionDiaria_Observaciones input").remove();

	InspeccionDiara_GruposRevisados.splice(0, InspeccionDiara_GruposRevisados.length);
	InspeccionDiara_ItemRevisado.splice(0, InspeccionDiara_ItemRevisado.length);
	$("#btnInspeccionDiaria_Pendientes_2").text("0");


	$("#radioset_Vehiculo_TipoInspeccion input").removeAttr('checked');
	$("#Vehiculos_InspeccionDiaria_Tipo input").removeAttr('checked');

	$("#radioset_Vehiculo_TipoInspeccion" ).buttonset('refresh');
		$("#Vehiculos_InspeccionDiaria_Tipo" ).buttonset('refresh');

	$("#radioset_Vehiculo_TipoInspeccion").slideUp();
	$("#Vehiculos_InspeccionDiaria div").slideUp();
	$("#Vehiculos section").slideUp();
	$("#InspeccionDiaria_Pendientes li").remove();
}
function CrearInspeccionDiaria(pItem, pTipo, pTexto)
{
	var CodZ = $("#txtVehiculo_NoInterno").val().substring(0,3).toUpperCase();
	var varZona = CodigoBus[CodZ];
	var varEmpresa;

	var f = new Date();

	var varFecha = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);

var varGrupo = 0;
	$.each(InspeccionDiariaSubGrupos, function(index, value)
		{
			if(pTipo == value.idInspeccionTipo)
			{
				varGrupo = value.IdInspeccionDiaria;
				return false;
			}
		});
		
	$.each(Zonas, function(index, value)
		{
			if (index == varZona)
			{
				varEmpresa = value.Empresa;
				return false;
			}
		});
	$.post("php/CrearInspeccionDiaria.php",
			{	
				Inspeccion: varInspeccion,
				idEmpresa: varEmpresa,
				idZona : varZona,
				Item : pItem,
				Tipo: pTipo,
				Grupo : varGrupo,
				idLogin: Usuario.Id,
				Fecha: varFecha,
				CodigoInterno: $("#txtVehiculo_NoInterno").val()
			}, function(data)
			{
				var tds = "<input class='inputForm ObservacionesInspeccionDiaria' type='text' idInspeccion='" + data + "' id='txtObsInspeccionDiaria" + pItem + "' required/>";
				tds += "<label class='labelForm'  id='lblObsInspeccionDiaria" + pItem + "' for='txt" + pItem + "'>" + pTexto + ":</label>";
				InspeccionDiara_ItemRevisado.push(pItem);

				$("#btnInspeccionDiaria_Pendientes_2").text(InspeccionDiara_ItemRevisado.length);
				
				$('#InspeccionDiaria_Observaciones').append(tds);
			});	
}
function InspeccionDiaria_AgregarObservaciones()
{
	var varIdInspeccion = $(this).attr("idInspeccion");
	var varObservaciones = $(this).val();
	
	$.post("php/CrearInspeccionDiariaObservaciones.php", {Inspeccion: varIdInspeccion, Observaciones: varObservaciones});

}
function autoCompleteHallazgos(Codigo, NumHallazgo)
{
	$("#txtHallazgo_CodigoMulta_" + NumHallazgo).val(Codigo);
	CargarDescripcionMultas(NumHallazgo);
}
function SeleccionarInmovilizacion()
{
	$("#txtVehiculo_CodigoInmovilizacion").val($(this).attr("CR_Codigo"));
	$("#txtVehiculo_CriterioInmovilizacion").val($(this).attr("CR_SubTipo"));
	$("#txtVehiculo_CausaInmovilizacion").val($(this).attr("CR_Tipo"));
	$("#tableCriteriosPorSeleccionar").hide('hide');
}
function SeleccionarInmovilizacion_()
{
	$("#txtFlotaInoperativa_CodigoInmovilizacion").val($(this).attr("CR_Codigo"));
	$("#txtFlotaInoperativa_CriterioInmovilizacion").val($(this).attr("CR_SubTipo"));
	$("#txtFlotaInoperativa_CausaInmovilizacion").val($(this).attr("CR_Tipo"));
	$("#tableCriteriosPorSeleccionar_").hide('hide');
}
function SeleccionarHabilitacion()
{
	$("#txtVehiculo_CodigoHabilitacion").val($(this).attr("CR_Codigo"));
	$("#txtVehiculo_CriterioHabilitacion").val($(this).attr("CR_SubTipo"));
	$("#txtVehiculo_CausaHabilitacion").val($(this).attr("CR_Tipo"));
	$("#tableCriteriosPorSeleccionar_Hab").hide('hide');
}
function SeleccionarHabilitacion_()
{
	$("#txtVehiculo_CodigoHabilitacion_").val($(this).attr("CR_Codigo"));
	$("#txtVehiculo_CriterioHabilitacion_").val($(this).attr("CR_SubTipo"));
	$("#txtVehiculo_CausaHabilitacion_").val($(this).attr("CR_Tipo"));
	$("#tableCriteriosPorSeleccionar_Hab_").hide('hide');
}
function MostrarCriteriosInmovilizacion()
{
	if ($("#tableCriteriosPorSeleccionar").is (':visible'))	
	{
		$("#tableCriteriosPorSeleccionar").hide('slide');
	}
	else
	{
		$("#tableCriteriosPorSeleccionar").show('slide');	
	}
}
function MostrarCriteriosInmovilizacion_()
{
	if ($("#tableCriteriosPorSeleccionar_").is (':visible'))	
	{
		$("#tableCriteriosPorSeleccionar_").hide('slide');
	}
	else
	{
		$("#tableCriteriosPorSeleccionar_").show('slide');	
	}
}
function MostrarCriteriosHabilitacion()
{
	if ($("#tableCriteriosPorSeleccionar_Hab").is (':visible'))	
	{
		$("#tableCriteriosPorSeleccionar_Hab").hide('slide');
	}
	else
	{
		$("#tableCriteriosPorSeleccionar_Hab").show('slide');	
	}
}
function MostrarCriteriosHabilitacion_()
{
	if ($("#tableCriteriosPorSeleccionar_Hab_").is (':visible'))	
	{
		$("#tableCriteriosPorSeleccionar_Hab_").hide('slide');
	}
	else
	{
		$("#tableCriteriosPorSeleccionar_Hab_").show('slide');	
	}
}
function Vehiculos_Inmovilizar()
{
	var f = new Date();
	var varFecha = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);
	$.post("php/InmovilizarVehiculo.php",
	{
		Fecha: varFecha,
		CodigoInterno: $("#txtVehiculo_NoInterno").val(),
		Causa: $("#txtVehiculo_CodigoInmovilizacion").val(),
		Observaciones: $("#txtVehiculo_Inmovilizacion_Observaciones").val(),
		idLogin: Usuario.Id
	}, function()
	{
		$("#txtVehiculo_CodigoInmovilizacion").val("");
		$("#txtVehiculo_Inmovilizacion_Observaciones").val("");
		$("#txtVehiculo_CausaInmovilizacion").val("");
		$("#txtVehiculo_CriterioInmovilizacion").val("");
	});

}
function CargarHabilitacionBus()
{
	$("#Vehiculos_Habilitar").show("slide");
	$("#txtVehiculo_Habilitar_Observaciones").val("");
	$.post("php/BuscarInmovilizado.php", {CodigoInterno: $("#txtVehiculo_NoInterno").val()},
		function(data)
		{
			if (data[0])
				{
					$("#Vehiculos_Habilitar").attr("CodigoInmovilizacion", data[0].Consecutivo);

					$("#Vehiculos_Habilitar article").slideDown();
					$("#Vehiculos_Habilitar h2").slideUp();
					$("#btnVehiculos_Habilitar").slideDown();

					$("#Vehiculos_Habilitar_Fecha span").text(data[0].Fecha);
					$("#Vehiculos_Habilitar_Tipo span").text(data[0].Tipo);
					$("#Vehiculos_Habilitar_Subtipo span").text(data[0].Subtipo);
					$("#Vehiculos_Habilitar_Observaciones span").text(data[0].Observaciones);
					$("#Vehiculos_Habilitar_Usuario span").text(data[0].Usuario);
				}
				else
				{
					$("#Vehiculos_Habilitar article").slideUp();
					$("#Vehiculos_Habilitar h2").slideDown();
					$("#btnVehiculos_Habilitar").slideUp();

					$("#Vehiculos_Habilitar").attr("CodigoInmovilizacion", "0");

				}

		}
		,"json");
}
function btnVehiculos_Habilitar_Click()
{
	var f = new Date();
	var Hora = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);

	$.post("php/HabilitarBus.php", 
			{
				Consecutivo: $("#Vehiculos_Habilitar").attr("CodigoInmovilizacion"), 
				IdUsuario: Usuario.Id,
				Observaciones: $("#txtVehiculo_Habilitar_Observaciones").val(),
				Fecha : Hora,
				CausaHabilitacion : $("#txtVehiculo_CodigoHabilitacion").val()
			});
	$("#Vehiculos_Habilitar").hide("slide");
}
function btnVehiculo_InspeccionPer_Tipos_SubGrupos_Volver_Click()
{
	$("#Vehiculos_InspeccionPeriodica_Preguntas").hide("slide");
	$("#Vehiculos_InspeccionPeriodica_Categorias").show("slide");
}
function Vehiculos_InspeccionPeriodica_Categorias_button_Click()
{
	$("#Vehiculos_InspeccionPeriodica_Preguntas").show("slide");
	$("#Vehiculos_InspeccionPeriodica_Categorias").hide("slide");	
}
function btnVehiculosInmovilizados_Buscar_Click()
{
	$(".imgCargando").show();

	$('#tableInmovilizados').dataTable().fnDestroy();
	$("#tableInmovilizados").find("tbody").find("tr").remove();

	$.post("php/BuscarInmovilizados.php", {Desde: $("#txtVehiculosInmovilizados_Desde").val(), Hasta: $("#txtVehiculosInmovilizados_Hasta").val(), Zona: $("#VehiculosInmovilizados_Zona").val(), Estado: $("#VehiculosInmovilizados_Estado").val()},
		function(data)
		{
			if (data != 0)
			{
				var tableBody = $("#tableInmovilizados").find("tbody");
				$.each(data, function(index, value)
					{
							
							if (value.Estado == "Inmovilizado")
							{
								var tds2 = "<button Consecutivo='" + value.Consecutivo + "' class='btnHabilitarBus ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Habilitar'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button>";	
							} else
							{
								var tds2 = "✔";
							}
								var tds = "<tr>";
									tds += "<td>" + tds2+ "</td>";
										tds += "<td>" + value.Estado+ "</td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.CodigoInterno+ "</td>";
										tds += "<td>" + value.Tipo+ "</td>";
										tds += "<td>" + value.Subtipo+ "</td>";
										tds += "<td>" + value.Observaciones+ "</td>";
										tds += "<td>" + value.Usuario+ "</td>";
										tds += "<td>" + value.FechaHabilitacion+ "</td>";
										tds += "<td>" + value.CausaHabilitacion+ "</td>";
										tds += "<td>" + value.ObservacionesHabilitacion+ "</td></tr>";
							tableBody.append(tds);
					}
					);
			}
			$('#tableInmovilizados').dataTable( {
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
				} );

			$(".imgCargando").hide();
			
		}
		,"json");
}
function CriteriosInmovilizacion()
{
	$('#tableCriteriosInmovilizacion').dataTable().fnDestroy();
	$("#tableCriteriosInmovilizacion").find("tbody").find("tr").remove();

	$.post("php/CargarCriteriosInmovilizacion2.php",
			function(data)
			{
				var tableBody = $("#tableCriteriosInmovilizacion").find("tbody");
				$.each(data, function(index, value)
						{
							var tds = "<tr>";
										tds += "<td>" + value.Descripcion + "</td>";
										tds += "<td>" + value.Codigo + "</td>";
										tds += "<td>" + "<input id='txtCriterioInmovilizacion_TiempoCorrecion_"+ value.Id + "' type='text' value='" + value.TiempoSolucion + "'/></td>";
										tds += "<td>" + "<button InsCriInmo_Codigo='"+ value.Id +"' class='GuardarCriInmo ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Guardar'><span class='ui-button-icon-primary ui-icon ui-icon-disk'></span></button></td></tr>";
								tableBody.append(tds);
						}
					);

				$("#tableCriteriosInmovilizacion").datatable();
			}
			,"json");	
}
function EditarMultas()
{
	$.post("php/CargarMultas2.php",
			function(data)
			{
				$.each(data, function(index, value)
						{
							var tds = "<tr id='Multa_" + value.Id + "'>";
							tds += "<td><input id='txtMulta_Codigo_"+ value.Id + "' type='text' value='" +  value.Codigo +"'/></td>";
							tds += "<td><input id='txtMulta_Descripcion_"+ value.Id + "' type='text' value='" +  value.Descripcion +"'/></td>";
							tds += "<td><input id='txtMulta_Valor_"+ value.Id + "' type='text' value='" + value.Valor + "'/></td>";
							tds += "<td><input id='txtMulta_TiempoCorrecion_"+ value.Id + "' type='text' value='" + value.TiempoCorreccion + "'/></td>";
							tds += "<td><button MU_Codigo='"+ value.Id +"' class='EliminarMulta ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Eliminar'><span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span></button></td>";
							tds += "<td><button MU_Codigo='"+ value.Id +"' class='GuardarMulta ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Guardar'><span class='ui-button-icon-primary ui-icon ui-icon-disk'></span></button></td>";
							tds += "</tr>";
							$("#tableEditarMultas tbody").append(tds);
						}

					);

				var tds = "<tr id='Multa_0'>";
							tds += "<td><input id='txtMulta_Codigo_0' type='text' value=''/></td>";
							tds += "<td><input id='txtMulta_Descripcion_0' type='text' value=''/></td>";
							tds += "<td><input id='txtMulta_Valor_0' type='text' value=''/></td>";
							tds += "<td><input id='txtMulta_TiempoCorrecion_0' type='text' value=''/></td>";
							tds += "<td><button MU_Codigo='0' class='EliminarMulta ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Eliminar'><span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span></button></td>";
							tds += "<td><button MU_Codigo='0' class='GuardarMulta ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Guardar'><span class='ui-button-icon-primary ui-icon ui-icon-disk'></span></button></td>";
							tds += "</tr>";
							$("#tableEditarMultas tbody").append(tds);
						
			}
			,"json");	
}
function HabilitarBus()
{
	$("#txtObservacionesHabilitacion").val("");
	var varConsecutivo = $(this).attr("Consecutivo");
	$("#ObservacionesHabilitacion").dialog({
				autoOpen: false, 				
				title: "Habilitar Bus",
				minHeight: 150,
				minWidth: 600,
				buttons: [
							{
								text: "Guardar",
								click: function() {

													var f = new Date();
													var Hora = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);
													$.post("php/HabilitarBus.php", 
																{
																	Consecutivo : varConsecutivo,
																	IdUsuario : Usuario.Id,
																	Observaciones : $("#txtObservacionesHabilitacion").val(),
																	CausaHabilitacion : $("#txtVehiculo_CodigoHabilitacion_").val(),
																	Fecha : Hora
																});
													 	$(this).dialog("close"); 
													 	btnVehiculosInmovilizados_Buscar_Click();
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
	$("#ObservacionesHabilitacion").dialog('open');
		
}
function btnLevantarHallazgo_click()
{
	var f = new Date();
	var Hora = Usuario.Id + "-" + f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + "-" + CompletarConCero(f.getHours(), 2) + "-" + CompletarConCero(f.getMinutes(), 2) + "-" + CompletarConCero(f.getSeconds(), 	2);

	$("#txtHallazgo_Fecha_Contador").val(f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + ":" + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2));

		$("#btnDesplegarMultas_Contador").attr("varContador", "Contador");
		$("#tableHallazgosPorSeleccionar_Contador .SeleccionarMulta").attr("varContador", "Contador");

		$("#txtHallazgo_CodigoMulta_Contador")
				.autocomplete(
					{
						source: jsonMultas,
						select: function( event, ui ) 
								{
									$("#txtHallazgo_CodigoMulta_Contador").val(ui.item.Codigo);
									CargarDescripcionMultas("Contador");
						          	return false;
								}
					});
				
	
		$("#Hallazgo").dialog({
				autoOpen: false, 				
				title: "Registrar Novedad",
				minHeight: 200,
				minWidth: 600,
				buttons: [
							{
								text: "Guardar",
								click: function() { 
													GuardarHallazgo(Hora);
													$(this).dialog("close"); 
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
		
		$("#Hallazgo .ifrSubir").attr("src", "Tools/subir/index.html?Hora=" + Hora + "&Usuario=" + Usuario.Id);
		$("#Hallazgo").dialog('open');
}
function Vehiculos_InspeccionPeriodica_Click()
{
	$(".VehiculoInspeccionPeriodica").remove();
	
	$.each(InspeccionPeriodica, function(index, value)
	{
			var tds = "<button class='VehiculoInspeccion_SinRevisar VehiculoInspeccionPeriodica' IdInspeccionPeriodica='" + value.Id + "'>"
			tds += value.Id + ". " + value.Nombre + "</button>";
			$("#Vehiculos_InspeccionPeriodica_Categorias").append(tds);
	});
	
	
	$("#Vehiculos_InspeccionPeriodica_Categorias").show("slide");
	$("#Vehiculos_InspeccionPeriodica_Preguntas").hide("slide");

}
function VehiculoInspeccionPeriodica_Click()
{
	$(this).removeClass("VehiculoInspeccion_SinRevisar");
	$(this).addClass("VehiculoInspeccion_Revisado");	

	var IdInspeccionPeriodica = $(this).attr("IdInspeccionPeriodica");
	$("#Vehiculos_InspeccionPeriodica_Preguntas article").remove()
	$.each(InspeccionPeriodicaPreguntas, function(index, value)
						{
							if (value.IdInspeccionPeriodica == IdInspeccionPeriodica)
							{
								var tds = "<article>";
								tds += "<span>" + value.Nombre + "</span>";
								tds += '<div id="IP_ButtonSet_' + value.Id + '" class="IP_ButtonSet">';
								tds += '<input type="radio" id="rdbIP_' + value.Id + '_1" name="rdbnIP_' + value.Id + '" value="1" />';
								tds += '<label for="rdbIP_'+ value.Id + '_1">Bueno</label>';
								
								tds += '<input type="radio" id="rdbIP_' + value.Id + '_2" name="rdbnIP_' + value.Id + '" value="2" />';
								tds += '<label for="rdbIP_' + value.Id +'_2">Malo</label>';

								tds += '<input type="radio" id="rdbIP_' + value.Id + '_3" name="rdbnIP_'+ value.Id + '" value="3" checked="checked"/>';
								tds += '<label for="rdbIP_'+ value.Id + '_3">No Aplica</label>';
								tds += '</div>';
								tds += "<label class='labelForm' for='IPObservaciones_" + value.Id + "'>Observaciones: </label>";
								tds += "<textarea class='inputForm IPObservaciones' type='text' id='IPObservaciones_"+ value.Id + "' placeholder='Observaciones'></textarea>";
								tds += "</article>";

								$("#Vehiculos_InspeccionPeriodica_Preguntas").append(tds);
								$('#IP_ButtonSet_' + value.Id).buttonset();
							}
						});
	$("#Vehiculos_InspeccionPeriodica_Categorias").hide("slide");
	$("#Vehiculos_InspeccionPeriodica_Preguntas").show("slide");
}
function GuardarHallazgo(Prefijo)
{
	var f = new Date();
	var Hora = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);

	$.post("php/CrearHallazgo.php", 
	{
			Fecha : $("#txtHallazgo_Fecha_Contador").val(),
			NoInterno : $("#txtHallazgo_NInterno2_Contador").val(),
			Infraccion : $("#txtHallazgo_CodigoMulta_Contador").val(),
			Observaciones : $("#txtHallazgo_Observaciones_Contador").val(),
			idLogin : Usuario.Id,	
			Prefijo : Prefijo,
			Estado : 0,
			CodConductor : $("#txtHallazgo_CodConductor_Contador").val(),
			Ruta : $("#txtHallazgo_Ruta_Contador").val(),
			Comprobado_Por : $("#txtHallazgo_ComprobadoPor_Contador").val()
	}
		);
}
function GuardarHallazgo2(Prefijo, varContador)
{
	var f = new Date();
	var Hora = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);

	$.post("php/CrearHallazgo.php", 
	{
			Fecha : $("#txtHallazgo_Fecha_" + varContador).val(),
			NoInterno : $("#txtHallazgo_NInterno2_" + varContador).val(),
			Infraccion : $("#txtHallazgo_CodigoMulta_" + varContador).val(),
			Observaciones : $("#txtHallazgo_Observaciones_" + varContador).val(),
			idLogin : Usuario.Id,	
			Prefijo : Prefijo,
			Estado : 0,
			CodConductor : $("#txtHallazgo_CodConductor_" + varContador).val(),
			Ruta : $("#txtHallazgo_Ruta_" + varContador).val(),
			Comprobado_Por : $("#txtHallazgo_ComprobadoPor_" + varContador).val()
	}
		);
}
function CargarHallazgos()
{
	
	$('#tableHallazgos').dataTable().fnDestroy();
	$("#tableHallazgos").find("tbody").find("tr").remove();
  	var pZona = 0;
  	if (varConcesionario)
  	{
		pZona = Usuario.Zona;	
  	}else
  	{
  		pZona = $("#txtHallazgos_Zona").val();
  	}

	$(".imgCargando").show();
	
	$.post("php/CargarHallazgos.php",
		{
			Desde: $("#txtHallazgos_Desde").val(),
			Hasta: $("#txtHallazgos_Hasta").val(),
			Consecutivos : $("#txtHallazgos_Consecutivos").val(),
			Zona: pZona,
			pDepartamento: Usuario.IdCompany,
			Rol: Usuario.IdInitialRol,
			Estado: $("#txtHallazgos_Estado").val()
		},
			function(data)
			{
				if (data != 0)
				{
					var tableBody = $("#tableHallazgos").find("tbody");
					$.each(data, function(index, value)
						{
								var tds = "<tr>";
										tds += "<td>" + value.Consecutivo + "<information Consecutivo='" + value.Consecutivo + "' Prefijo= '" + value.Prefijo +  "' Estado='" + value.Estado + "'/></td>";
										tds += "<td>" + value.Medicion+ "</td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.FechaNotificacion + "</td>";
										tds += "<td>" + value.NoInterno+ "</td>";
										tds += "<td>" + value.Placa+ "</td>";
										tds += "<td>" + value.Empresa+ "</td>";
										tds += "<td>" + value.Zona+ "</td>";
										tds += "<td>" + value.Ruta+ "</td>";										
										tds += "<td>" + value.CodConductor+ "</td>";
										tds += "<td>" + value.CodInfra+ "</td>";
										tds += "<td>" + value.NumMultas+ "</td>";
										tds += "<td>" + value.NumMulta+ "</td>";
										tds += "<td>" + value.Descripcion+ "</td>";
										tds += "<td>" + value.Observaciones+ "</td>";
										tds += "<td>" + value.Usuario+ "</td>";
										tds += "<td>" + value.Comprobado_Por + "</td>";
										tds += "<td>" + value.Departamento+ "</td>";
										tds += "<td>" + value.Estado+ "</td>";
										tds += "<td>" + value.NumArchivos+ "</td></tr>";
								tableBody.append(tds);
						});
				}
				$(".imgCargando").hide();

				$('#tableHallazgos').dataTable( {
					"sDom": 'CTW<"clear">lfrtip',
					"aaSorting": [[ 2, "asc" ]],
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
				} );
			}
			,"json");
}
function CargarDatosHallazgo()
{	
	filaSeleccionadaHallazgo = this;
	//$(filaSeleccionadaHallazgo).html('<td class=" ">Prueba<information consecutivo="5455" prefijo="156-2014-01-18-03-01-35" estado="Hallazgo Identificado"></information></td><td class=" ">--</td><td class="  sorting_1">2014-01-18 03:03:03</td><td class=" ">Z20-4010</td><td class=" ">VEQ245</td><td class=" ">MASIVO CAPITAL S.A.S</td><td class=" ">SUBA ORIENTAL</td><td class=" "></td><td class=" "></td><td class=" ">M5031</td><td class=" ">Operar con rines pelados, abollados, golpeados o con colores diferentes a los autorizados por TRANSMIENIO S.A.</td><td class=" ">Rin 2 rayado</td><td class=" ">Carlos Alberto Ayure Alonso</td><td class=" ">Vehículos</td><td class=" ">Hallazgo Identificado</td>');
	
	
	/*
	var objFila = $(filaSeleccionadaHallazgo).find("td");
	var tdsFila = "<tr>;
	$.each(objFila, function(index, value)
	{
		tdsFila += "<td>" + $(value).html() +"</td>";
	});
	var tdsFila += "</tr>;
	*/

	$("#tableHallazgo").find("tbody").find("tr").remove();
	$("#tableHallazgo").append("<tr>" + $(filaSeleccionadaHallazgo).html() + "</tr>");

	$("#DatosHallazgo_Cerrar").show();
	
	$("#Hallazgos_Mediciones div").remove();
	
		var pIdHallazgo = $(this).find('information').attr("Consecutivo");

		ConcesionarioHallazgoActivo = pIdHallazgo;

		if (ConcesionarioObservaciones[ConcesionarioHallazgoActivo] != "")
		{
			$("#btnHallazgoAgregarObservaciones").hide();
		}
		var pPrefijo = $(this).find('information').attr("Prefijo");
		var pEstado = $(this).find('information').attr("Estado");
		var idInspeccion = pPrefijo;
	
	var pIdEstado = 0;


	$.each(EstadoHallazgos, function(index, value)
		{
			if (value.Descripcion == pEstado)
				{
					pIdEstado = value.Consecutivo;
					pEstadoHallazgoSeleccionado = pEstado;
				}
		}
		);
	$("#Hallazgo_Estado").val(pIdEstado);
	$("#Hallazgo_Estado").attr("Prefijo", pPrefijo);
	
	
	$("#divTableHallazgos").hide("slide");
	$("#Hallazgos_Mediciones").show("slide");

	$("#Hallazgos_Mediciones").append("<div id='Hallazgos_Archivos_'><h2>Archivos</h2><div id='Hallazgos_Archivos'></div></div>");
	$.post("php/CargarArchivos.php", {Prefijo: pPrefijo}, function(data)
		{
			$(".imgCargando").show();	
			$.each(data, function(index, value)
				{
					var tds = "<div id='img_" + index + "'>";
						//tds +="<a href='Tools/subir/server/php/files/" + pPrefijo + "_" +value.Nombre + "' rel='shadowbox[" + pPrefijo + "]'>" + value.Fecha + " Agregado Por: " + value.Usuario + "</a><br />";
						tds += "<h5>" + value.Usuario + " cargó:</h5>";
						
						//alert(value.Url);
						
						var cadena = value.Url.substring((value.Url.length - 4), value.Url.length);
						
						if (cadena != ".png" && cadena != ".bmp" && cadena != ".gif" && cadena != "jpeg" && cadena != ".jpg")
						{
							var imgicono = "css/imagenes/ICOotros.png";
							if (cadena == ".doc" || cadena == "docx" || cadena == ".txt")
								{ imgicono = "css/imagenes/ICOword.png"}
							if (cadena == ".pdf")
								{ imgicono = "css/imagenes/ICOpdf.png"}
							if (cadena == ".xls" || cadena == "xlsx")
								{ imgicono = "css/imagenes/ICOexcel.png"}
							if (cadena == ".ppt" || cadena == "pptx" || cadena == ".pps" || cadena == "ppsx")
								{ imgicono = "css/imagenes/ICOpowerpoint.png"}
							if (cadena == ".asf" || cadena == ".avi" || cadena == ".bik" || cadena == ".div" || cadena == "divx" || cadena == ".dvd" || cadena == ".ivf" || cadena == ".flv" || cadena == ".m1v" || cadena == ".mov" || cadena == "mp2v" || cadena == ".mp4" || cadena == ".mpa" || cadena == ".mpe" || cadena == "mpeg" || cadena == ".mpg" || cadena == ".qtl" || cadena == ".rad" || cadena == ".rmp" || cadena == ".smk" || cadena == ".wmv" || cadena == ".mob")
								{ imgicono = "css/imagenes/ICOvideo.png"}

							tds += "<button class='btnDescargarArchivo ui-button-success ui-button ui-widget ui-corner-all' url='" + value.Url + "'>";
  							tds += "<span><img src='" + imgicono + "' height='30' width='30'/>"
  							tds += "<span>Descargar Archivo <span>" + cadena + "</span></button>";

							//tds += "<a href='Tools/subir/server/php/files/" + idInspeccion + "_" + value.Nombre + "'>Descargar Archivo " + cadena + "</a>";
						} else
						{
							tds +="<img Angulo='" + value.Angulo + "' src='" + value.Url + "' id='" + idInspeccion + "_" + value.Nombre + "' height='auto' width='97%' rel='shadowbox[" + idInspeccion + "]' />";
							tds += "<button Prefijo='" + idInspeccion + "' Nombre='" + value.Nombre + "' class='btnRotarImagen ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Rotar'><span class='ui-button-icon-primary ui-icon ui-icon-arrowrefresh-1-e'></span></button>";	
						}
						/*
						tds +="<img Angulo='" + value.Angulo + "' src='" + value.Url + "' id='" + pPrefijo + "_" + value.Nombre + "' height='auto' width='80%'' rel='shadowbox[" + pPrefijo + "]' />";
						tds += "<button Prefijo='" + pPrefijo + "' Estado='" + pEstado + "' Nombre='" + value.Nombre + "' class='btnRotarImagen ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Rotar'><span class='ui-button-icon-primary ui-icon ui-icon-arrowrefresh-1-e'></span></button>";
						*/
						tds += "<h4>" + value.Fecha + "</h4>";
					tds += "</div>";
					$("#Hallazgos_Archivos").append(tds);
					$("#img_" + index + " img").rotate(parseInt(value.Angulo));
					Shadowbox.init();
				});	
			$(".imgCargando").hide();	
		}
		,"json");

	var BanderaObj = true;
					if (varConcesionario)
					{
						BanderaObj = false;
						if (pEstado == "Hallazgo validado por el Especialista del área" || pEstado == "Posible desincentivo que inicia proceso contractual")
						{
							BanderaObj = true;
						}
					}

					if (BanderaObj == true)
					{
						var tds = "<iframe class='ifrSubir' src='Tools/subir/index.html?Hora=" + pPrefijo + "&Usuario=" + Usuario.Id + "'></iframe>";
						$("#Hallazgos_Archivos_").append(tds);
					}

	$("#Hallazgos_Mediciones").append("<div id='Hallazgos_Observaciones_'><h2>Observaciones</h2><div id='Hallazgos_Observaciones'></div></div>");
	$("#Hallazgos_Observaciones_").css("width", "40%");
	$.post("php/CargarObservaciones.php", {Prefijo : pPrefijo},
		function(data)
		{
			
			$.each(data, function(index, value)
			{
				var tds = "<div class='divObservaciones'>";
						tds +="<h5>" + value.Usuario + ": <span>" + value.Nombre + "</span></h5>";
						tds +="<h4>" + value.Fecha + "</h4>";
					tds += "</div><br />";
					$("#Hallazgos_Observaciones").append(tds);
			}
				);
		}
		, "json");
	var BanderaObj = true;
					if (varConcesionario)
					{
						BanderaObj = false;
						if (pEstado == "Hallazgo validado por el Especialista del área" || pEstado == "Posible desincentivo que inicia proceso contractual")
						{
							BanderaObj = true;
						}
					}

					if (BanderaObj == true)
					{
						var tds = "<textarea id='txtHallazgoAgregarObservaciones' style='width:85%;'' class='inputForm' type='text' placeholder='Agregar Observación...'></textarea>";
							tds += '<button  id="btnHallazgoAgregarObservaciones" Prefijo="' + pPrefijo + '" Estado="' + pEstado + '" class="ui-button-success ui-button ui-widget ui-corner-all">Agregar Observación</button>';
							//tds += "<iframe class='ifrSubir' src='Tools/subir/index.html?Hora=" + pPrefijo + "&Usuario=" + Usuario.Id + "'></iframe>";
						$("#Hallazgos_Observaciones_").append(tds);
					}

		
}


function DatosHallazgo_Cerrar_click()
{
	$("#Hallazgos_Mediciones").hide("slide");
	$("#divTableHallazgos").show("slide");

}
function btnHallazgoAgregarObservaciones_Click()
{
	if ($("#txtHallazgoAgregarObservaciones").val() != "")
	{
		var f = new Date();

			var varFecha = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);
			var pPrefijo = $(this).attr("Prefijo");
			var pEstado = $(this).attr("Estado");
			var varEstado = 13;
			if (pEstado != "Hallazgo validado por el Especialista del área")
			{
				varEstado = 14;
			}
			if (varConcesionario)
			{
				$.post("php/CambiarEstadoHallazgo.php", {Estado : varEstado, Prefijo : pPrefijo});
				$(filaSeleccionadaHallazgo).remove();	
				$("#btnHallazgoAgregarObservaciones").hide();

				$.post("php/EnviarAEspecialista.php", {Consecutivo: pPrefijo});
			}

			$.post("php/CrearObservacion.php", {Observacion: $("#txtHallazgoAgregarObservaciones").val(), idLogin: Usuario.Id, Fecha: varFecha, Prefijo: pPrefijo});

			var tds = "<div class='divObservaciones'>";
						tds +="<h5>" + Usuario.NickName + ": <span>" + $("#txtHallazgoAgregarObservaciones").val() + "</span></h5>";
						tds +="<h4>" + varFecha + "</h4>";
					tds += "</div><br />";
					$("#Hallazgos_Observaciones").append(tds);

			$("#txtHallazgoAgregarObservaciones").val("");		
			//CargarHallazgos();
	}
}
function CargarSeguridad()
{
	$(".imgCargando").show();

	$('#tableSeguridad').dataTable().fnDestroy();
	$("#tableSeguridad").find("tbody").find("tr").remove();

	$.post("php/CargarInspeccionesSeguridad.php",
		{
			Desde: $("#txtSeguridad_Desde").val(),
			Hasta: $("#txtSeguridad_Hasta").val(),
			Medicion: $("#txtSeguridad_TipoMedicion").val()
		},
			function(data)
			{
			if (data != 0)
				{
					var tableBody = $("#tableSeguridad").find("tbody");
					$.each(data, function(index, value)
						{
							var tds = "<tr>";
										tds += "<td>" + value.IdInspeccion + "<information  idInspeccion= '" + value.IdInspeccion +  "' Coordenadas='" + value.Coordenadas + "' /></td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.Empresa+ "</td>";
										tds += "<td>" + value.Bus+ "</td>";
										tds += "<td>" + value.Ruta+ "</td>";
										tds += "<td>" + value.Tipo+ "</td>";
										tds += "<td>0</td>";
										tds += "<td>" + value.Usuario + "</td></tr>";
								tableBody.append(tds);
						}

					);
				}

				$('#tableSeguridad').dataTable( {
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
				} );

				$(".imgCargando").hide();


			}
			,"json");
}
function EliminarMulta_click()
{
	var CodMulta = $(this).attr("MU_Codigo");
	$("#Multa_" + CodMulta).remove();

	$.post("php/EliminarMulta.php", {Id : CodMulta});
}
function GuardarMulta_Click()
{
	var CodMulta = $(this).attr("MU_Codigo");
	if (CodMulta == 0)
	{
		$.post("php/CrearMulta.php", 
			{
				Codigo: $("#txtMulta_Codigo_0").val(),
				Descripcion: $("#txtMulta_Descripcion_0").val(),
				Valor: $("#txtMulta_Valor_0").val(),
				TiempoCorreccion: $("#txtMulta_TiempoCorrecion_0").val()
			},
			function(data)
			{
				$("#txtMulta_Codigo_0").attr("id", "txtMulta_Codigo_" + data);
				$("#txtMulta_Descripcion_0").attr("id", "txtMulta_Descripcion_" + data);
				$("#txtMulta_Valor_0").attr("id", "txtMulta_Valor_" + data);
				$("#txtMulta_TiempoCorrecion_0").attr("id", "txtMulta_TiempoCorrecion_" + data);

				var tds = "<tr id='Multa_0'>";
				tds += "<td><input id='txtMulta_Codigo_0' type='text' value=''/></td>";
				tds += "<td><input id='txtMulta_Descripcion_0' type='text' value=''/></td>";
				tds += "<td><input id='txtMulta_Valor_0' type='text' value=''/></td>";
				tds += "<td><input id='txtMulta_TiempoCorrecion_0' type='text' value=''/></td>";
				tds += "<td><button MU_Codigo='0' class='EliminarMulta ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Eliminar'><span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span></button></td>";
				tds += "<td><button MU_Codigo='0' class='GuardarMulta ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Guardar'><span class='ui-button-icon-primary ui-icon ui-icon-disk'></span></button></td>";
				tds += "</tr>";
				$("#tableEditarMultas tbody").append(tds);
			});
	}
	else
	{
		$.post("php/EditarMulta.php", 
			{
				id: CodMulta,
				Codigo: $("#txtMulta_Codigo_" + CodMulta).val(),
				Descripcion: $("#txtMulta_Descripcion_" + CodMulta).val(),
				Valor: $("#txtMulta_Valor_" + CodMulta).val(),
				TiempoCorreccion: $("#txtMulta_TiempoCorrecion_" + CodMulta).val()
			},
			function(data)
			{
				alert("Multa " + $("#txtMulta_Codigo_" + CodMulta).val() + " Editada");
			});
	}
}
function EditarInspeccionDiaria()
{
	$('#tableEditarInspeccionDiaria').dataTable().fnDestroy();
	$("#tableEditarInspeccionDiaria").find("tbody").find("tr").remove();

	$.post("php/CargarInspeccionDiariaItems.php",
			function(data)
			{
				var tableBody = $("#tableHallazgos").find("tbody");
				$.each(data, function(index, value)
						{
							var tds ="<tr>";
										tds += "<td>" + value.Categoria+ "</td>";
										tds += "<td>" + value.Grupo+ "</td>";
										tds += "<td>" + value.Subgrupo+ "</td>";
										tds += "<td>" + value.Item+ "</td>";
										tds += "<td>" + "<input id='txtInsDiaria_TiempoCorrecion_"+ value.Id + "' type='text' value='" + value.TiempoSolucion + "'/></td>";
										tds += "<td>" + "<button InsDiaria_Codigo='"+ value.Id +"' class='GuardarInsDiaria ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Guardar'><span class='ui-button-icon-primary ui-icon ui-icon-disk'></span></button></td></tr>";
							tableBody.append(tds);
						}
					);
				$("#tableEditarInspeccionDiaria").dataTable();
			}, "json");
}
function GuardarInsDiaria_Click()
{
	var IdInsDiaria = $(this).attr("InsDiaria_Codigo");

	$.post("php/EditarInsDiaria.php", 
			{
				id: IdInsDiaria,
				TiempoCorreccion: $("#txtInsDiaria_TiempoCorrecion_" + IdInsDiaria).val()
			},
			function(data)
			{
				alert("Registro Editado Exitosamente");
			});

}
function EditarInspeccionPeriodica()
{
	$('#tableEditarInspeccionPeriodica').dataTable().fnDestroy();
	var tableBody = $("#tableEditarInspeccionPeriodica").find("tbody");
	
	tableBody.find("tr").remove();

	$.post("php/CargarInspeccionPeriodicaItems.php",
			function(data)
			{
				$.each(data, function(index, value)
						{
							var tds = "<tr>";
								tds += "<td>" + "<input id='txtInsPeriodica_Categoria_"+ value.Id + "' value='" + value.Categoria + "'/></td>";
								tds += "<td>" + "<textarea id='txtInsPeriodica_Grupo_"+ value.Id + "'>" + value.Grupo+ "</textarea></td>";
								tds += "<td>" + "<textarea id='txtInsPeriodica_Item_"+ value.Id + "'>" + value.Item+ "</textarea></td>";
								tds += "<td>" + "<input id='txtInsPeriodica_TiempoCorrecion_"+ value.Id + "' type='text' value='" + value.TiempoSolucion + "'/></td>";
								tds += "<td>" + "<button InsPeriodica_Codigo='"+ value.Id +"' class='GuardarInsPeriodica ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Guardar'><span class='ui-button-icon-primary ui-icon ui-icon-disk'></span></button>"+ "</td>";
								tds += "<td>" + "<button InsPeriodica_Codigo='"+ value.Id +"' class='BorrarInsPeriodica ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Borrar'><span class='ui-button-icon-primary ui-icon ui-icon-closethick'></span></button>"+ "</td></tr>";

								tableBody.append(tds);
						}
					);
				$("#tableEditarInspeccionPeriodica").dataTable();
			}, "json");
}
function GuardarInsPeriodica_Click()
{
	var IdInsPeriodica = $(this).attr("InsPeriodica_Codigo");

	$.post("php/EditarInsPeriodica.php", 
			{
				id: IdInsPeriodica,
				pItem: $("#txtInsPeriodica_Item_" + IdInsPeriodica).val(),
				pSubGrupo: $("#txtInsPeriodica_Grupo_" + IdInsPeriodica).val(),
				pGrupo: $("#txtInsPeriodica_Categoria_" + IdInsPeriodica).val(),
				pTiempoCorreccion: $("#txtInsPeriodica_TiempoCorrecion_" + IdInsPeriodica).val()
			},
			function(data)
			{
				alert("Registro Editado Exitosamente");
			});
}
function BorrarInsPeriodica_Click()
{
	var IdInsPeriodica = $(this).attr("InsPeriodica_Codigo");
	var obj = $(this);

	$.post("php/EditarInsPeriodica.php", 
			{
				id: IdInsPeriodica,
				pItem: $("#txtInsPeriodica_Item_" + IdInsPeriodica).val(),
				pSubGrupo: $("#txtInsPeriodica_Grupo_" + IdInsPeriodica).val(),
				pGrupo: $("#txtInsPeriodica_Categoria_" + IdInsPeriodica).val(),
				pTiempoCorreccion: "Borrar"
			},
			function(data)
			{
				alert("Registro Borrado");
				$(obj).parent("td").parent("tr").remove();
			});
}
function GuardarCriInmo_Click()
{
	var IdCriterio = $(this).attr("InsCriInmo_Codigo");

	$.post("php/EditarCriterio.php", 
			{
				id: IdCriterio,
				TiempoCorreccion: $("#txtCriterioInmovilizacion_TiempoCorrecion_" + IdInsPeriodica).val()
			},
			function(data)
			{
				alert("Registro Editado Exitosamente");
			});
}
function IP_ButtonSet_input_Click()
{
	var varValor =$(this).val();
	var IdItem = $(this).attr("name").replace("rdbnIP_", "");
	InspeccionPeriodica_Crear(varValor, IdItem);

}
function InspeccionPeriodica_AgregarObservaciones()
{
	var IdItem = $(this).attr("id").replace("IPObservaciones_", "");
	var valor = $('input:radio[name=rdbnIP_' + IdItem + ']:checked').val();

	InspeccionPeriodica_Crear(valor, IdItem);
}

function InspeccionPeriodica_Crear(varValor, IdItem)
{
	var f = new Date();

	var varFecha = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);

	var CodZ = $("#txtVehiculo_NoInterno").val().substring(0,3).toUpperCase();
	var varZona = CodigoBus[CodZ];
	var varEmpresa;

	varObservaciones = $("#IPObservaciones_" + IdItem).val();

	$.each(Zonas, function(index, value)
		{
			if (index == varZona)
			{
				varEmpresa = value.Empresa;
				return false;
			}
		});

	$.post("php/CrearInspeccionPeriodica.php",
			{	
				Inspeccion: varInspeccion,
				idEmpresa: varEmpresa,
				idZona : varZona,
				Item : IdItem,
				idLogin: Usuario.Id,
				Fecha: varFecha,
				CodigoInterno: $("#txtVehiculo_NoInterno").val(),
				Observaciones : varObservaciones, 
				Valor : varValor
			});	
}
function CargarInspecciones_Vehiculos()
{
	$('#tableVehiculos').dataTable().fnDestroy();
	var tableBody = $("#tableVehiculos").find("tbody");
	tableBody.find("tr").remove();

	$(".imgCargando").show();
	
	$.post("php/CargarInspeccionesVehiculos.php",
		{
			Desde: $("#txtVehiculos_Desde").val(),
			Hasta: $("#txtVehiculos_Hasta").val(),
			Medicion: $("#txtVehiculos_TipoMedicion").val()
		},
			function(data)
			{
			if (data[0])
				{
					$.each(data, function(index, value)
						{
							var tds = "<tr>";
							tds += "<td>" + value.IdInspeccion + "<information  idInspeccion= '" + value.IdInspeccion +  "' Coordenadas='" + value.Coordenadas + "' TipoInspeccion='" + value.Tipo + "'/>"+ "</td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.Empresa+ "</td>";
										tds += "<td>" + value.Zona+ "</td>";
										tds += "<td>" + value.Bus+ "</td>";
										tds += "<td>" + value.Tipo+ "</td>";
										tds += "<td>" + value.Novedades+ "</td>";
										tds += "<td>" + value.Usuario+ "</td></tr>";
							tableBody.append(tds);
						}
					);
				}

				$('#tableVehiculos').dataTable( {
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
				} );
				$(".imgCargando").hide();
			}
			,"json");
}
function InspeccionDiaria_EliminarNoConformidad(pItem)
{
	$.post("php/InsDiara_BorrarPendiente.php", { Item : pItem, Bus: $("#txtVehiculo_NoInterno").val()});	
}
function Mediciones_Vehiculos_Cerrar()
{
	$("#Vehiculos_Mediciones").hide("slide");
	$("#divTableVehiculos").show("slide");
}

function CargarMedicionVehiculos()
{
	 $("#divTableVehiculos").hide("slide");
	 $("#Vehiculos_Mediciones").show("slide");

	 $('#tableVehiculos2').dataTable().fnDestroy();
	var tableBody = $("#tableVehiculos2").find("tbody");
	tableBody.find("tr").remove();

	var pTipo = $(this).find('information').attr('TipoInspeccion');
	var pInspeccion = $(this).find('information').attr('idInspeccion');
	var pCoordenadas = $(this).find('information').attr('Coordenadas');

	if(pTipo == "Inspección Diaria")
		{
			pTipo = 1;
		} else
		{
			pTipo = 2;
		}

	$.post("php/CargarDatosInspeccionDiaria.php", {IdInspeccion: pInspeccion, Tipo: pTipo, Coordenadas: pCoordenadas},
		function(data)
		{

			$.each(data, function(index,value)
			{
				if(value.Consecutivo)
				{
					var tds = "<tr>";
					tds += "<td>" + value.Consecutivo+ "</td>";
						tds += "<td>" + value.Fecha+ "</td>";
						tds += "<td>" + value.Pregunta+ "</td>";
						tds += "<td>" + value.Observaciones+ "</td>";
						tds += "<td>" + value.Estado+ "</td>";
						tds += "<td>" + value.Coordenadas+ "</td></tr>";

						tableBody.append(tds);
				}
			});
			$('#tableVehiculos2').dataTable( {
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
			} );
		}
		,"json");
}

function btnVehiculosNovedadesPendientes_Buscar_Click()
{
	$(".imgCargando").show();

	$('#tableVehiculosNovedadesPendientes').dataTable().fnDestroy();
	var tableBody = $("#tableVehiculosNovedadesPendientes").find("tbody");
	tableBody.find("tr").remove();
	
	var valor = $('input:radio[name=rdb_VehiculosNovedadesPendientes_Zona]:checked').val();	
	if (!valor)
		{valor = 0;}

	$.post("php/CargarDatosInspeccionDiaria2.php", {idZona: valor},
		function(data)
		{
			$(".imgCargando").hide();
			if (data[0].Consecutivo)
			{
				$.each(data, function(index, value)
				{
					var tds = "<tr>";
					tds += "<td>" + value.CodigoBus+ "</td>";
						tds += "<td>" + value.Categoria+ "</td>";
						tds += "<td>" + value.Grupo+ "</td>";
						tds += "<td>" + value.Subgrupo+ "</td>";
						tds += "<td>" + value.Item+ "</td>";
						tds += "<td>" + value.Fecha+ "</td>";
						tds += "<td>" + value.TiempoSolucion+ "</td>";
						tds += "<td>" + value.Usuario+ "</td>";
						tds += "<td><button CodigoBus='" + value.CodigoBus + "' Consecutivo='" + value.Consecutivo + "' class='btnCorregirNoConformidad ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Corregido'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td>";
					
					tableBody.append(tds);
				});
			}

			$('#tableVehiculosNovedadesPendientes').dataTable( 
			{
		    	"fnCreatedRow": function( nRow, aData, iDataIndex ) 
    					{
					      if ( parseInt(aData[6]) <= 1 )
      						{
        						//$('td:eq(6)', nRow).html('<strong style="color:red;">' + aData[6] + '</strong>' );
        						$('td', nRow).css("color", "red");
        						$('td', nRow).css("background-color", "#FFCCCC");
      						}
    					},
    			"sDom": 'CT<"clear">lfrtip',
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
			
		}, "json");

}
function btnCorregirNoConformidad_Click()
{
	$("#txtObservacionesVehiculosCorreccion").val("");
	var varConsecutivo = $(this).attr("Consecutivo");
	var varCodBus = $(this).attr("CodigoBus");
	$("#VehiculosObservacionesCorrecion").dialog({
				autoOpen: false, 				
				title: "Corregir No Conformidad",
				minHeight: 300,
				minWidth: 450,
				buttons: [
							{
								text: "Guardar",
								click: function() {

													var f = new Date();
													var Hora = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);
													$.post("php/CorregirNoConformidad.php", 
																{
																	Consecutivo: varConsecutivo,
																	IdUsuario: Usuario.Id,
																	Observaciones: $("#txtObservacionesVehiculosCorreccion").val(),
																	Fecha : Hora
																}, function()
																{
																	btnVehiculosNovedadesPendientes_Buscar_Click();
																	$("#txtVehiculo_NoInterno").val(varCodBus);
																	VehiculosCrearInspeccion(1);																
																});
													 	$(this).dialog("close"); 
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
	$("#VehiculosObservacionesCorrecion").dialog('open');	
}
function Hallazgo_Estado_Change()
{
	$(".imgCargando").show();
	var pEstado = $(this).val();
	var pPrefijo = $(this).attr("Prefijo");

	$.post("php/CambiarEstadoHallazgo.php", {Estado : pEstado, Prefijo : pPrefijo}, 
		function()
		{
			$(".imgCargando").hide();

			var re = new RegExp(pEstadoHallazgoSeleccionado, 'g');
			$(filaSeleccionadaHallazgo).html($(filaSeleccionadaHallazgo).html().replace(re, EstadoHallazgos[pEstado].Descripcion));
			pEstadoHallazgoSeleccionado =  EstadoHallazgos[pEstado].Descripcion;
			
			$("#tableHallazgo").find("tbody").find("tr").remove();
			$("#tableHallazgo").append("<tr>" + $(filaSeleccionadaHallazgo).html() + "</tr>");

			//CargarHallazgos();
		}
		);
}

function CargarMedicionSeguridad()
{
	var objFila = $(this).find("td");
	if ($(objFila[5]).html() == "Desaceleración")
	{	
		$("#Seguridad_Mediciones").show('slide');
		$("#divTableSeguridad").hide("slide");	
		var idInspeccion = $(this).find("information").attr('idInspeccion');
		$.post("php/CargarDatosDesaceleracion.php",{Inspeccion: idInspeccion},
			function(data)
			{
				$("#Seguridad_Mediciones iframe").remove();
				$("#Seguridad_Mediciones div").remove();
				
				var tds = "<div style='position:absolute;float:right;right:10em;'>";
				tds += "<article>Fecha Inicio:" + data[0].HoraInicio + "</article>"
				tds += "<article>Fecha  Final:" + data[0].HoraFinal + "</article>"
				tds += "<article>Tiempo de Medición:" + data[0].TiempoPrueba + " Minutos</article>"
				tds += "<article>Velocidad Promedio:" + data[0].Velocidad + " Km/h</article>"
				tds += "<article>Velocidad Máxima:" + data[0].VelocidadMaxima + " Km/h</article>"
				tds += "<article>Num Frenadas:" + data[0].Frenadas + "</article>"
				tds += "<article>Num Arrancadas:" + data[0].Arrancadas + "</article>"

				tds += "</div>";
				localStorage.setItem("Coordenadas", data[0].Coordenadas);
				tds +=	"<iframe width='400' height='600' src='Tools/UbicacionSeguridad/index.html'></iframe>";
				$("#Seguridad_Mediciones").append(tds);
			}
			, "json");
	}

}
function Mediciones_Seguridad_Cerrar_click()
{
	$("#Seguridad_Mediciones").hide('slide');
	$("#divTableSeguridad").show("slide");

}
function btnRotarImagen_Click()
{
	var pAngulo = parseInt($(this).parent("div").find("img").attr("Angulo"));
	if (isNaN(pAngulo))
		{ pAngulo = 0;}
	pAngulo = pAngulo + 90;
	$(this).parent("div").find("img").attr("Angulo", pAngulo);
	var pNombre = $(this).attr("Nombre");
	var pPrefijo = $(this).attr("Prefijo");
	$(this).parent("div").find("img").rotate(pAngulo);

	$.post("php/EditarAngulo.php", {Prefijo : pPrefijo, Nombre: pNombre, Angulo: pAngulo});
}
function menuVer_Observaciones_Click()
{
	$("#Hallazgos_Mediciones div").remove();
	$("#Hallazgos_Mediciones").append("<div id='Hallazgos_Observaciones_'><div id='Hallazgos_Observaciones'></div></div>");
	$("#Hallazgos_Observaciones_").css("width", "97%");

	$.post("php/CargarObservaciones.php", {Prefijo : publicPrefijo},
		function(data)
		{
			//$("#DatosHallazgo_Cerrar").hide();

			$.each(data, function(index, value)
			{
				var tds = "<div class='divObservaciones'>";
						tds +="<h5>" + value.Usuario + ": <span>" + value.Nombre + "</span></h5>";
						tds +="<h4>" + value.Fecha + "</h4>";
					tds += "</div><br />";
					$("#Hallazgos_Observaciones").append(tds);
			}
				);

			$("#Hallazgos_Mediciones").dialog({
				autoOpen: false, 				
				title: "",
				minHeight: 300,
				minWidth: 800
											});
			$("#Hallazgos_Mediciones").dialog('open');
		}
		, "json");
	
}
function btnCargarBuses_Volver_Click()
{
	$("#ifrSubirBuses").attr('src', "Tools/excelReader/Buses.html");
}
function btnCargarConductores_Volver_Click()
{
	$("#ifrSubirConductores").attr('src', 'Tools/excelReader/Conductores.html');
}
function btnCargarInspecciones_Volver_Click()
{
	$("#ifrSubirInspecciones").attr('src', 'Tools/excelReader/Inspecciones.html');
}
function btnCargarInmovilizados_Volver_Click()
{
	$("#ifrSubirInmovilizados").attr('src', 'Tools/excelReader/Inmovilizados.html');
};

function btnGenHallazgos_Buscar_Click()
{
	$("#btnGenHallazgos_Descargar").hide();
	$(".imgCargando").show();

	$('#tableGenHallazgos').dataTable().fnDestroy();
	var tableBody = $("#tableGenHallazgos").find("tbody");
	tableBody.find("tr").remove();

	$.post("php/GenHallazgos.php",
		{
			Desde: $("#GenHallazgos_Desde").val(),
			Hasta: $("#GenHallazgos_Hasta").val(),
			Estado: $("#GenHallazgos_Estado").val(),
			Departamento: Usuario.IdCompany
		},
			function(data)
			{
				$("#btnGenHallazgos_Descargar").show('slide');

			if (data[0])
				{
					
					$.each(data, function(index, value)
						{
							var tds ="<tr>";
								tds += "<td>" + $("#GenHallazgos_Desde").val() + " - " + $("#GenHallazgos_Hasta").val() + "</td>";
										tds += "<td>" + value.Departamento+ "</td>";
										tds += "<td></td>";
										tds += "<td>" + value.Medicion+ "</td>";
										tds += "<td>" + value.Consecutivo+ "</td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.Hora + "</td>";
										tds += "<td>" + value.HoraInicial + "</td>";
										tds += "<td>" + value.HoraFinal + "</td>";
										tds += "<td>" + value.Empresa+ "</td>";
										tds += "<td>" + value.Zona+ "</td>";
										tds += "<td>" + value.Ruta+ "</td>";										
										tds += "<td>" + value.NoInterno+ "</td>";
										tds += "<td>" + value.Placa+ "</td>";
										tds += "<td>" + value.CodConductor+ "</td>";
										tds += "<td>" + value.CodInfra+ "</td>";
										tds += "<td>" + value.Descripcion+ "</td>";
										tds += "<td>" + value.Observaciones+ "</td>";
										tds += "<td>" + value.Usuario+ "</td>";
										tds += "<td>" + "<a href='" + value.Evidencias + "'>"+ value.Evidencias + "</a>"+ "</td>";
										tds += "<td></td>";
										tds += "<td></td>";
										tds += "<td>" + value.Estado+ "</td>";
										tds += "<td>" + value.FechaConversion+ "</td></tr>";
							tableBody.append(tds);
						}

					);
				}

				$('#tableGenHallazgos').dataTable( {
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
				} );

				$(".imgCargando").hide();
			}
			,"json");
}

function tableGenHallazgos_a_Click(evento)
{
	evento.preventDefault();
	abrirPopup($(this).attr("href"));
}
function btnGenHallazgos_Descargar_Click()
{
	$(".imgCargando").show();
	$("#btnGenHallazgos_Buscar").hide();
	$.post("php/CrearCarpetas.php",
		{
			Desde: $("#GenHallazgos_Desde").val(),
			Hasta: $("#GenHallazgos_Hasta").val(),
			pUsuario : Usuario.Id,
			Estado: $("#GenHallazgos_Estado").val(),
			Departamento: Usuario.IdCompany
		},
			function(data)
			{
				$.post("php/ComprimirCarpetas.php", {pUsuario : Usuario.Id}, function(data2)
					{
						//abrirPopup("InformeSemanal.zip")
						document.location= '/InformeSemanal/' + Usuario.Id + '/InformeSemanal.zip';
						$(".imgCargando").hide();
						$("#btnGenHallazgos_Buscar").show('slide');
					});
			});
}
function btnReporteHallazgosPorVencer_Buscar_Click()
{
	$(".imgCargando").show();
	$("#btnReporteHallazgosPorVencer_Buscar").hide('slide');

	$('#tableHallazgosPorVencer').dataTable().fnDestroy();
	var tableBody = $("#tableHallazgosPorVencer").find("tbody");
	tableBody.find("tr").remove();

	var pZona = 0;
	if (varConcesionario)
  	{
		pZona = Usuario.Zona;	
  	}else
  	{
  		pZona = $('input:radio[name=rdb_ReporteHallazgosPorVencer_Zona]:checked').val();
  	}

	$.post("php/CargarHallazgosPorVencer.php",
		{
			Zona: pZona,
			pDepartamento: Usuario.IdCompany,
			DesdeH : $("#txtReporteHallazgosPorVencer_Desde").val(),
			HastaH : $("#txtReporteHallazgosPorVencer_Hasta").val(),
			Desde : $("#txtReporteHallazgosPorVencer_DesdeH").val(),
			Hasta : $("#txtReporteHallazgosPorVencer_HastaH").val()
		},
			function(data)
			{
				$("#btnReporteHallazgosPorVencer_Buscar").show('slide');

			if (data != 0)
				{
					
					$.each(data, function(index, value)
						{
							var tds ="<tr>";
										tds += "<td>" + value.FechaNotificacion + "</td>";
										tds += "<td>" + value.Consecutivo + "</td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.TiempoCorreccion + "</td>";
										tds += "<td>" + value.TiempoRestante + "</td>";
										tds += "<td>" + value.Estado + "</td>";
										tds += "<td>" + value.NoInterno+ "</td>";
										tds += "<td>" + value.CodInfra+ "</td>";
										tds += "<td>" + value.Descripcion+ "</td>";
										tds += "<td>" + value.Observaciones+ "</td>";

										//tds += "<td><button Consecutivo='" + value.Consecutivo + "' class='btnRevisarHallazgo ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Corregido'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td></tr>";
							tableBody.append(tds);
						}

					);
				}

				$('#tableHallazgosPorVencer').dataTable( {
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
				} );

				$(".imgCargando").hide();
			}
			,"json");
}
function btnRevisarHallazgo_Click()
{
	var strConsecutivo = $(this).attr("Consecutivo");
	$.post("php/CorregirHallazgo.php", {Consecutivo: strConsecutivo});

	$(this).parent("td").parent("tr").remove();
}
function btnEnviarCorreo_Click() 
{
	$.post("Tools/mensajes/mailattach.php",
	{
		Asunto: "Prueba",
		Remitente: "sistema@gbjsitp.com",
		Destinatario: "jhonathan2@gmail.com",
		Mensaje: "Prueba de:" + Usuario.NickName + " <br> Salto"
	}
		);
}
function tableHallazgo_td_Click()
{
	if (!varConcesionario)
	{
		var Estados = [
	{"titulo": "IdHallazgo", "campo" : "Consecutivo"},
	{"titulo": "Inspección", "campo" : ""},
	{"titulo": "Fecha", "campo" : "Fecha"},
	{"titulo": "FechaNotificacion", "campo" : ""},
	{"titulo": "No Bus", "campo" : "NoInterno"},
	{"titulo": "Placa", "campo" : ""},
	{"titulo": "Empresa", "campo" : ""},
	{"titulo": "Zona", "campo" : ""},
	{"titulo": "Ruta", "campo" : "Ruta"},
	{"titulo": "Cod Conductor", "campo" : "CodConductor"},
	{"titulo": "Infraccion", "campo" : "Infraccion"},
	{"titulo": "Multas", "campo" : ""},
	{"titulo": "Recurrencia", "campo" : ""},
	{"titulo": "Descripcion", "campo" : ""},
	{"titulo": "Observaciones", "campo" : "Observaciones"},
	{"titulo": "Usuario", "campo" : ""},
	{"titulo": "Comprobado Por", "campo" : "Comprobado_Por"},
	{"titulo": "Departamento", "campo" : ""},
	{"titulo": "Estado", "campo" : ""},
	{"titulo": "NumArchivos", "campo" : ""}
	];

		var idCeldaSeleccionada = 0;
		var Celda = this;

		var objFila = $(filaSeleccionadaHallazgo).find("td");

			var objConsecutivo = $(objFila[0]).html().split("<");
				$("#txtEditarHallazgo_Valor").attr("Consecutivo", objConsecutivo[0]);

			CeldaHallazgo = $(Celda).html();
			idCeldaSeleccionada = Celda.cellIndex;
			
			/*
			0  IdHallazgo
			1  Inspección
			2  Fecha
			3  FechaNotificacion
			4  No Bus
			5  Placa
			6  Empresa
			7  Zona
			8  Ruta
			9  Cod Conductor
			10  Infraccion
			11 Multas
			12 Recurrencia
			13 Descripcion
			14 Observaciones
			15 Usuario
			16 Comprobado Por
			17 Departamento
			18 Estado
			19 NumArchivos
			*/
			
		if (idCeldaSeleccionada == 2 || idCeldaSeleccionada == 4 || idCeldaSeleccionada == 8 || idCeldaSeleccionada == 9 || idCeldaSeleccionada == 10 || idCeldaSeleccionada == 14 || idCeldaSeleccionada == 16)
			{
				$("#txtEditarHallazgo_Valor").val(CeldaHallazgo);
				$("#txtEditarHallazgo_Valor").attr("idCelda", idCeldaSeleccionada);
				$("#txtEditarHallazgo_Valor").attr("Campo", Estados[idCeldaSeleccionada].campo);
				$("#secEditarHallazgo").dialog({
					autoOpen: false, 				
					title: "Editar " + Estados[idCeldaSeleccionada].titulo,
					minWidth: 300,
					buttons: [
								{
									text: "Actualizar",
									click: function() { secEditarHallazgo_Actualizar();
													  }
								},
								{
									text: "Cancelar",
									click: function() { $(this).dialog("close"); 
													  }
								}
							  ]
									});
				$("#secEditarHallazgo").dialog('open');
			}
	}
}
function secEditarHallazgo_Actualizar () 
{
	$.post("php/EditarHallazgo.php",
		{
			Campo: $("#txtEditarHallazgo_Valor").attr("Campo"),
			Valor: $("#txtEditarHallazgo_Valor").val(),
			Consecutivo: $("#txtEditarHallazgo_Valor").attr("Consecutivo")
		}, function()
		{
			var CeldaFilaSeleccion = $(filaSeleccionadaHallazgo).find("td");
			var celdaDetalle = $("#tableHallazgo").find("tbody").find("tr").find("td");
			$(CeldaFilaSeleccion[$("#txtEditarHallazgo_Valor").attr("idCelda")]).html($("#txtEditarHallazgo_Valor").val());
			$(celdaDetalle[$("#txtEditarHallazgo_Valor").attr("idCelda")]).html($("#txtEditarHallazgo_Valor").val());


			/*
			$(filaSeleccionadaHallazgo).html($(filaSeleccionadaHallazgo).html().replace(CeldaHallazgo, $("#txtEditarHallazgo_Valor").val()));
			$("#tableHallazgo").find("tbody").find("tr").remove();
			$("#tableHallazgo").append("<tr>" + $(filaSeleccionadaHallazgo).html() + "</tr>");
			*/

			$("#secEditarHallazgo").dialog('close');
		});
}
function FlotaInoperativa_Zonas_Click()
{
	var pidZona = $(this).val();
	$.post("php/AutocompletarBuses.php", 
			{
				IdZona : pidZona
			},
			function(data)
			{
				$("#txtFlotaInoperativa_NoBus").autocomplete({ 
						source: data
						});
			},
		"json");
}
function FlotaInoperativa_Submit (argument) 
{
	argument.preventDefault();

	if ($("#txtFlotaInoperativa_NoBus").val() != "")
	{
		if ($("#txtFlotaInoperativa_Fecha").val() != "")
		{
			if ($("#txtFlotaInoperativa_CodigoInmovilizacion").val() != "")
			{
				$.post("php/InoperarVehiculo.php",
				{
					Fecha: $("#txtFlotaInoperativa_Fecha").val(),
					CodigoInterno: $("#txtFlotaInoperativa_NoBus").val(),
					Causa: $("#txtFlotaInoperativa_CodigoInmovilizacion").val(),
					Observaciones: $("#txtFlotaInoperativa_Observaciones").val(),
					idLogin: Usuario.Id
				}, function()
				{
					$("#txtFlotaInoperativa_NoBus").val("");
					$("#txtFlotaInoperativa_CodigoInmovilizacion").val("");
					$("#txtFlotaInoperativa_Inmovilizacion_Observaciones").val("");
					$("#txtFlotaInoperativa_CausaInmovilizacion").val("");
					$("#txtFlotaInoperativa_CriterioInmovilizacion").val("");
				});
			}
		}
	}
}
function btnFlotaInoperativa_Buscar_Click()
{
	$(".imgCargando").show();

	$('#tableInoperativos').dataTable().fnDestroy();
	$("#tableInoperativos").find("tbody").find("tr").remove();

	$.post("php/BuscarInoperativos.php", {Desde: $("#txtFlotaInoperativa_Desde").val(), Hasta: $("#txtFlotaInoperativa_Hasta").val(), Zona: $("#FlotaInoperativa_Zona").val(), Estado: $("#FlotaInoperativa_Estado").val()},
		function(data)
		{
			if (data != 0)
			{
				var tableBody = $("#tableInoperativos").find("tbody");
				$.each(data, function(index, value)
					{
							
							if (value.Estado == "Varado")
							{
								var tds2 = "<button Consecutivo='" + value.Consecutivo + "' class='btnFIHabilitarBus ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Habilitar'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button>";	
							} else
							{
								var tds2 = "✔";
							}
								var tds = "<tr>";
									tds += "<td>" + tds2+ "</td>";
										tds += "<td>" + value.Estado+ "</td>";
										tds += "<td>" + value.Fecha+ "</td>";
										tds += "<td>" + value.Dias+ "</td>";
										tds += "<td>" + value.CodigoInterno+ "</td>";
										tds += "<td>" + value.Tipo+ "</td>";
										tds += "<td>" + value.Subtipo+ "</td>";
										tds += "<td>" + value.Observaciones+ "</td>";
										tds += "<td>" + value.Usuario+ "</td>";
										tds += "<td>" + value.FechaHabilitacion+ "</td>";
										tds += "<td>" + value.ObservacionesHabilitacion+ "</td></tr>";
							tableBody.append(tds);
					}
					);
			}
			$('#tableInoperativos').dataTable( {
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
				} );

			$(".imgCargando").hide();
			
		}
		,"json");
}
function btnMatrizFlotaInoperativa_Buscar_Click()
{
	$(".imgCargando").show();

	$('#tableMatrizInoperativos').dataTable().fnDestroy();
	$("#tableMatrizInoperativos").find("tbody").remove();
	$("#tableMatrizInoperativos").find("thead").remove();

	$.post("php/MatrizInoperativos.php", {Desde: $("#txtMatrizFlotaInoperativa_Desde").val(), Hasta: $("#txtMatrizFlotaInoperativa_Hasta").val()},
		function(data)
		{
			if (data != 0)
			{
				$('#tableMatrizInoperativos').append(data);
			}
			$('#tableMatrizInoperativos').dataTable( {
					"sDom": 'CT<"clear">lfrtip',
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
				} );

			$(".imgCargando").hide();
			
		}
		,"html");
}
function FIHabilitarBus()
{
	$("#txtFIObservacionesHabilitacion").val("");
	var varConsecutivo = $(this).attr("Consecutivo");
	$("#FIObservacionesHabilitacion").dialog({
				autoOpen: false, 				
				title: "Habilitar Bus",
				minHeight: 150,
				minWidth: 300,
				buttons: [
							{
								text: "Guardar",
								click: function() {

													var f = new Date();
													var Hora = f.getFullYear() + "-" + CompletarConCero(f.getMonth() +1, 2) + "-" + CompletarConCero(f.getDate(), 2) + " " + CompletarConCero(f.getHours(), 2) + ":" + CompletarConCero(f.getMinutes(), 2) + ":" + CompletarConCero(f.getSeconds(), 	2);
													$.post("php/FIHabilitarBus.php", 
																{
																	Consecutivo: varConsecutivo,
																	IdUsuario: Usuario.Id,
																	Observaciones: $("#txtFIObservacionesHabilitacion").val(),
																	Fecha : Hora
																});
													 	$(this).dialog("close"); 
													 	btnFlotaInoperativa_Buscar_Click();
												  }
							},
							{
								text: "Cancelar",
								click: function() { $(this).dialog("close"); 
												  }
							}
						  ]
								});
	$("#FIObservacionesHabilitacion").dialog('open');
		
}
function btnAlcoholimetria_Buscar_Click () 
{
	$('#tableAlcoholimetria').dataTable().fnDestroy();
	$("#tableAlcoholimetria").find("tbody").find("tr").remove();
  	

	$(".imgCargando").show();
	
	$.post("php/CargarAlcoholimetria.php",
		{
			Desde: $("#txtAlcoholimetria_Desde").val(),
			Hasta: $("#txtAlcoholimetria_Hasta").val(),
			Zona: $("#Alcoholimetria_Zona").val()
		},
			function(data)
			{
				if (data != 0)
				{
					var tableBody = $("#tableAlcoholimetria").find("tbody");
					$.each(data, function(index, value)
						{
							var tds = "<tr>";
									tds += "<td>" + value.Consecutivo + "</td>";
									tds += "<td>" + value.Fecha+ "</td>";
									tds += "<td>" + value.Conductor+ "</td>";
									tds += "<td>" + value.Bus+ "</td>";
									tds += "<td>" + value.NumPrueba+ "</td>";
									tds += "<td>" + value.Resultado + "</td>";
									tds += "<td>" + value.SegundoTest+ "</td>";
									tds += "<td>" + value.Empresa+ "</td>";										
									tds += "<td>" + value.Zona+ "</td>";
									tds += "<td>" + value.Usuario + "</td></tr>";
							tableBody.append(tds);
						}
					);
				}
				$(".imgCargando").hide();

				$('#tableAlcoholimetria').dataTable( {
					"sDom": 'CTW<"clear">lfrtip',
					"aaSorting": [[ 2, "asc" ]],
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
				} );
			}
			,"json");
}
function btnVelocidad_Buscar_Click () 
{
	$('#tableVelocidad').dataTable().fnDestroy();
	$("#tableVelocidad").find("tbody").find("tr").remove();
  	

	$(".imgCargando").show();
	
	$.post("php/CargarVelocidad.php",
		{
			Desde: $("#txtVelocidad_Desde").val(),
			Hasta: $("#txtVelocidad_Hasta").val(),
			Zona: $("#Velocidad_Zona").val()
		},
			function(data)
			{
				if (data != 0)
				{
					var tableBody = $("#tableVelocidad").find("tbody");
					$.each(data, function(index, value)
						{
							var tds = "<tr>";
									tds += "<td>" + value.Consecutivo + "</td>";
									tds += "<td>" + value.Fecha+ "</td>";
									tds += "<td>" + value.Conductor+ "</td>";
									tds += "<td>" + value.Bus+ "</td>";
									tds += "<td>" + value.Ruta+ "</td>";
									tds += "<td>" + value.Tabla+ "</td>";
									tds += "<td>" + value.Direccion+ "</td>";
									tds += "<td>" + value.Serial+ "</td>";
									tds += "<td>" + value.Limite + "</td>";
									tds += "<td>" + value.Medida+ "</td>";
									tds += "<td>" + value.Empresa+ "</td>";										
									tds += "<td>" + value.Zona+ "</td>";
									tds += "<td>" + value.Usuario + "</td></tr>";
							tableBody.append(tds);
						}
					);
				}
				$(".imgCargando").hide();

				$('#tableVelocidad').dataTable( {
					"sDom": 'CTW<"clear">lfrtip',
					"aaSorting": [[ 2, "asc" ]],
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
				} );
			}
			,"json");
}
function btnSeguridadOperacional_Buscar_Click () 
{
	$('#tableSeguridadOperacional').dataTable().fnDestroy();
	$("#tableSeguridadOperacional").find("tbody").find("tr").remove();
  	

	$(".imgCargando").show();
	
	$.post("php/CargarSeguridadOperacional.php",
		{
			Desde: $("#txtSeguridadOperacional_Desde").val(),
			Hasta: $("#txtSeguridadOperacional_Hasta").val(),
			Zona: $("#SeguridadOperacional_Zona").val()
		},
			function(data)
			{
				if (data != 0)
				{
					var tableBody = $("#tableSeguridadOperacional").find("tbody");
					$.each(data, function(index, value)
						{
							var tds = "<tr>";
									tds += "<td>" + value.Consecutivo + "</td>";
									tds += "<td>" + value.Fecha+ "</td>";
									tds += "<td>" + value.FechaFinal + "</td>";
									tds += "<td>" + value.Conductor+ "</td>";
									tds += "<td>" + value.Bus+ "</td>";
									tds += "<td>" + value.Ruta+ "</td>";
									tds += "<td>" + value.Infraccion+ "</td>";
									tds += "<td>" + value.Descripcion + "</td>";
									tds += "<td>" + value.Observaciones+ "</td>";
									tds += "<td>" + value.Empresa+ "</td>";										
									tds += "<td>" + value.Zona+ "</td>";
									tds += "<td>" + value.Usuario + "</td></tr>";
							tableBody.append(tds);
						}
					);
				}
				$(".imgCargando").hide();

				$('#tableSeguridadOperacional').dataTable( {
					"sDom": 'CTW<"clear">lfrtip',
					"aaSorting": [[ 2, "asc" ]],
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
				} );
			}
			,"json");
}
function btnAlcoholimetriaEspecial_Buscar_Click () 
{
	$('#tableAlcoholimetriaEspecial').dataTable().fnDestroy();
	$("#tableAlcoholimetriaEspecial").find("tbody").find("tr").remove();
  	

	$(".imgCargando").show();
	
	$.post("php/CargarAlcoholimetriaEspecial.php",
		{
			Desde: $("#txtAlcoholimetriaEspecial_Desde").val(),
			Hasta: $("#txtAlcoholimetriaEspecial_Hasta").val(),
			Zona: $("#AlcoholimetriaEspecial_Zona").val(),
			Tiempo : $("#txtAlcoholimetriaEspecial_Tiempo").val()
		},
			function(data)
			{
				if (data != 0)
				{
					var tableBody = $("#tableAlcoholimetriaEspecial").find("tbody");
					$.each(data, function(index, value)
						{
							var tds = "<tr>";
									tds += "<td>" + value.Consecutivo + "</td>";
									tds += "<td>" + value.Fecha+ "</td>";
									tds += "<td>" + value.UltimaInspeccion + "</td>";
									tds += "<td>" + value.ConsecutivoUltimaInspeccion + "</td>";
									tds += "<td>" + value.Conductor+ "</td>";
									tds += "<td>" + value.Bus+ "</td>";
									tds += "<td>" + value.NumPrueba+ "</td>";
									tds += "<td>" + value.Resultado + "</td>";
									tds += "<td>" + value.SegundoTest+ "</td>";
									tds += "<td>" + value.Empresa+ "</td>";										
									tds += "<td>" + value.Zona+ "</td>";
									tds += "<td>" + value.Usuario + "</td></tr>";
							tableBody.append(tds);
						}
					);
				}
				$(".imgCargando").hide();

				$('#tableAlcoholimetriaEspecial').dataTable( {
					"sDom": 'CTW<"clear">lfrtip',
					"aaSorting": [[ 2, "asc" ]],
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
				} );
			}
			,"json");
}
function lnkNovedadesConcesionario_Click()
{
	abrirPopup("NovedadesPendientes.html");
}
function btnHallazgosCorregir_Buscar_Click()
{
	$('#tableHallazgosCorregir').dataTable().fnDestroy();
	$("#tableHallazgosCorregir").find("tbody").find("tr").remove();
  	

	$(".imgCargando").show();
	
	$.post("php/CargarHallazgosCorregir.php",
		{
			pDepartamento: Usuario.IdCompany
		},
			function(data)
			{
				if (data != 0)
				{
					var tableBody = $("#tableHallazgosCorregir").find("tbody");
					$.each(data, function(index, value)
						{
							var tds = "<tr>";
									tds += "<td>" + value.Consecutivo + "</td>";
									tds += "<td>" + value.Fecha+ "</td>";
									tds += "<td>" + value.NoInterno + "</td>";
									tds += "<td>" + value.Infraccion + "</td>";
									tds += "<td>" + value.Observaciones+ "</td>";
									tds += "<td>" + value.NumArchivos + "</td>";
									tds += "<td>" + value.Departamento+ "</td>";
									tds += "<td>" + value.Usuario+ "</td>";
									tds += "<td>" + value.ComprobadoPor+ "</td></tr>";
							tableBody.append(tds);
						}
					);
				}
				$(".imgCargando").hide();

				$('#tableHallazgosCorregir').dataTable( {
					"sDom": 'CTW<"clear">lfrtip',
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
				} );
			}
			,"json");
}
function tableHallazgosCorregir_tr_Click()
{
	filaSeleccionadaHallazgo = $(this);
	var Celdas = $(filaSeleccionadaHallazgo).find("td");

	$("#CorregirHallazgos a").attr("Prefijo", $(Celdas[0]).text());

	$("#txtCorregirHallazgos_Consecutivo").val($(Celdas[0]).text());
	$("#txtCorregirHallazgos_Fecha").val($(Celdas[1]).text());
	$("#txtCorregirHallazgos_NoInterno").val($(Celdas[2]).text());
	$("#txtCorregirHallazgos_Infraccion").val($(Celdas[3]).text());

	$("#CorregirHallazgos").dialog('open');
}
function txtHallazgos_Zonas_Click()
{
	var Cadena = "";
	$.each($("#txtHallazgos_Zonas input:checked"), function(index, value)
	{
		if (Cadena == "")
		{
			Cadena = $(value).val();
		} else
		{
			Cadena += ", " + $(value).val();
		}
	});
	$("#txtHallazgos_Zona").val(Cadena);

}
function txtHallazgos_Estados_Click()
{
	var Cadena = "";
	$.each($("#txtHallazgos_Estados input:checked"), function(index, value)
	{
		if (Cadena == "")
		{
			Cadena = $(value).val();
		} else
		{
			Cadena += ", " + $(value).val();
		}
	});
	$("#txtHallazgos_Estado").val(Cadena);

}
function CorregirHallazgos_a_Click(evento)
{
	evento.preventDefault();
	abrirPopup("php/ListarArchivos.php?Prefijo=" + $(this).attr("Prefijo"));
}
function CorregirHallazgos_Submit(evento)
{
	evento.preventDefault();
	var Celdas = $(filaSeleccionadaHallazgo).find("td");

	$(Celdas[1]).text($("#txtCorregirHallazgos_Fecha").val());
	$(Celdas[2]).text($("#txtCorregirHallazgos_NoInterno").val());
	$(Celdas[3]).text($("#txtCorregirHallazgos_Infraccion").val());

	$.post("php/EditarHallazgo2.php", 
		{
			vConsecutivo : $("#txtCorregirHallazgos_Consecutivo").val(),
			vFecha : $("#txtCorregirHallazgos_Fecha").val(),
			vNoInterno : $("#txtCorregirHallazgos_NoInterno").val(),
			vInfraccion : $("#txtCorregirHallazgos_Infraccion").val()
		}, function(data)
		{
			$("#CorregirHallazgos").dialog('close');
		});
}
function CrearInsPeriodica_submit (evento) 
{
	evento.preventDefault();
	$.post("php/CrearInsPeriodica.php", 
		{
			pGrupo :	$("#txtCrearInsPeriodica_Grupo").val(),
			pSubGrupo : $("#txtCrearInsPeriodica_SubGrupo").val(),
			pItem : $("#txtCrearInsPeriodica_Item").val(),
			pTiempoCorreccion : $("#txtCrearInsPeriodica_TiempoCorrecion").val()
		},
		function (data)
		{
			$("#CrearInsPeriodica").dialog('close');	
		});
}
function cargarConveciones(datos2)
{
	var tmpObj = $(".flotr-legend-color-box");
				$("#divGraficasConvenciones article").remove();
				$.each(tmpObj, function(index, value)
				{
					var objHtml = $(value).html();
									
					var strObj = objHtml.substring(parseInt(objHtml.indexOf("(") + 1 ), parseInt(objHtml.indexOf(")")) );
					var strObj_ = strObj.split(",");
					
					$("#divGraficasConvenciones").append("<article><div style='width:1em; height:1em;background:#"+ rgbToHex(strObj_[0], strObj_[1], strObj_[2]) + ";'></div><span> " + datos2[index].label+"</span></article>");

				});
				$(".flotr-legend").hide();
}
function cargarGrafica(datos2, titulo)
{
	var Contenedor = document.getElementById("divGraficas");
	graph = Flotr.draw(Contenedor,
					datos2
					, {
						title: titulo,
					    bars : {
					      show : true,
					      horizontal : false,
					      shadowSize : 5,
					      barWidth: 1
					    },
					    legend: 
					    {
					    	backgroundOpacity: 0,
					    	position: 'ne'
					    },
					    grid : 
					    {
					      verticalLines : false,
					      horizontalLines : true
					    },
					    mouse:
					    {
					    	relative: true,
					    	track: true,
					    	tackAll: true,
					    	trackDecimals: 0,
					    	trackFormatter: function (x) 
					    	{
					        	return x.series.label +": " + x.series.data[0][1];
					      	}
					    },
					     xaxis: 
					    {  	autoscale: true,
					    	showLabels: false   },
					    yaxis:
					    {  	
					    	autoscale:true,
					    	autoscaleMargin : 1,
					    	min: 0,
					    	showLabels: true,
					    	tickDecimals: 0
					    }
						});
}
function GraficasVehiculosZonas()
{
	var Contenedor = document.getElementById("divGraficas");

	var d1 = [];
	var datos2 = new Array;

	$.post("php/DashBoardCargarZonas.php",
		function(datos)
		{
			$.each(datos, function(index, value)
					{
						d1.push([index, parseInt(value.Cantidad)]);
						datos2[index] = {"data": [d1[index]], "label": value.label};
					}
				);

			cargarGrafica(datos2, "Inmovilizados Por Zona Mayo 2014");
			cargarConveciones(datos2);

		}
	,"json");
}
function GraficasVehiculosTipos()
{
	var Contenedor = document.getElementById("divGraficas");

	var d1 = [];
	var datos2 = new Array;

	$.post("php/DashBoardCargarTipos.php",
		function(datos)
		{
			$.each(datos, function(index, value)
					{
						d1.push([index, parseInt(value.Cantidad)]);
						datos2[index] = {"data": [d1[index]], "label": value.label};
					}
				);

			cargarGrafica(datos2, "Inmovilizados Por Tipos Mayo 2014");
			cargarConveciones(datos2);

		}
	,"json");
}

function GraficasVehiculosMes()
{
	var Contenedor = document.getElementById("divGraficas");

	var d1 = [];
	var datos2 = new Array;

	$.post("php/DashBoardCargarMes.php",
		function(datos)
		{
			$.each(datos, function(index, value)
					{
						d1.push([index, parseInt(value.Cantidad)]);
						datos2[index] = {"data": [d1[index]], "label": value.label};
					}
				);

			cargarGrafica(datos2, "Inmovilizados Por Mes");
			cargarConveciones(datos2);

		}
	,"json");
}
function DashBoard_Opciones_input_click()
{
	if ($(this).val() == 1) //Zonas
	{
		GraficasVehiculosZonas();
	}
	if ($(this).val() == 2) //Tipo
	{
		GraficasVehiculosTipos();
	}

	if ($(this).val() == 3) //Mes
	{
		GraficasVehiculosMes();
	}

}
function rgbToHex(R,G,B) 
{
		return toHex(R)+toHex(G)+toHex(B)
}
function toHex(n) 
{
	 n = parseInt(n,10);
	 if (isNaN(n)) return "00";
	 n = Math.max(0,Math.min(n,255));
	 return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
}
function cargarNovedadesVehiculo()
{
	$.post("php/CargarDatosInspeccionDiaria3.php", {Bus: $("#txtVehiculo_NoInterno").val()}, function(data3)
								{
									var tds = "";
									$("#tableVehiculosNovedadesPendientesPopUp tbody tr").remove();
									$.each(data3, function(index, value)
										{
											tds += "<tr>";
											tds += "<td>" + value.Consecutivo + "</td>";
											tds += "<td>" + value.Grupo + "</td>";
											tds += "<td>" + value.Subgrupo + "</td>";
											tds += "<td>" + value.Item + "</td>";
											tds += "<td>" + value.Fecha + "</td>";
											tds += "<td>" + value.TiempoSolucion + "</td>";
											tds += "<td>" + value.Usuario + "</td>";
											tds += "<td><button CodigoBus='" + value.CodigoBus + "' Consecutivo='" + value.Consecutivo + "' class='btnCorregirNoConformidad ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary' title='Corregido'><span class='ui-button-icon-primary ui-icon ui-icon-check'></span></button></td>";
											tds += "</tr>";

										});
									$("#tableVehiculosNovedadesPendientesPopUp tbody").append(tds);
								},"json");
}