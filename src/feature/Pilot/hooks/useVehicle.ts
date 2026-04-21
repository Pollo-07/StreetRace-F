import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import UseAppSnackbar from "./useAppSnackbar";
import { Api } from "../../../services/api";
import type { Vehiculo,  } from "../../../types/vehicleTypes";
const  UseVehicle = () => {

  

 const {    showSuccess,showError  } = UseAppSnackbar()

const queryClient = useQueryClient();


 const {data,isLoading,error} = useQuery({
    queryKey: ["vehicles"],
    queryFn: async() => {
        try {
    const response = await Api.allVehicle();
    console.log("INVALIDANDO...");
    console.log(response);
    return response.data.result as Vehiculo[];
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Error desconocido");
  }
    }
 })

 const CreateVehicle = useMutation({
        mutationFn: async(data:any) => { 
          try {
             const result = await Api.createVehicle(data)
        
            return result.data
            
          } catch (error:any) {

              const message =
                error?.response?.data?.error || "Error desconocido";

              throw new Error(message); 
          
          }
          },

        onSuccess: () => {
          showSuccess("Vehículo creado con éxito");
             queryClient.invalidateQueries({ queryKey: ["vehicles"] });

        },
        onError: (error: any) => {
          showError(` ${error.message}`);
        },

    })

    const activeVehicle=useMutation({
      mutationFn:async(id:string)=>{
          const active = await Api.activeVehicle(id)
        
            return active.data

      },


      onSuccess(){
        showSuccess("se ha activado el vehiculo")
        queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      },

       onError(){
        showError("error al activar el vehiculo")
      }
      
      
    })


    const deleteVehicle = useMutation({
      mutationFn:async(id:string)=>{
        try {
           const result = await Api.deleteVehicle(id)
           console.log("delete vehicle",result.data)
        return result.data.message
        } catch (error:any) {
          const message =
                error?.response?.data?.error || "Error desconocido";
              throw new Error(message); 
        }
      },

      onSuccess(){
         queryClient.invalidateQueries({ queryKey: ["vehicles"] });
         queryClient.setQueryData(["vehicles"], [])
          showSuccess("se ha eliminado el vehiculo")  
          
      },
      onError(error) {
        showError(`no se ha podido elimiar el vehiculo ${error?.message}`)
      },
    })

    
  return { 
    vehicles:data,
    isLoadingVehicles:isLoading,
    errorVehicles:error,
    CreateVehicle : CreateVehicle.mutate,
    activeVehicle:activeVehicle.mutate,
    deleteVehicle:deleteVehicle.mutate

}
}

export default UseVehicle
