import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AuthData, LoginType, RegisterType, } from "../../../types/userTypes";
import { useNavigate } from "react-router-dom";
import UseAuthContext from "./useAuthContext";
import UseAppSnackbar from "./useAppSnackbar";
import { Api } from "../../../services/api";
import { setAuthToken } from "../../../services/getAuthToken";

export const useAuth = () => {
  const navigate = useNavigate();
  const { dispatch } = UseAuthContext();
  const {    showSuccess,showError  } = UseAppSnackbar()
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async(data: LoginType) => {
      try {
        const result = await Api.login(data)
        
       

      return result.data
        
      } catch (error:any) {

        
         const message =
                error?.response?.data?.error || "Error desconocido";
              throw new Error(message); 
      }
      
    },

    onSuccess: ( data ) => {       setAuthToken(data.accessToken)
      queryClient.setQueryData<AuthData>(["auth"], {
        token: data.accessToken,
        userId:data.user.id,
        role:data.user.role
      }) 
      showSuccess("Inicio de sesión exitoso");  
      navigate("/");
    },
    onError: (err) => {
      console.log("error",err)
      showError(`Error al iniciar sesión ${err?.message || "Inténtalo de nuevo"}`,);
    },
  });

  const register = useMutation({
    mutationFn:async (data: RegisterType) => {
      try {
       const result=  await Api.register(data)
       return result
      } catch (error:any) {
         
         const message =
                error?.response?.data?.error || "Error desconocido";
              throw new Error(message); 
      }
    },

    onSuccess: () => {
      showSuccess("Registro exitoso. Por favor, inicia sesión.");
      setTimeout(()=>{
         navigate("/login");

      },2000)
     
    },
    onError: (err) => {
      showError(`Error al registrar el usuario ${err?.message || "Inténtalo de nuevo"}`,);
    },
  });


const refreshTokens = useMutation({
    mutationFn: async () => {
      const res = await Api.refreshToken();
      return {
        token: res.data.accessToken,
        id: res.data.id,
        role:res.data.role
      };
    },

    onSuccess: ({ token ,id,role}) => {
        dispatch({ type: "SET_LOADING", payload: true })

      setAuthToken(token)
      queryClient.setQueryData<AuthData>(["auth"], {
        token: token,
        userId:id,
        role:role
      });

     

      dispatch({ type: "SET_LOADING", payload: false });
    },

    onError: (err) => {
      console.log(err);
      showError("Error al actualizar el token")
    },

    onSettled:()=>{
       dispatch({ type: "SET_LOADING", payload: false })  
    }
  });

  const logout = useMutation({
    mutationFn:async()=>{

      try {
        const result = await Api.logout()
      return result
        
      } catch (error:any) {
        const message =
                error?.response?.data?.error || "Error desconocido";

              throw new Error(message); 
        
      }

     
    },
    onSuccess() {
      showSuccess("se ha cerrado la sesion")
      setAuthToken(null)
    },

     onError(error) {
      showSuccess(`se ha podido cerrado la sesion ${error.message}`)
    },
  })


  
  return {
    login: login.mutate,
    register: register.mutate,
    refreshTokens: refreshTokens.mutate,
    logout:logout.mutate
  };
};

