let sistema = new Sistema();

ocultarSecciones();
ocultarSeccionesNav();

// EVENTOS CLICK
document.querySelector("#btnLoginUsuario").addEventListener("click", login);
document.querySelector("#btnRegistroUsuario").addEventListener("click", registrar);
document.querySelector("#bntAgregarDestino").addEventListener("click", agregarDestino);
document.querySelector("#btnMostrarRegistro").addEventListener("click", mostrarRegistro);
document.querySelector("#btnVolverALogin").addEventListener("click", volverDeRegistroALogin);

// OCULTAR / MOSTRAR
let btnSecciones = document.querySelectorAll(".btnSeccion")
for(let boton of btnSecciones){
    boton.addEventListener("click", mostrarSeccion)
}

let btnCerrarSesion  = document.querySelectorAll(".btnCerrarSesion")
for(let boton of btnCerrarSesion){
    boton.addEventListener("click",cerrarSesion)
}

function mostrarSeccion(){
    ocultarSecciones();
    let idSeccion = this.getAttribute("data-refSec");
    document.querySelector(`#${idSeccion}`).style.display = "block";
}

function mostrarRegistro(){
    document.querySelector("#txtNombreCliente").value = "";
    document.querySelector("#txtApellidoCliente").value = "";
    document.querySelector("#txtNombreUsuario").value = "";
    document.querySelector("#txtContrasenaRegistro").value = "";
    document.querySelector("#txtNumeroTarjeta").value = "";
    document.querySelector("#txtNumeroCVC").value = "";
    document.querySelector("#pMostrarMensajeRegistro").value = "";

    cambiarDisplayClase("preLogin","none");
    cambiarDisplayClase("formRegistro","block");

}

function volverDeRegistroALogin(){
    ocultarSecciones()
    cambiarDisplayClase("preLogin","block");
}

function ocultarSecciones(){
    let secciones = document.querySelectorAll(".seccion")
    for(let seccion of secciones){
        seccion.style.display = "none"
    }
}

function ocultarSeccionesNav(){
    let secciones = document.querySelectorAll(".seccionNav")
    for(let seccion of secciones){
        seccion.style.display = "none"
    }
}

function cambiarDisplayClase(clase,display){
    let sec = document.querySelectorAll(`.${clase}`)
    for(let s of sec){
        s.style.display = display
    }
}

// LOGIN 
function login() {
    let nombreUsuario = document.querySelector("#txtUsuario").value;
    let contrasenia = document.querySelector("#txtContrasenia").value;
    let tipoUsuario = document.querySelector("#slcOpciones").value;
    let pMostrarMensajeLogin = document.querySelector("#pMostrarMensajeLogin");

    let usuarioLogin = sistema.login(nombreUsuario, contrasenia, tipoUsuario);

    if (usuarioLogin != null && tipoUsuario === "C") {   
        cambiarDisplayClase("vistaCliente","block");
        document.querySelector("#bienvenidaCliente").innerHTML = `Bienvenid@ ${sistema.usuarioLogueado.nombre}!`
        cambiarDisplayClase("vistaAdmin","none"); 
        cambiarDisplayClase("preLogin","none"); 
        cambiarDisplayClase("formRegistro","none");
        mostrarTablaDestinos();
        mostrarTablaDestinosEnOferta();
        verHistorialReservas();
        
    } else if (usuarioLogin != null && tipoUsuario === "A") {    
        cambiarDisplayClase("vistaCliente","none");
        cambiarDisplayClase("vistaAdmin","block");
        document.querySelector("#bienvenidaAdmin").innerHTML = `Bienvenid@ ${sistema.usuarioLogueado.nombreUsuario}!`
        cambiarDisplayClase("preLogin","none");
        cambiarDisplayClase("formRegistro","none");
        
    } else {
        pMostrarMensajeLogin.innerHTML = "Información inválida y/o información incompleta";
    }
}

// Cerrar sesión.
function cerrarSesion(){
    document.querySelector("#pMostrarMensajeLogin").innerHTML = "";
    cambiarDisplayClase("preLogin","block");
    cambiarDisplayClase("formRegistro","none");
    ocultarSecciones();
    ocultarSeccionesNav() 
    sistema.cerrarSesion();
} 


// REGISTRO.
function registrar(){
    let nombreCliente = document.querySelector("#txtNombreCliente").value; 
    let apellidoCliente = document.querySelector("#txtApellidoCliente").value; 
    let nombreUsuarioCliente = document.querySelector("#txtNombreUsuario").value; 
    let contrasenia = document.querySelector("#txtContrasenaRegistro").value; 
    let numTarjeta = document.querySelector("#txtNumeroTarjeta").value
    let cvc = Number(document.querySelector("#txtNumeroCVC").value); 
    let saldo = 150000;
    let millas = 0; 

    let pMostrarMensajeRegistro = document.querySelector("#pMostrarMensajeRegistro");

    // Validación password
    let i = 0; 
    let letraMayus = false; 
    let letraMinus = false; 
    let contNumero = false; 
    let contraseniaValida = false; 
    while (i < contrasenia.length){
        if(contrasenia.charAt(i) === contrasenia.charAt(i).toUpperCase()){
            letraMayus = true; 
        }
        if(contrasenia.charAt(i) === contrasenia.charAt(i).toLowerCase()){
            letraMinus = true; 
        }
        if(!isNaN(contrasenia.charAt(i))){
            contNumero = true; 
        }
    i++;
    }

    if(letraMayus && letraMinus && contNumero && contrasenia.length >= 5){
        contraseniaValida = true;
    }
    
    //  Validación CVC 
    let textoCvc = "";
    textoCvc += cvc;
    let cvcCorrecto = false;
    let caracteresNumericos = 0;
    for(let i = 0; i < textoCvc.length; i++){
            if(!isNaN(textoCvc.charAt(i))){
                caracteresNumericos++;
            }
    }

    if(caracteresNumericos === 3 && textoCvc.length === 3){
        cvcCorrecto = true;
    }

    // Validación formato tarjeta.
    let cantNumerosTarjeta = "";
    let guionesCorrectos = false;
    let formatoTarjetaValido = false;

    for(let i = 0; i < numTarjeta.length; i++){
        let caracterActual = numTarjeta.charAt(i);
        if( caracterActual !== "-" && !isNaN(caracterActual)){
            cantNumerosTarjeta++;
        }
    }

    if(numTarjeta.charAt(4) === "-" && numTarjeta.charAt(9) === "-" && numTarjeta.charAt(14) === "-"){
        guionesCorrectos = true;
    }
    
    if(cantNumerosTarjeta === 16 && guionesCorrectos && numTarjeta.length === 19){
        formatoTarjetaValido = true;
    }

		// Registro usuario
        if(nombreCliente !== "" && apellidoCliente !== "" && nombreUsuarioCliente !== "" &&
            contraseniaValida && cvcCorrecto && formatoTarjetaValido){  
            usuarioRegistrado = sistema.registrarCliente(nombreCliente,apellidoCliente,nombreUsuarioCliente,contrasenia,numTarjeta,cvc,saldo,millas);
            if(usuarioRegistrado){
                pMostrarMensajeRegistro.innerHTML = "Usuario registrado correctamente";
            }else{
                pMostrarMensajeRegistro.innerHTML = "Usuario ya registrado";
            }
        }else{
            pMostrarMensajeRegistro.innerHTML = "Datos incorrectos o incompletos";
        }
    }    


//<!--******************* CLIENTE******************** -->
function mostrarTablaDestinos(){
    document.querySelector("#tblMostrarDestinos").innerHTML = "";
    for(let i = 0; i < sistema.destinos.length; i++){
        let destino = sistema.destinos[i]
        let reservaYaExistente = sistema.validarReservaExistente(destino.nombre)
        if(destino.estado && destino.cupos > 0 && !reservaYaExistente){
            document.querySelector("#tblMostrarDestinos").innerHTML += `
            <tr>
                <td>${destino.nombre}</td>
                <td>${destino.descripcion}</td>
                <td>${destino.precioPersona}</td>
                <td><img src="${destino.imagen}"></td>
                <td>${destino.destinoEnOferta()}</td>
                <td><input type="button" value="Reservar" class="btnReservarDestino" data-destinoNombre="${destino.nombre}"
                data-destinoDescripcion="${destino.descripcion}" data-destinoPrecio="${destino.precioPersona}" data-destinoImagen="${destino.imagen}"
                data-cuposDisponibles="${destino.cupos}">
                </td>
            </tr>`
        }else if(destino.estado && destino.cupos > 0 && reservaYaExistente){
        document.querySelector("#tblMostrarDestinos").innerHTML += `
            <tr>
                <td>${destino.nombre}</td>
                <td>${destino.descripcion}</td>
                <td>${destino.precioPersona}</td>
                <td><img src="${destino.imagen}"></td>
                <td>${destino.destinoEnOferta()}</td>
                <td>YA RESERVADO</td>
            </tr>`
        }
            
    } 
    botonesReservarDestino = document.querySelectorAll(".btnReservarDestino");
    for(boton of botonesReservarDestino){
    boton.addEventListener("click", mostrarConfirmacionReserva);
    }
}

    function mostrarTablaDestinosEnOferta(){
        document.querySelector("#tblMostrarDestinosEnOferta").innerHTML = "";
        for(let i = 0; i < sistema.destinos.length; i++){
            let destino = sistema.destinos[i]
            let reservaYaExistente = sistema.validarReservaExistente(destino.nombre)
            if(destino.estado && destino.cupos > 0 && !reservaYaExistente && destino.enOferta){
                document.querySelector("#tblMostrarDestinosEnOferta").innerHTML += `
                <tr>
                    <td>${destino.nombre}</td>
                    <td>${destino.descripcion}</td>
                    <td>${destino.precioPersona}</td>
                    <td><img src="${destino.imagen}"></td>
                    <td>${destino.destinoEnOferta()}</td>
                    <td><input type="button" value="Reservar" class="btnReservarDestinoEnOferta" data-destinoNombre="${destino.nombre}"
                    data-destinoDescripcion="${destino.descripcion}" data-destinoPrecio="${destino.precioPersona}" data-destinoImagen="${destino.imagen}" 
                    data-cuposDisponibles="${destino.cupos}">
                    </td>
                </tr>`
                botonesReservarDestinosEnOferta = document.querySelectorAll(".btnReservarDestinoEnOferta");
                for(boton of botonesReservarDestinosEnOferta){
                boton.addEventListener("click", mostrarConfirmacionReserva);
                }
            }else if(destino.estado && destino.cupos > 0 && reservaYaExistente && destino.enOferta){
            document.querySelector("#tblMostrarDestinosEnOferta").innerHTML += `
                <tr>
                    <td>${destino.nombre}</td>
                    <td>${destino.descripcion}</td>
                    <td>${destino.precioPersona}</td>
                    <td><img src="${destino.imagen}"></td>
                    <td>${destino.destinoEnOferta()}</td>
                    <td>YA RESERVADO</td>
                </tr>`
        }
    }
        }

// IR A RESERVAR DESTINO
function mostrarConfirmacionReserva(){
    let millas = sistema.usuarioLogueado.millas;
    let saldoDisponible = sistema.usuarioLogueado.saldo;
    document.querySelector("#cantSaldoDisponible").innerHTML = `Su saldo disponible es: ${saldoDisponible}`;
    document.querySelector("#cantMillasDisponibles").innerHTML = `Sus millas disponibles son: ${millas}`;
    document.querySelector("#txtCantCupos").value = "";
    document.querySelector("#slcMetodoPago").value = "#";
    document.querySelector("#pCuposYMedioDePagoInvalidos").innerHTML="";
    document.querySelector("#pAvisoReservaConfirmada").innerHTML = "";
    document.querySelector("#btnConfirmarReservaDestino").removeAttribute('disabled');


    let nombreDestino = this.getAttribute("data-destinoNombre");
    let descripciondestino = this.getAttribute("data-destinoDescripcion");
    let precioDestino = this.getAttribute("data-destinoPrecio");
    let imagenDestino = this.getAttribute("data-destinoImagen");
    let cuposDisponibles = this.getAttribute("data-cuposDisponibles");

    document.querySelector("#nombreDestinoAReservar").innerHTML = nombreDestino;
    document.querySelector("#descripcionDestino").innerHTML = descripciondestino;
    document.querySelector("#precioPorPersonaDestino").innerHTML = precioDestino;
    document.querySelector("#imagenDestino").setAttribute("src",imagenDestino);
    document.querySelector("#cantidadCuposDisponibles").innerHTML = cuposDisponibles;
    

    document.querySelector("#nombreDestinoAReservar").value = nombreDestino;
    document.querySelector("#descripcionDestino").value = descripciondestino;
    document.querySelector("#precioPorPersonaDestino").value = precioDestino;
    
    ocultarSecciones();
    cambiarDisplayClase("confirmarReserva", "block");

}

document.querySelector("#btnConfirmarReservaDestino").addEventListener("click", confirmarReservaDestino);

// EFECTUAR RESERVAR DESTINO
function confirmarReservaDestino(){
    document.querySelector("#pCuposYMedioDePagoInvalidos").innerHTML="";
    let idCliente = sistema.usuarioLogueado.id;
    let nombreDestino = document.querySelector("#nombreDestinoAReservar").value;
    let cuposReservados = Number(document.querySelector("#txtCantCupos").value);
    let precioPorPersona = Number(document.querySelector("#precioPorPersonaDestino").value);
    let montoTotal = cuposReservados * precioPorPersona;
    let formaPago = document.querySelector("#slcMetodoPago").value;
    let estadoReserva = "Pendiente";
   
    if(!isNaN(cuposReservados) && cuposReservados > 0 && formaPago !== "#"){
        reservaConcretada = sistema.reservarDestino(idCliente, nombreDestino, cuposReservados, montoTotal, formaPago, estadoReserva)
        if(reservaConcretada){
            document.querySelector("#pAvisoReservaConfirmada").innerHTML = `Su reserva se concretó con éxito`;
            boton = this.getAttribute("#btnConfirmarReservaDestino");
            console.log(boton)
            document.querySelector("#btnConfirmarReservaDestino").setAttribute('disabled', 'disabled')
            mostrarTablaDestinos();
            mostrarTablaDestinosEnOferta();
            verHistorialReservas();
            mostrarReservasAdministrador();
        }
    }else{
        document.querySelector("#pCuposYMedioDePagoInvalidos").innerHTML= "Tiene que ingresar una cantidad de cupos y un método de pago válidos."
    }
    
}

function verHistorialReservas(){
    document.querySelector("#tblMostrarHistorialReservas").innerHTML = "";
    for(let i = 0; i < sistema.reservas.length; i++){
        let reserva = sistema.reservas[i];
        let cliente = sistema.usuarioLogueado.id;
        if(reserva.estado === "Pendiente" && reserva.idCliente === cliente){
            document.querySelector("#tblMostrarHistorialReservas").innerHTML += `
            <tr>
                <td>${reserva.idReserva}</td>
                <td>${reserva.nombreDestino}</td>
                <td>${reserva.cuposReservados}</td>
                <td>${reserva.montoTotal}</td>
                <td>${reserva.estado}</td>
                <td><input type="button" value="Cancelar Reserva" class="btnCancelarReserva" data-idReserva="${reserva.idReserva}">
                </td>
            </tr>`
        }else if(reserva.idCliente === cliente) {
        document.querySelector("#tblMostrarHistorialReservas").innerHTML += `
            <tr>
                <td>${reserva.idReserva}</td>
                <td>${reserva.nombreDestino}</td>
                <td>${reserva.cuposReservados}</td>
                <td>${reserva.montoTotal}</td>
                <td>${reserva.estado}</td>
            </tr>`
    }
}
    botonesCancelarReserva = document.querySelectorAll(".btnCancelarReserva");
    for(boton of botonesCancelarReserva){
    boton.addEventListener("click", cancelarReservaPendiente);
}
    }


function cancelarReservaPendiente(){
    let idReserva = Number(this.getAttribute("data-idReserva"));
    cancelarReservaCliente = sistema.cancelarReservaCliente(idReserva);
    if(cancelarReservaCliente){
        mostrarTablaDestinos();
        mostrarTablaDestinosEnOferta();
        verHistorialReservas();
        mostrarReservasAdministrador();
        
    }else{
        console.log("hubo un error");
    }
    
}

// <!--******************* ADMINISTRADOR******************** -->

// DESTINOS // 

// AGREGAR DESTINO **************
function agregarDestino (){
    let nombreNuevoDestino = document.querySelector("#txtNombreNuevoDestino").value; 
    let descripcionNuevoDestino = document.querySelector("#txtDescripcionNuevoDestino").value; 
    let precioPorPersonaNuevoDestino = Number(document.querySelector("#txtPrecioPorPersonaNuevoDestino").value); 
    let img = document.querySelector("#imgNuevoDestino").files[0]; 
    let cuposNuevoDestino = Number(document.querySelector("#txtCuposNuevoDestino").value);
    let estadoDestino = true;
    let enOfertaNuevoDestino =  document.querySelector("#slcEnOfertaNuevoDestino").value; 
    let mensajeAgregarDestino = document.querySelector("#pMensajeAgregarDestino")
    let destinoUnico = sistema.destinoEsUnico(nombreNuevoDestino); 
     
    if(img != undefined ){
        img = img.name
    }  
    console.log(img)
    if(nombreNuevoDestino === "" || 
        descripcionNuevoDestino === "" || 
        precioPorPersonaNuevoDestino === "" ||
        cuposNuevoDestino === "" || 
        enOfertaNuevoDestino === "" || enOfertaNuevoDestino === "#" ||
        enOfertaNuevoDestino=== "" || img == undefined ||
        isNaN(cuposNuevoDestino) || cuposNuevoDestino <= 0
        || isNaN(precioPorPersonaNuevoDestino) || precioPorPersonaNuevoDestino <= 0
    ){
        mensajeAgregarDestino.innerHTML = "Debe completar todos los campos o ingresar valores válidos en cupos y precio"

    }else if(!destinoUnico){
        mensajeAgregarDestino.innerHTML = `El destino ${nombreNuevoDestino} ya existe`
    }
    else {
        let seCreoDestino = sistema.agregarDestino(nombreNuevoDestino,descripcionNuevoDestino,precioPorPersonaNuevoDestino,img,cuposNuevoDestino,estadoDestino,enOfertaNuevoDestino);
    if(seCreoDestino){
        mensajeAgregarDestino.innerHTML = "Se creó el destino";
        mostrarTablaDestinosAdministrador();
        document.querySelector("#txtNombreNuevoDestino").value = "";
        document.querySelector("#txtDescripcionNuevoDestino").value = "";
        document.querySelector("#txtPrecioPorPersonaNuevoDestino").value = "";
        document.querySelector("#imgNuevoDestino").value = "";
        document.querySelector("#txtCuposNuevoDestino").value = "";
        document.querySelector("#slcEnOfertaNuevoDestino").value = "#"; 
    }else{
        mensajeAgregarDestino.innerHTML = "No se creó el destino"
    }
    }
}

mostrarTablaDestinosAdministrador();

// MODIFICAR DESTINO **************
function mostrarTablaDestinosAdministrador () {
    document.querySelector("#tblBodyAdministrarDestinos").innerHTML = "";
    for(let i= 0; i<sistema.destinos.length; i++){
        let destino = sistema.destinos[i];
            document.querySelector("#tblBodyAdministrarDestinos").innerHTML += 
            `<tr> 
            <td>${destino.nombre}</td>
            <td><input type="number" id="txtNuevosCupos${destino.nombre}" value="${destino.cupos}"></td>          
            <td><select id="txtNuevoEstado${destino.nombre}">
                    <option value="${destino.estado}">Estado actual: ${destino.destinoEstado()}</option>
                    <option value="Activo">Activo</option>
                    <option value="Pausado">Pausado</option>
                </select>
            </td>
            <td><select id="txtNuevoEnOferta${destino.nombre}">
                    <option value="${destino.enOferta}">Oferta actual: ${destino.destinoEnOferta()}</option>
                    <option value="S">Si</option>
                    <option value="N">No</option>
                </select></td>
            <td><input type="button" value="Modificar" class="btnModificarDestino" data-nombreDestino="${destino.nombre}"></td>
            </tr>
            `
        }
    let botonesModificar = document.querySelectorAll(".btnModificarDestino");
    for(let boton of botonesModificar){
        boton.addEventListener("click",modificarDestino);
    }

}


function modificarDestino (){
    let nombre = this.getAttribute("data-nombreDestino"); 
    let nuevoCupos = document.querySelector(`#txtNuevosCupos${nombre}`).value;  
    let nuevoEstado = document.querySelector(`#txtNuevoEstado${nombre}`).value;
    let nuevoEnOferta = document.querySelector(`#txtNuevoEnOferta${nombre}`).value;
    let mensajeModificarDestino = document.querySelector("#pMensajeModificarDestino"); 
    mensajeModificarDestino.innerHTML = ""; 

    if(nuevoEstado == "true" || nuevoEstado == "Activo"){
        nuevoEstado = true
    }else{
        nuevoEstado = false; 
    }
    if(nuevoEnOferta == "true" || nuevoEnOferta == "S"){
        nuevoEnOferta = true; 
    }else{
        nuevoEnOferta = false; 
    }
    let resultado = sistema.modificarDestino(nombre,nuevoCupos,nuevoEstado,nuevoEnOferta);
     
    if (resultado) { 
        mensajeModificarDestino.innerHTML = "Se modificó el destino correctamente";
        mostrarTablaDestinosAdministrador();
        mostrarTablaDestinos();
    }
    
}

// GESTIONAR RESERVAS **************

mostrarReservasAdministrador ();
function mostrarReservasAdministrador (){
    document.querySelector("#tblBodyGestionarReservasPendientes").innerHTML = "";
    document.querySelector("#tblBodyGestionarReservasAprobadas").innerHTML = "";
    document.querySelector("#tblBodyGestionarReservasCanceladas").innerHTML = "";
    document.querySelector("#pMensajeGestionReserva").innerHTML = ""; 
    for(let i=0; i< sistema.reservas.length; i++){
        let reserva = sistema.reservas[i];
        if(reserva.estado == "Pendiente"){
            document.querySelector("#tblBodyGestionarReservasPendientes").innerHTML +=
        `<tr><td>${reserva.idReserva}</td>
            <td>${reserva.idCliente}</td>
            <td>${reserva.nombreDestino}</td>
            <td>${reserva.cuposReservados}</td>
            <td>${reserva.montoTotal}</td>
            <td>${reserva.formaPago}</td>
            <td>${reserva.estado}</td>
            <td><input type="button" value="Procesar reserva" class="btnGestionarReserva" data-reserva-idReserva="${reserva.idReserva}"></td>
        </tr>`
        }else if (reserva.estado == "Aprobada"){
            document.querySelector("#tblBodyGestionarReservasAprobadas").innerHTML +=
        `<tr>
            <td>${reserva.idReserva}</td>
            <td>${reserva.idCliente}</td>
            <td>${reserva.nombreDestino}</td>
            <td>${reserva.cuposReservados}</td>
            <td>${reserva.montoTotal}</td>
            <td>${reserva.formaPago}</td>
            <td>${reserva.estado}</td>
        </tr>`
        }else if(reserva.estado == "Cancelada"){
            document.querySelector("#tblBodyGestionarReservasCanceladas").innerHTML +=
        `<tr>
            <td>${reserva.idReserva}</td>
            <td>${reserva.idCliente}</td>
            <td>${reserva.nombreDestino}</td>
            <td>${reserva.cuposReservados}</td>
            <td>${reserva.montoTotal}</td>
            <td>${reserva.formaPago}</td>
            <td>${reserva.estado}</td>
        </tr>`
        }
        
    }

    let botonesModificar = document.querySelectorAll(".btnGestionarReserva");
    for(let boton of botonesModificar){
        boton.addEventListener("click",gestionarReserva);
    } 
}

function gestionarReserva() {
    let idReserva = this.getAttribute("data-reserva-idReserva");
    let reservaSeleccionada = sistema.obtenerReserva(idReserva);

    if (reservaSeleccionada != null) {
        let idCliente = reservaSeleccionada.idCliente;
        let clienteConReserva = sistema.obtenerCliente(idCliente);

        if (clienteConReserva != null) {
            let destino = reservaSeleccionada.nombreDestino;
            let destinoSeleccionado = sistema.obtenerDestino(destino);
            
            if (destinoSeleccionado != null) {
                let montoTotal = reservaSeleccionada.montoTotal;
                let formaDePago = reservaSeleccionada.formaPago;
                let cuposReservados = reservaSeleccionada.cuposReservados;
                let saldoDelCliente = clienteConReserva.saldo;
                let millasDelCliente = clienteConReserva.millas;
                let cuposDisponiblesDestino = destinoSeleccionado.cupos;

                sistema.procesarReserva(cuposDisponiblesDestino, cuposReservados,saldoDelCliente, millasDelCliente, montoTotal,formaDePago,destinoSeleccionado,reservaSeleccionada,idCliente);
                mostrarReservasAdministrador ();
                mostrarTablaDestinosAdministrador();
                mostrarInformeDeGanancias();       
               /* console.log("Pago en millas",pagoEnMillas,
                "Pago en saldo:", pagoEnSaldo, 
                "Forma de pago", formaDePago, 
                estadoDeReserva, 
                "Saldo del cliente",saldoDelCliente,
                "Millas del cliente",millasDelCliente,
                "Cupos disponibles:",cuposDisponiblesDestino,
                 "Cupos reservados:", cuposReservados); */  
                
            }
        }
    }
}
 
/// INFORME DE GANANCIAS ///
mostrarInformeDeGanancias(); 
function mostrarInformeDeGanancias() {
    document.querySelector("#tblInformeDeGanancias").innerHTML = "";
    let destinosYaMostrados = []; 

    for(let i = 0; i < sistema.reservas.length; i++) {
        let reserva = sistema.reservas[i];
        
        if (reserva.estado === "Aprobada") {
            
            let idReserva = reserva.idReserva; 
            let gananciasEnSaldo = sistema.obtenerGananciaPorReserva(idReserva);
            let nombreDestino = reserva.nombreDestino;

            let destinoExistente = false;

            for (let j = 0; j < destinosYaMostrados.length; j++) {
                if (destinosYaMostrados[j].nombreDestino === nombreDestino) {     
                    destinosYaMostrados[j].cuposReservados += reserva.cuposReservados;
                    destinosYaMostrados[j].montoTotal += reserva.montoTotal;
                    destinosYaMostrados[j].gananciasEnSaldo += gananciasEnSaldo;
                    destinoExistente = true;
                }
            }
            
            if (!destinoExistente) {
                let nuevaReserva = {};
                nuevaReserva.idReserva = reserva.idReserva;
                nuevaReserva.nombreDestino = reserva.nombreDestino;
                nuevaReserva.cuposReservados = reserva.cuposReservados;
                nuevaReserva.montoTotal = reserva.montoTotal;
                nuevaReserva.formaPago = reserva.formaPago;
                nuevaReserva.gananciasEnSaldo = gananciasEnSaldo;
            
                destinosYaMostrados.push(nuevaReserva);
            }   
        }
    }

    for (let i = 0; i < destinosYaMostrados.length; i++) {
        let destino = destinosYaMostrados[i];
        document.querySelector("#tblInformeDeGanancias").innerHTML += `
            <tr>
                <td>${destino.nombreDestino}</td>
                <td>${destino.cuposReservados}</td>
                <td>${destino.montoTotal}</td>
                <td>${destino.formaPago}</td>
                <td>${destino.gananciasEnSaldo}</td>
            </tr>`;
    }

    let totalGanancias = sistema.obtenerGananciasTotales();
    document.querySelector("#tbGananciasTotales").innerHTML = `
        <tr>
            <td>Total de Ganancias</td>
            <td>${totalGanancias}</td>
        </tr>`;

}





