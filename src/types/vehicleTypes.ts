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

export type VehiculoResponse={
  ok:boolean,
  result:Vehiculo[]
}
export type VehicleForm ={
    user_id:string | undefined,
  tipo_vehiculo: string;
  marca: string;
  modelo: string;
  año: string;
  color: string;
  placa: string;
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