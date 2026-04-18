import type z from "zod";
import type { LoginSchema, RegisterSchema } from "../utils/zodSchema";


//* User/
 export type LoginType = z.infer<typeof LoginSchema>
 export type RegisterType = z.infer<typeof RegisterSchema>

 export type ROLES = "admin" |"user"

export type UserActionTypes={
     token: string  | null;
     user: User | null;
     loading:boolean | null
}

export type UserForm ={
  username: string;
  email?:string
  foto_perfil:File | null
  zona_localidad: string;
  zona_ciudad: string;
  zona_pais: string;
  zona_estado: string;
}
export type AuthData = {
  token: string;
  userId: string;
  role:string
};
export type UserAction =
  | { type: "SET_TOKEN"; payload: string | null }
  | { type: "SET_USER"; payload:User| null }
  | { type: "LOGOUT"; payload: string | null }
  | { type: "SET_LOADING"; payload: boolean | null }

export type User = {
  id: string
  username: string
  email: string
 foto_perfil: string
  zona_localidad: string
  zona_ciudad: string
  zona_estado: string
  zona_pais: string
  rango: string
  categoria_id: string
  victorias: number
  derrotas: number
  retos_consecutivos: number
  estado: string
  CompetitionCategory?:string
}

