import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {Api} from "../../../services/api"
import UseAppSnackbar from "../../Pilot/hooks/useAppSnackbar"
import type { User, UserForm } from "../../../types/userTypes"
import type { challengaAll } from "../../../types/challangeTypes"

export const useAdmin = () => {
 const {    showSuccess,showError  } = UseAppSnackbar()
 const queryClient = useQueryClient()


const {data:userAll,error:ErrorUser,isLoading:isLoadingUser} = useQuery({
    queryKey: ["userAll",],
    queryFn: async () => {

        try {
            const result =  await Api.UserAll()
             return result.data.result as User[]
        } catch (error:any) {
            throw new Error(error.response?.data?.error || "Error desconocido");
        }
       
    },

})

const {data:challengeDisputed,error:errorChallengeDisputed} = useQuery({
    queryKey:["ChallengeDisputed"],
    queryFn:async()=>{
        try {
            const result =  await Api.ChallengeDisputed()
             return result.data.result as challengaAll[]
        } catch (error:any) {
            throw new Error(error.response?.data?.error || "Error desconocido");
        }
    }
})


const userAllSearch = useMutation({
  mutationFn: async ({search,page}: {search:string,page:number} ) => {

    try {
      const res = await Api.UserAllSeacrch( search,page);

    return res.data.result as {data:User[],totalUser:{total:number}};
      
    } catch (err:any) {

      throw new Error(err.response?.data?.error || "Error desconocido");
      
    }
    
  },
  onSuccess: (data) => {
   
    // queryClient.invalidateQueries({ queryKey: ["user"] })

  },
   onError: (err) => {
      showError(`Error al traer  a los usuarios ${err?.message || "Inténtalo de nuevo"}`,);
  },
    });


const resolveChallengeDisputed= useMutation({
    mutationFn:async({id,ganador_id}:{id:string,ganador_id:string})=>{
        try {
            const result =  await Api.resolveChallengeDisputed(id,ganador_id)
             return result.data
        } catch (error:any) {
            throw new Error(error.response?.data?.error || "Error desconocido");
        }

    },

    onSuccess(){
        showSuccess("no se ha resuelto el challenge")

    },

    onError(err){
         showError(`Error al  resolver el challenge ${err?.message || "Inténtalo de nuevo"}`,);

    }
})

const deleteUser= useMutation({
    mutationFn:async(id:string)=>{
        try {
            const result =  await Api.deleteUser(id)
             return result.data
        } catch (error:any) {
            throw new Error(error.response?.data?.error || "Error desconocido");
        }

    },

    onSuccess(){
            queryClient.invalidateQueries({ queryKey: ["userAll"] })

        showSuccess("no se ha eliminado el user")

    },

    onError(err){
         showError(`Error al  eliminar el user ${err?.message || "Inténtalo de nuevo"}`,);

    }
})

const updateUser = useMutation({
  mutationFn: async ({data,id}: {data: Partial<UserForm>,id:string} ) => {

    try {
      const res = await Api.updateUser( data,id);
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

const challengeComplete = useMutation({
  mutationFn: async ({id,ganador_id}: {id:string,ganador_id:string} ) => {

    try {
      const res = await Api.challengeComplete(id,ganador_id);
    return res.data;
      
    } catch (err:any) {

      throw new Error(err.response?.data?.error || "Error desconocido");
      
    }
    
  },
  onSuccess: () => {
    showSuccess("se ha completado el challenge con éxito");
    queryClient.invalidateQueries({ queryKey: ["ChallengeDisputed"] })

  },
   onError: (err) => {
      showError(` Error no se ha completado el challenge ${err?.message || "Inténtalo de nuevo"}`,);
  },
    });




   return {
    userAll,
    ErrorUser,
   challengeDisputed,
  errorChallengeDisputed,
  resolveChallengeDisputed:resolveChallengeDisputed.mutate,
  deleteUser:deleteUser.mutate,
  updateUser:updateUser.mutate,
  userAllSearch:userAllSearch.mutateAsync,
  challengeComplete:challengeComplete.mutate
  
  
  };

}



  
