class Sistema{
    constructor(){
        this.clientes = [];
        this.administradores = []; 
        this.reservas = []; 
        this.destinos = []; 
        this.precargarClientes(); 
        this.precargarDestinos(); 
        this.precargarAdmins();
        this.precargarReserva();
        this.usuarioLogueado = null;
        this.idUltimaReserva = 6;
        this.idUltimoCliente = 6;

    }
//METODOS
    precargarReserva(){
        let reservaUno = new Reserva(1,3,"Salta",2,19000,"Saldo","Pendiente");
        let reservaDos = new Reserva(2,1,"Colonia",1,3000,"Saldo","Pendiente");
        let reservaTres = new Reserva(3,2,"Búzios",3,45000,"Saldo","Cancelada");
        let reservaCuatro = new Reserva(4,1,"Jujuy",2,20000,"Saldo","Pendiente");
        let reservaCinco = new Reserva(5,5,"Búzios",2,30000,"Millas","Aprobada");

        this.reservas.push(reservaUno,reservaDos,reservaTres,reservaCuatro,reservaCinco); 
    }

    precargarClientes(){
        let clienteUno = new Cliente(1,"Jessica","Fripp","jfripp","jessiF1","4291-0711-3331-3969","256",600000,2000)
        let clienteDos = new Cliente(2,"Lucia","Fuentes","lfuentes","Lul415","4306-0711-5555-3970","311",43000,500)
        let clienteTres = new Cliente(3,"Marcos","Aguirre","maguirre","M4guirre","4304-0411-5685-3560","369",100000,500)
        let clienteCuatro = new Cliente(4,"Belen","Clark","bclark","tierraDeOsos1","3401-0711-2324-7902","098",800000,500)
        let clienteCinco = new Cliente(5,"Juana","Lujambio","jlujambio","JLuruguay50","7992-0711-5555-3970","351",35000,500)
        
        this.clientes.push(clienteUno,clienteDos,clienteTres,clienteCuatro,clienteCinco);
    }

    precargarAdmins(){
        let adminUno = new Administrador("Lucia","Lucia123"); 
        let adminDos = new Administrador("Jessica", "Jess123"); 
        let adminTres = new Administrador("Matias","M4at1as");
        let adminCuatro = new Administrador("Ana","Ani99");
        let adminCinco = new Administrador("Pedro","pedroM90");

        this.administradores.push(adminUno,adminDos,adminTres,adminCuatro,adminCinco)
    }

    precargarDestinos(){
        let destinoUno = new Destino("Salta", "Salta es una bella capital provincial del noroeste montañoso de Argentina.", 9500, "./img/img-salta.jpg", 10, true, true);
        let destinoDos = new Destino("Jujuy", "Jujuy, provincia del remoto noroeste de Argentina, se caracteriza por sus espectaculares formaciones rocosas y colinas de la Quebrada de Huamahuaca.", 10000, "./img/img-jujuy.jpg", 15, true, false);
        let destinoTres = new Destino("Chile", "Chile es un país largo y angosto que se extiende por el borde occidental de Sudamérica, con más de 6,000 km de costa en el océano Pacífico.", 13000, "./img/img-chile.png" , 15, true, false);
        let destinoCuatro = new Destino("Guatemala", "Guatemala, un país de América Central al sur de México, tiene volcanes, bosques tropicales y antiguos sitios mayas.", 17000, "./img/img-guatemala.png" , 8, true, false);
        let destinoCinco = new Destino("Búzios", "Búzios es un centro turístico brasileño ubicado en una península en el océano", 15000, "./img/img-buzios.jpg" , 12, true, false);
        let destinoSeis = new Destino("Colonia", "Colonia del Sacramento Es conocida por su Barrio Histórico con calles de adoquines rodeadas de edificios que datan de la época en que era un asentamiento portugués. ", 3000, "./img/img-colonia.jpg" , 5, true, true);
        let destinoSiete = new Destino("Madrid", "Capital de España, Madrid es una ciudad llena de arte, cultura y tradición.", 35000, "./img/img-madrid.jpg", 15, true, false);
        let destinoOcho = new Destino("París", "París, la capital de Francia, es una importante ciudad europea y un centro mundial del arte, la moda, la gastronomía y la cultura.", 40000, "./img/img-paris.jpg", 15, true, false);
        let destinoNueve = new Destino("Atenas", "Atenas es la capital de Grecia. En la ciudad, aún predominan los sitios geográficos del siglo V a. C., incluida la Acrópolis, una ciudadela sobre un monte con antiguos edificios, como el templo del Partenón con sus columnas", 30000,"./img/img-atenas.jpg", 15, true, true);
        let destinoDiez = new Destino("Nueva York", "Conocida como la ciudad que nunca duerme, Nueva York es un vibrante destino lleno de rascacielos icónicos, museos de clase mundial y una mezcla cultural única. ", 28499, "./img/img-ny.jpg", 15, true, true);
        
        this.destinos.push(destinoUno, destinoDos, destinoTres, destinoCuatro, destinoCinco, destinoSeis, destinoSiete, destinoOcho, destinoNueve, destinoDiez);
    }

    // LOGIN DE USUARIOS.  
    login(nombreUsuario, contrasenia, tipoUsuario) {
        let usuario = null;
        let i = 0;
        let listaUsuarios = null;

        if (tipoUsuario === "C") {
            listaUsuarios = this.clientes;
        } else if(tipoUsuario === "A") {
            listaUsuarios = this.administradores;
        }
        if(listaUsuarios !== null){
            while (i < listaUsuarios.length && usuario == null) {
                let usuarioActual = listaUsuarios[i];
                
                if (usuarioActual.nombreUsuario === nombreUsuario && usuarioActual.contrasenia === contrasenia) {
                    usuario = usuarioActual;
                    this.usuarioLogueado = usuarioActual;
                    console.log("Usuario logueado:", usuario);
                }
                i++;
            }

        }
       
        return usuario; 
    }

    // SE CIERRA LA SESIÓN QUITANDO EL USUARIO LOGUEADO.
    cerrarSesion(){
        this.usuarioLogueado = null; 
    } 
      
    // MÉTODO PARA REGISTRAR UN NUEVO CLIENTE.
    registrarCliente(nombreCliente,apellidoCliente,nombreUsuarioCliente,contrasenia,numTarjeta,cvc,saldo,millas){
        let seCreoElCliente = false;
        let clienteEsUnico = this.clienteEsUnico(nombreUsuarioCliente)
        if(clienteEsUnico){
            let cliente = new Cliente(this.idUltimoCliente,nombreCliente,apellidoCliente,nombreUsuarioCliente,contrasenia,numTarjeta,cvc,saldo,millas);
            this.clientes.push(cliente);
            this.idUltimoCliente++;
            seCreoElCliente = true; 
        }
        return seCreoElCliente; 
    } 
    
    // VALIDACIÓN PARA VER SI UN NOMBRE DE USUARIO ES ÚNICO PARA PODER REGISTRARLO.
    clienteEsUnico(nombreUsuarioCliente){
        let unico = true;
        let i = 0;
        while(i < this.clientes.length && unico){
            let cliente = this.clientes[i];
            if(cliente.nombreUsuario === nombreUsuarioCliente){
                unico = false;
            }
            i++;
        }
        return unico;
    }


//   <!--******************* CLIENTE******************** -->
    
    // VALIDO RESERVA CLIENTE EXISTENTE EN ESTADO PENDIENTE   
    validarReservaExistente(nombreDestino){
        let clienteYaReservoDestino = false;
        let cliente = this.usuarioLogueado.id
        let i = 0;
        while(i < this.reservas.length && !clienteYaReservoDestino){
            let reserva = this.reservas[i]
            if(reserva.idCliente === cliente && reserva.nombreDestino === nombreDestino && reserva.estado === "Pendiente"){
                clienteYaReservoDestino = true;
            }
            i++
        }
        return clienteYaReservoDestino
    }
    
    // CLIENTE RESERVA UN DESTINO 
    reservarDestino(idCliente,nombreDestino,cuposReservados,montoTotal,formaPago,estado){
        let reservaConcretada = false;
        
        if(!reservaConcretada){
            let reserva =  new Reserva(this.idUltimaReserva,idCliente,nombreDestino,cuposReservados,montoTotal,formaPago,estado);
            this.reservas.push(reserva);
            this.idUltimaReserva++;
            reservaConcretada = true;
        }
        return reservaConcretada;
        
    }
    
    // CLIENTE CANCELA RESERVA PENDIENTE DE SU HISTORIAL
    cancelarReservaCliente(idReserva){
        let reservaCancelada = false;
        let i = 0;
        while(i < this.reservas.length && !reservaCancelada){
            let reserva = this.reservas[i];
            if(reserva.idReserva === idReserva){
                reserva.estado = "Cancelada"
                reservaCancelada = true;
            }
            i++
        }
        return reservaCancelada;  
    }

    //   <!--******************* ADMINISTRADOR******************** -->

    // AGREGAR DESTINOS.
    agregarDestino(nombre,descripcion,precioPersona,nombreImg,cupos,estado,enOferta){
        let seCreoDestino = false; 
        if(!seCreoDestino){
            let imgen = "./img/" + nombreImg;
            let destino = new Destino(nombre,descripcion,precioPersona,imgen,cupos,estado,enOferta);
            this.destinos.push(destino);
            seCreoDestino = true; 
        }
        return seCreoDestino;
    }
    
    // MODIFICAR DESTINOS.

    modificarDestino(nombre,nuevoCupos,nuevoEstado,nuevoEnOferta){
        let destino = this.obtenerDestino(nombre);
        if(destino != null){
            destino.cupos = nuevoCupos;
            destino.estado = nuevoEstado; 
            destino.enOferta = nuevoEnOferta; 
            return true; 
        }else{
            console.log(`No se encontró el destino`) 
        }
    }

    // OBTENER DESTINO POR NOMBRE.
    obtenerDestino(nombre){
        let destino = null; 
        let i=0; 
        while(i<this.destinos.length && destino == null){
            if(this.destinos[i].nombre === nombre){
                destino=this.destinos[i];
            }
        i++;
        }
        return destino; 
    }

    // VALIDAR SI EL DESTINO ES UNICO PARA NO INGRESAR OTRO CON MISMO NOMBRE.
    destinoEsUnico(nombreNuevoDestino){
        let unico = true;
        let i = 0;
        while(i < this.destinos.length && unico){
            let destino = this.destinos[i];
            if(destino.nombre === nombreNuevoDestino){
                unico = false;
            }
            i++;
        }
        return unico;
    }

    // GESTION DE RESERVAS.

    // OBTENGO UNA RESERVA POR ID.
    obtenerReserva(idReserva){
        let reserva = null; 
        let i=0; 
        while(i<this.reservas.length && reserva == null){
            if(this.reservas[i].idReserva == idReserva ){
                reserva = this.reservas[i]; 
            }
        i++;
        }
        return reserva; 
    }

    // OBTENGO CLIENTE.
    obtenerCliente(idCliente){
        let obtengoCliente = null; 
        let i=0; 
        while(i<this.clientes.length && obtengoCliente == null){
            if(this.clientes[i].id == idCliente ){
                obtengoCliente = this.clientes[i]; 
            }
        i++;
        }
        return obtengoCliente; 
    }

    // VERIFICO CUPOS DISPONIBLES CONTRA CUPOS RESERVADOS.
    verificarCuposDisponibles(cuposDisponiblesDestino,cuposReservados){
        let cuposUsados = 0; 

        if(cuposDisponiblesDestino >= cuposReservados){
            cuposUsados = cuposDisponiblesDestino - cuposReservados;
            return cuposUsados;  
        }else{
            return cuposUsados = null; 
        }
    }

    // PROCESA PAGO 
    procesarPago(saldoDelCliente, millasDelCliente, montoTotal, formaDePago, cliente) {
        if (formaDePago === "Saldo" && saldoDelCliente >= montoTotal) {
            let saldoRestante = saldoDelCliente - montoTotal;
            cliente.saldo = saldoRestante;
            cliente.millas += montoTotal/100;
            console.log("Pagó con saldo, saldo restante:", saldoRestante);
            return true;
        }
    
        if (formaDePago === "Millas" && millasDelCliente >= montoTotal) {
            let millasRestantes = millasDelCliente - montoTotal;
            cliente.millas = millasRestantes; 
            console.log("Pagó con millas, millas restantes:", millasRestantes);
            return true; 
        }
    
        if (formaDePago === "Millas" && millasDelCliente < montoTotal) {
            let diferenciaMillas = montoTotal - millasDelCliente;
            let saldoRestante = saldoDelCliente - diferenciaMillas;
    
            if (saldoRestante >= 0) {
                cliente.saldo = saldoRestante; 
                cliente.millas = 0; 
                console.log("Pagó con millas y saldo. Saldo restante:", saldoRestante);
                return true; 
            } else {
                console.log("No tiene saldo suficiente.");
                return false; 
            }
        }
    
        console.log("Saldo/Millas insuficientes.");
        return false; 
    }
    
    // PROCESA LA RESERVA COMPLETA.
    procesarReserva(cuposDisponiblesDestino, cuposReservados,saldoDelCliente, millasDelCliente, montoTotal, formaDePago,destinoSeleccionado, reservaSeleccionada, idCliente){ 
        let cliente = this.obtenerCliente(idCliente);
        let cuposUsados = this.verificarCuposDisponibles(cuposDisponiblesDestino, cuposReservados);
        let pagoExitoso = this.procesarPago(saldoDelCliente, millasDelCliente, montoTotal, formaDePago, cliente);
    
        if (cuposUsados != null && pagoExitoso) {   
            destinoSeleccionado.cupos -= cuposReservados;
             if(destinoSeleccionado.cupos <= 0){
                destinoSeleccionado.estado = false; 
            }
            reservaSeleccionada.estado = "Aprobada";
            console.log("Reserva aprobada. Información actualizada correctamente.");
            return true; 
        } else {
            
            reservaSeleccionada.estado = "Cancelada";
            console.log("Reserva cancelada. No se pudo completar la operación.");
            return false; 
        }
    }  

    // INFORME DE GANANCIAS //************** */
    
    // OBTENGO LAS GANANCIAS TOTALES EN SALDO DE TODAS LAS RESERVAS APROBADAS.
    obtenerGananciasTotales() {
        let gananciasTotales = 0; 
        for (let i = 0; i < this.reservas.length; i++) {
            let reserva = this.reservas[i];
            if (reserva.estado === "Aprobada") {
                gananciasTotales += reserva.montoTotal;
            }
        }
        return gananciasTotales; 
    }

    // OBTENGO LAS GANANCIAS POR DESTINO ESPECIFICAMENTE
    obtenerGananciaPorReserva(idReserva) {
        let totalEnSaldo = 0;
        let totalEnMillas = 0;
        
        for (let i = 0; i < this.reservas.length; i++) {
            let reserva = this.reservas[i]; 
            let cliente = this.obtenerCliente(reserva.idCliente);
            if (reserva.idReserva == idReserva && reserva.estado === "Aprobada"){
                if (reserva.formaPago === "Saldo"){
                    totalEnSaldo += reserva.montoTotal;
                }
                if (reserva.formaPago === "Millas") {
                    if (cliente.millas >= reserva.montoTotal) {
                        totalEnMillas += reserva.montoTotal;
                    } 
                }
            }
        }
        return totalEnSaldo;
    }
}       
