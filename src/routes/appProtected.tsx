import { useQueryClient } from '@tanstack/react-query'
import { Outlet, Navigate,   } from 'react-router-dom'
import type { AuthData, ROLES } from '../types/userTypes'


type propsRouterProtected = {
  roles?: ("admin" | "user")[];
};


const RouterProtected = ({roles}:propsRouterProtected) => {

  const queryClient = useQueryClient();
const auth = queryClient.getQueryData(["auth"]) as AuthData;


  const token  = auth?.token
  const role = auth?.role as ROLES


  if(!token) return <Navigate to={"/login"} replace />


  if (roles && role && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }   

  return <Outlet/>
} 

export default RouterProtected
