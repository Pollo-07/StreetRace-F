import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import UseAppSnackbar from "./useAppSnackbar"
import { Api } from "../../../services/api"
import type { User } from "../../../types/userTypes"
import type { DiscoverUserWithVehicle } from "../../../types/vehicleTypes"



export const useUser=()=>{
  const {    showSuccess,showError  } = UseAppSnackbar()
  const queryClient = useQueryClient()

    const {data,error,isLoading} = useQuery({
         queryKey: ["user"],
    queryFn: async () => {
        const user = await Api.me()
      return user.data.result as User
    },
    })

    const {data:discoverPilot,error:errorPilots}=useQuery({
      queryKey:["discoverPilot"],
      queryFn:async()=>{
        const pilots = await Api.discoverPilot()

        return pilots.data.result as DiscoverUserWithVehicle[]
      },
    })

     const {data:respectPilotData,error:errorRespectPilot}=useQuery({
      queryKey:["respectPilot"],
      queryFn:async()=>{
        const pilots = await Api.getRespectPilot()
        return pilots.data.result as DiscoverUserWithVehicle[]
      },
    })



   const updateUser = useMutation({
  mutationFn: async ( data:any ) => {

    try {
      const res = await Api.updateMe( data);
    return res.data;
      
    } catch (err:any) {

      throw new Error(err.response?.data?.error || "Error desconocido");
      
    }
    
  },
  onSuccess: () => {
    showSuccess("Usuario actualizado con éxito");
    queryClient.invalidateQueries({ queryKey: ["user"] })

  },
   onError: (err) => {
      showError(`Error al actualizar el usuario ${err?.message || "Inténtalo de nuevo"}`,);
  },
    });


 const respectPilot = useMutation({
  mutationFn: async ( respectUserId: string ) => {

    try {
       const res = await Api.respectPilot( respectUserId);
    return res.data.result;
      
    } catch (error:any) {
       const message =
                error?.response?.data?.error || "Error desconocido";

              throw new Error(message); 
      
    }
   
  },
  onSuccess: () => {
    showSuccess("has ofrendado repect con éxito");
    queryClient.invalidateQueries({ queryKey: ["respectPilot"] })

  },
   onError: (err) => {
    
      showError(`Error al respectUserId el usuario ${err?.message || "Inténtalo de nuevo"}`,);
  },
    });







    return{
        user:data,
        userError:error,
        isLoadingUser:isLoading,
        discoverPilot:discoverPilot,
        errorPilots:errorPilots,
        respectPilotData:respectPilotData,
        errorRespectPilot:errorRespectPilot,
        updateUser:updateUser.mutate,
        respectPilot:respectPilot.mutate,

    }

}