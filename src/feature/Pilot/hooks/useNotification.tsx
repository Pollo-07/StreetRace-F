import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from '../../../services/api'
import UseAuthContext from './useAuthContext'
import type { Notification } from '../../../types/userTypes'
import UseAppSnackbar from './useAppSnackbar'

const UseNotification = () => {

    const {dispatch} = UseAuthContext()
      const { showError  } = UseAppSnackbar()
      const queryClient = useQueryClient()
    

    const {data:notification,error:notificationError} = useQuery({
        queryKey:["notification"],
        queryFn:async()=>{
            try {
                 const result = await Api.Notification() 

                 const  notification = result.data.result as Notification[]
                 
                 dispatch({type:"SET_NOTIFICACIONES",payload:notification})

            return notification
                
            } catch (error:any) {
                  const message =
                error?.response?.data?.error || "Error desconocido";
              throw new Error(message); 
                
            }
           
        }
    })

    const allNotificationsAsRead =useMutation({
      mutationFn:async()=>{
        try {
          const result = await Api.allNotificationsAsRead()
          return result
        } catch (error:any) {
             const message =
                error?.response?.data?.error || "Error desconocido";
              throw new Error(message); 
        }
      },

     onSuccess() {
       queryClient.invalidateQueries({queryKey:["notification"]})
       queryClient.setQueryData(["notification"],[])
     },

      onError(error){
         showError(`no se ha podido leer las notificaciones ${error?.message}`)

      }
    })

  return { 
    notification,
    notificationError,
    allNotificationsAsRead:allNotificationsAsRead.mutate
  
  }


}

export default UseNotification
