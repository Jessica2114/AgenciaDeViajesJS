class Destino {
    constructor(nombre,descripcion,precioPersona,imagen,cupos,estado,enOferta){
        this.nombre = nombre; 
        this.descripcion = descripcion; 
        this.precioPersona = precioPersona; 
        this.imagen = imagen; 
        this.cupos = cupos; 
        this.estado = estado; 
        this.enOferta = enOferta; 
    }

    destinoEnOferta(){
        if(this.enOferta){
            return "Si"
        }
        return "No"
    }

    destinoEstado(){
        if(this.estado){
            return "Activo"
        }
        return "Pausado"
    }

}
