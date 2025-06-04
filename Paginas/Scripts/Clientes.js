var URLBase = "http://itm20251repuestosmotos.runasp.net/";
jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
    let URL = URLBase + "api/TipoTelefonos/LlenarCombo";
    LlenarTablaClientes();
    llenarComboXServiciosAuth(URL, "#cboTipoTelefono");
});

function LlenarTablaClientes() {
    let URL = URLBase + "api/Cliente/ClientesConTelefonos";
    LlenarTablaXServiciosAuth(URL, "#tblClientes");

    }

    function LlenarTablaTelefonos() {
        let idCliente = $("#txtIdCliente").val();
        let URL = URLBase + "api/Telefonos/ListadoTelefonosXCliente?IdCliente=" + idCliente;
        $("#modTelefonosLabel").html("GESTION DE TELÉFONOS DEL CLIENTE: " + $("#txtNombre").val() + " " + $("#txtPrimerApellido").val() + " " + $("#txtSegundoApellido").val());
        LlenarTablaXServiciosAuth(URL, "#tblTelefonos"); 
    }
function editar(idCliente, nombre, primerApellido, segundoApellido, correo) {
    //Se llena el formulario con los datos del cliente
    $("#txtIdCliente").val(idCliente);
    $("#txtNombre").val(nombre);
    $("#txtPrimerApellido").val(primerApellido);
    $("#txtSegundoApellido").val(segundoApellido);
    $("#txtCorreo").val(correo);
}
async function EditarTelefono(Codigo, idTipoTelefono, NumeroTelefono) {
    $("#txtCodigo").val(Codigo);
    $("#cboTipoTelefono").val(idTipoTelefono);
    $("#txtNumero").val(NumeroTelefono);
}

async function EjecutarComando(Metodo, Funcion) {
    event.preventDefault();
    let URL = URLBase + "/api/Telefonos/" + Funcion;
    const telefono = new Telefono($("#txtCodigo").val(), $("#txtNumero").val(), $("#txtIdCliente").val(), $("#cboTipoTelefono").val());
    await EjecutarComandoServicioAuth(Metodo, URL, telefono);
    LlenarTablaTelefonos();
}

async function Consultar() {
    let IdCliente = $("#txtIdCliente").val();
    let URL = URLBase + "api/Cliente/Consultar?IdCliente=" + IdCliente;
    const cliente = await ConsultarServicioAuth(URL);
    if (cliente == null || cliente == undefined) {
        //Hubo un error al procesar el comando
        $("#dvMensaje").removeClass("alert alert-success");
        $("#dvMensaje").addClass("alert alert-danger");
        $("#dvMensaje").html("No se pudo realizar la consulta del cliente");
        $("#txtNombre").val("");
        $("#txtPrimerApellido").val("");
        $("#txtSegundoApellido").val("");
        $("#txtCorreo").val("");
        $("#txtTel").val("");
    } else {
        //Se llenan los campos con la información del empleado
        $("#dvMensaje").removeClass("alert alert-danger");
        $("#dvMensaje").addClass("alert alert-success");
        $("#dvMensaje").html("Se realizo la consulta correctamente");
        $("#txtNombre").val(cliente.Nombre);
        $("#txtPrimerApellido").val(cliente.PrimerApellido);
        $("#txtSegundoApellido").val(cliente.SegundoApellido);
        $("#txtCargo").val(cliente.Correo);
        $("#txtIdSede").val(cliente.Telefono);
    }
}

class Telefono {
    constructor(Codigo, Numero, Documento, CodigoTipoTelefono) {
        this.Codigo = Codigo;
        this.Numero = Numero;
        this.Documento = Documento;
        this.CodigoTipoTelefono = CodigoTipoTelefono;
    }
}