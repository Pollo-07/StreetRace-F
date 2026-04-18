import {  useReducer, type ReactNode} from "react"
import {AuthContext, initialUserState} from "../context/authContext"
import AuthReducer from "./authReducer"

const AuthProvider = ({children}:{ children: ReactNode }) => {

    const [state,dispatch] = useReducer(AuthReducer,initialUserState)






  return (
    <AuthContext.Provider value={{state,dispatch}}>
        
        {children}
      
    </AuthContext.Provider>
  )
}

export default AuthProvider
