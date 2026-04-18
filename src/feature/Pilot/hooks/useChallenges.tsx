import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import UseAppSnackbar from "./useAppSnackbar";
import type { challengaAll } from "../../../types/challangeTypes";
import { Api } from "../../../services/api";

const UseChallenges = () => {

  const queryClient = useQueryClient()
  const {    showSuccess,showError  } = UseAppSnackbar()
 

    const { data: challenges ,isLoading,error} = useQuery({
        queryKey: ["challenges"],
        queryFn: async() => {
            try {
        const response = await Api.allChallenges();
        return response.data.result as challengaAll[];
      } catch (err: any) {
        throw new Error(err.response?.data?.error || "Error desconocido");
        }}
    
    })


    const createChallenge = useMutation({
        mutationFn: async(data:any) => { 
          try {
            const createChallenge = await Api.createChallenge(data) 
            return createChallenge.data
            
          } catch (error:any) {
              const message =
                error?.response?.data?.error || "Error desconocido";

              throw new Error(message); 
          
            
          }
            
          },
            

        onSuccess: () => {
            showSuccess("Desafío creado con éxito");
          queryClient.invalidateQueries({ queryKey: ["challenges"] });
        },
        onError: (error) => {
          showError(`Error al crear el vehículo ${error.message}`);  
        },
        
        })

    const acceptChallenge = useMutation({

      mutationFn:async({id,id_retado}:{id:string,id_retado:string})=>{
        const result = await Api.acceptChallenge(id,id_retado)
        return result
      },

      onSuccess(){
         queryClient.invalidateQueries({ queryKey: ["challenges"] })
        showSuccess("se ha aceptado el challenge")
      },

      onError(){
        showError("no se ha podido eliminar el challenge")
      }
    })


       const rejectChallenge = useMutation({

      mutationFn:async({id,id_retado}:{id:string,id_retado:string})=>{
        const result = await Api.rejectChallenge(id,id_retado)
        return result
      },

      onSuccess(){
         queryClient.invalidateQueries({ queryKey: ["challenges"] })
        showSuccess("se ha rechazar el challenge")
        
        
      },

      onError(){
        showError("no se ha podido rechazar el challenge")
      }
    })

       const cancelChallenge = useMutation({

      mutationFn:async({id}:{id:string})=>{
        const result = await Api.cancelChallenge(id)
        return result
      },

      onSuccess(){
         queryClient.invalidateQueries({ queryKey: ["challenges"] })
        showSuccess("se ha canelado el challenge")
        
      },

      onError(){
        showError("no se ha podido cancelar el challenge")
      }
    })

    const completeChallenge = useMutation({

      mutationFn:async({id,id_ganador,notas}:{id:string,id_ganador:string,notas:string})=>{
        try {
            const result = await Api.completeChallenge(id,id_ganador,notas)
        return result
          
        } catch (error:any) {
          const message =
                error?.response?.data?.error || "Error desconocido";
              throw new Error(message); 
          
        }
      
      },

      onSuccess(){
        queryClient.invalidateQueries({ queryKey: ["challenges"] })
        showSuccess("se ha completadooo el challenge")
      },

      onError(error:any){
        showError(`no se ha podido completar el challenge,${error.message}`)
      }
    })

      const startChallenge = useMutation({

      mutationFn:async({id}:{id:string})=>{
        const result = await Api.startChallenge(id)
        return result
      },

      onSuccess(){
         queryClient.invalidateQueries({ queryKey: ["challenges"] })
        showSuccess("se ha iniciado el challenge")
      },

      onError(){
        showError("no se ha podido iniciar el challenge")
      }
    })





  return {
    challenges: challenges,
    isLoadingChallanges:isLoading,
    errorChallanges:error,
    createChallenge: createChallenge.mutate,
    acceptChallenge:acceptChallenge.mutate,
    rejectChallenge:rejectChallenge.mutate,
    cancelChallenge:cancelChallenge.mutate,
    completeChallenge:completeChallenge.mutate,
    startChallenge:startChallenge.mutate

  }
}

export default UseChallenges
