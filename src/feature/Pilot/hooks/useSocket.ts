import { io, Socket } from "socket.io-client";
import UseAuthContext from "./useAuthContext";
import type { AuthData, Notification } from "../../../types/userTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";



export default function useSocket() {

  const queryClient = useQueryClient()
 const auth = queryClient.getQueryData<AuthData>(["auth"]) ?? null
 const userId = auth?.userId

  const { dispatch } = UseAuthContext();

let socket: Socket | null = null;

  useEffect(()=>{
   if (!userId) return;

     socket = io("http://localhost:3000", {
        query: {
          userId: userId
        }
      });

      socket.on("notificacion", (data:Notification[]) => {


        console.log("🔔 Nueva notificación:", data);
        dispatch({type:"ADD_NOTIFICACIONES",payload:data})
      });



      return()=>{
        socket?.disconnect()
      }

  },[userId])



}



