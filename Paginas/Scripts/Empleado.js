const URLBase = "http://itm20251repuestosmotos.runasp.net/";
jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
    LlenarTablaEmpleados();
});
function LlenarTablaEmpleados()
{
    let URL = URLBase + "api/Empleados/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblEmpleados");
    
}
async function EjecutarComando(Metodo, Funcion)
{
    let URL = URLBase + "api/Empleados/" + Funcion;
    const empleado = new Empleado($("#txtIdEmpleado").val(), $("#txtNombre").val(), $("#txtPrimerApellido").val(), $("#txtSegundoApellido").val(), $("#txtCargo").val(), $("#txtIdSede").val());
    const rpta = await EjecutarComandoServicioAuth(Metodo, URL, empleado);
    LlenarTablaEmpleados();
}

async function Consultar()
{
    let IdEmpleado = $("#txtIdEmpleado").val();
    let URL = URLBase + "api/Empleados/ConsultarXIdEmpleado?IdEmpleado=" + IdEmpleado;
    const empleado = await ConsultarServicioAuth(URL);
    if (empleado == null || empleado == undefined) {
        //Hubo un error al procesar el comando
        $("#dvMensaje").removeClass("alert alert-success");
        $("#dvMensaje").addClass("alert alert-danger");
        $("#dvMensaje").html("No se pudo realizar la consulta del empleado");
        $("#txtNombre").val("");
        $("#txtPrimerApellido").val("");
        $("#txtSegundoApellido").val("");
        $("#txtCargo").val("");
        $("#txtIdSede").val("");
    } else {
        //Se llenan los campos con la información del empleado
        $("#dvMensaje").removeClass("alert alert-danger");
        $("#dvMensaje").addClass("alert alert-success");
        $("#dvMensaje").html("Se realizo la consulta correctamente");
        $("#txtNombre").val(empleado.Nombre);
        $("#txtPrimerApellido").val(empleado.PrimerApellido);
        $("#txtSegundoApellido").val(empleado.SegundoApellido);
        $("#txtCargo").val(empleado.Cargo);
        $("#txtIdSede").val(empleado.IdSede);   
    }
}
class Empleado {
    constructor(IdEmpleado, Nombre, PrimerApellido, SegundoApellido, Cargo, IdSede) {
        this.IdEmpleado = IdEmpleado;
        this.Nombre = Nombre;
        this.PrimerApellido = PrimerApellido;
        this.SegundoApellido = SegundoApellido;
        this.SegundoApellido = SegundoApellido;
        this.Cargo = Cargo;
        this.IdSede = IdSede;
    }
}