import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import UseAppSnackbar from "./useAppSnackbar";
import type { challengaAll, ChallengeForm } from "../../../types/challangeTypes";
import { Api } from "../../../services/api";
import type { AuthData, Notification } from "../../../types/userTypes";
import { useAuth } from "./useAuth";

type UseChallengesOptions = {
  enableChallenges?: boolean;
  enableCompleteChallenges?: boolean;
};

const UseChallenges = ({
  enableChallenges = true,
  enableCompleteChallenges = false,
}: UseChallengesOptions = {}) => {

  const queryClient = useQueryClient()
  const {    showSuccess,showError  } = UseAppSnackbar()

  const authData = queryClient.getQueryData<AuthData>(["auth"]); 

    const { data: challenges ,isLoading,error} = useQuery({
        queryKey: ["challenges"],
        enabled: enableChallenges,
        queryFn: async() => {
            try {
        const response = await Api.allChallenges();
        return response.data.result as challengaAll[];
      } catch (err: any) {
        throw new Error(err.response?.data?.error || "Error desconocido");
        }}
    
    })

 const { data: challengeComplete, isLoading: isLoadingChallengeComplete, error: errorChallengeComplete } = useQuery({
    queryKey: ["challengeComplete", authData?.userId],
    enabled: enableCompleteChallenges && !!authData?.userId,
    queryFn: async () => { 
        try {
            const response = await Api.challengeComplete(authData?.userId);
            console.log("challengeComplete",response.data)
            return response.data.result as challengaAll[];
        } catch (err: any) {
            throw new Error(err.response?.data?.error || "Error desconocido");
        }
    }
})


    const createChallenge = useMutation({
        mutationFn: async({challenge,notification}:{challenge:ChallengeForm,notification:Notification}) => { 
          try {
            const createChallenge = await Api.createChallenge(challenge,notification) 
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
          showError(`Error al crear el challenge ${error.message}`);  
        },
        
        })

    const acceptChallenge = useMutation({

      mutationFn:async({id,id_retado,notification}:{id:string,id_retado:string,notification:Notification})=>{
        const result = await Api.acceptChallenge(id,id_retado,notification)
        return result
      },

      onSuccess(){
         queryClient.invalidateQueries({ queryKey: ["challenges"] })
        showSuccess("se ha aceptado el challenge")
      },

      onError(){
        showError("no se ha podido aceptar el challenge")
      }
    })


       const rejectChallenge = useMutation({

      mutationFn:async({id,id_retado,notification}:{id:string,id_retado:string,notification:Notification})=>{
        const result = await Api.rejectChallenge(id,id_retado,notification)
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

      mutationFn:async({id,id_ganador,notas,notification}:{id:string,id_ganador:string,notas:string,notification:Notification[]})=>{
        try {
            const result = await Api.completeChallenge(id,id_ganador,notas,notification)
        return result 
          
        } catch (error:any) {
          const message =
                error?.response?.data?.error || "Error desconocido";
              throw new Error(message); 
          
        }
      
      },
      

      onSuccess(_data,variables){

          queryClient.setQueryData(["challenges"], (oldData: any) => {
              if (!oldData) return []

              return oldData.filter((c: any) => c.id !== variables.id)
            })
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
    challengeComplete,
    isLoadingChallanges:isLoading,
    isLoadingChallengeComplete,
    errorChallanges:error,
    errorChallengeComplete,
    createChallenge: createChallenge.mutate,
    acceptChallenge:acceptChallenge.mutate,
    rejectChallenge:rejectChallenge.mutate,
    cancelChallenge:cancelChallenge.mutate,
    completeChallenge:completeChallenge.mutate,
    startChallenge:startChallenge.mutate

  }
}

export default UseChallenges
