//* challenge/

export type Challenge = {
  id: string;
  estado: string;
  fecha_acordada: string;
  ganador_id: string | null;
  notas: string;
  retado_id: string;
  retador_id: string;
  retador_derrotas: number;
  retador_victorias: number;
  retador_username: string;
  retador_marca: string;
  retador_modelo: string;
  tipo_carrera: string;
  ubicacion_acordada: string;
  vehiculo_retado_id: string;
  vehiculo_retador_id: string;
  reporte_retador_id:string;
  reporte_retado_id:string
};

export type ChallengeForm ={
estado:string,
notas:string,
retador_id:string,
retado_id:string,
tipo_carrera:string,
ubicacion_acordada:string,
fecha_acordada:string,
vehiculo_retador_id:string,
vehiculo_retado_id:string,
}
export interface challengaAll {
   challenge: {
    id: string;
    tipo_carrera: string;
    estado: ChallengeStatus;
    ubicacion_acordada: string;
    notas: string | null;
    reporte_retador_id: string | null;
    reporte_retado_id: string | null;
    fecha_acordada:string
  };
    challengeReport:{
    retador_ganador_id:string,
    retador_report_description:string,
     retado_ganador_id:string,
    retado_report_description:string,
  }

  retador: {
    id: string;
    username: string;
    foto_perfil: string;
    victorias: number;
    derrotas: number;
    rango: string;

    vehiculo: {
      id: string;
      marca: string;
      modelo: string;
      tipo_vehiculo: string;
      foto: string;
    };
  };

  retado: {
    id: string;
    username: string;
    foto_perfil: string;
    victorias: number;
    derrotas: number;
    rango: string;

    vehiculo: {
      id: string;
      marca: string;
      modelo: string;
      tipo_vehiculo: string;
      foto: string;
    };
  };

}

export type ChallengeStatus =
  | "pendiente"         
  | "aceptado"          
  | "en_curso"     
  | "resultado_pendiente"  
  | "completado"
  | "disputa" ;