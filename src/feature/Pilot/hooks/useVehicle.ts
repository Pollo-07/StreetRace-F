import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import UseAppSnackbar from "./useAppSnackbar";
import { Api } from "../../../services/api";
import type { VehicleForm, VehiculoResponse } from "../../../types/vehicleTypes";
const  UseVehicle = () => {

  

 const {    showSuccess,showError  } = UseAppSnackbar()

const queryClient = useQueryClient();


 const {data,isLoading,error} = useQuery({
    queryKey: ["vehicles"],
    queryFn: async() => {
        try {
    const response = await Api.allVehicle();
    return response.data as VehiculoResponse;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Error desconocido");
  }
    }
 })

 const CreateVehicle = useMutation({
        mutationFn: async(data:VehicleForm) => { 
          try {
             const updateVhicle = await Api.createVehicle(data)
        
            return updateVhicle.data
            
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
        const result = await Api.deleteVehicle(id)
        return result
      },

      onSuccess(){
        
          showSuccess("se ha eliminado el vehiculo")
           queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      },

      onError() {
        showError("no se ha podido elimiar el vehiculo")
        
      },
    })

    
  return { 
    vehicles:data?.result,
    isLoadingVehicles:isLoading,
    errorVehicles:error,
    CreateVehicle : CreateVehicle.mutate,
    activeVehicle:activeVehicle.mutate,
    deleteVehicle:deleteVehicle.mutate

}
}

export default UseVehicle
