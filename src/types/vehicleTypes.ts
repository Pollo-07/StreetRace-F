//* Vehiculo/



export type Vehiculo = {
activo:boolean,
año:number,
color:string,
foto:string,
modificaciones:string,
placa:string,
tipo_vehiculo:string
id:string
marca:string
modelo:string
}


export type VehicleForm ={
    user_id:string | undefined,
  tipo_vehiculo: string;
  marca: string;
  modelo: string;
  anio: string;
  color: string;
  placa: string;
  foto: File | null
}

export type DiscoverUserWithVehicle = {
  id_vehiculo:string
  id:string,
  username: string;
  foto_perfil: string;
  rango: string;
  victorias: number;
  derrotas: number;

  tipo_vehiculo:  string; 
  marca: string;
  modelo: string;
  foto: string; 
};