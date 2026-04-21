import axios from "axios";

import { getAuthToken } from "./getAuthToken";
import type { LoginType, RegisterType } from "../types/userTypes";
import type { VehicleForm } from "../types/vehicleTypes";
import type { ChallengeForm } from "../types/challangeTypes";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: { "Content-Type": "application/json" },
  timeout: 10000,
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
      const token = getAuthToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// api.interceptors.response.use(
//   res=>res,
//   async error=>{
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {

//       try {
//         const res = await Auth.refreshToken();
//         console.log("error interceptor",res.data)
//         const newToken = res.data.accessToken
//         api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`
//       } catch (error) {
//         console.log("error",error)
//       }
//     }

//     return Promise.reject(error)
//   }
// )

export const Api = {
  // AUTH //
  login: (data: LoginType) => api.post("auth/login", data),
  register: (data: RegisterType) => api.post("auth/register", data),
  logout: () => api.post("auth/logout"),
  refreshToken: () => api.post("auth/refreshTokens"),

  // USER //
  me: () => api.get("user/me",),
  updateMe: ( data: any) =>api.patch("user/updateMe", data),
  discoverPilot: () =>api.get("user/discoverPilot"),
  getRespectPilot:()=>api.get("user/getRespectPilot"),
  respectPilot:(respectUserId:string)=>api.post("user/respectPilot",{respectUserId}),



  // VEHICLES//
  createVehicle: ( data: any) =>api.post("vehicles/createVehicle", data),
  allVehicle: () =>  api.get(`vehicles/allVehicles`,),
  activeVehicle:(id:string)=> api.patch(`vehicles/activeVehicle/${id}`),
   deleteVehicle:(id:string)=> api.delete(`vehicles/deleteVehicle/${id}`,),


  // CHALLENGES //
  createChallenge: ( data:ChallengeForm ) =>api.post("challenges/createChallenge", data),
  allChallenges: () =>api.get(`challenges/challengeAll`),
  acceptChallenge: (id:string,id_retado:string) =>api.patch(`challenges/acceptChallenge`,{id,id_retado}),
  rejectChallenge: (id:string,id_retado:string) =>api.patch(`challenges/rejectChallenge`,{id,id_retado}),
  cancelChallenge: (id:string) =>api.patch(`challenges/cancelChallenge`,{id}),

  completeChallenge: (id:string,id_ganador:string,notas:string) => api.patch(`challenges/reporteChallenge`,{id,id_ganador,notas}),
 
  startChallenge: (id:string) =>api.patch(`challenges/startChallenge`,{id}),

  


  //ADMIN

    UserAll: () => api.get("user/UserAll",),
 
  UserAllSeacrch: ( search: string, page: number ) => 
  api.get("user/UserAllSearch", {
    params: {
      page: page,
      limit: 10,
      search:search
    }
  }),
  deleteUser: (id:string ) =>api.delete(`user/deleteUser/${id}`,),
  ChallengeDisputed:()=>api.get("challenges/ChallengeDisputed"),
  resolveChallengeDisputed:(id:string,ganador_id:string)=>api.post("challenges/resolveChallengeDisputed",{id,ganador_id}),
  updateUser: ( data: any,id:string) =>api.patch("user/updateUser", {data,id}),

  challengeComplete:(id:string,ganador_id:string)=>api.patch("challenges/completeChallenge",{id,ganador_id})








};
