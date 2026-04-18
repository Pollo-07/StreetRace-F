import  { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const UseAuthContext = () => {
  return useContext(AuthContext)
}

export default UseAuthContext
