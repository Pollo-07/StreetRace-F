import { createContext } from "react";
import type { UserAction, UserActionTypes} from "../../../types/userTypes";

export const initialUserState:UserActionTypes = {
    token:"",
    user:null,
    loading: true
}


export const AuthContext = createContext({
    state:initialUserState,
    dispatch:(_action:UserAction)=> {}
})