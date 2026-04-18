import type { SelectChangeEvent } from "@mui/material"
import { useState } from "react"

const useForm  = <T extends object>(initialState:T) => {

  const [formData,setForm] = useState<T>(initialState)



const handleChange =(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> |SelectChangeEvent)=>{
   const {name,value} = e.target as HTMLInputElement
  setForm((prev)=>({
    ...prev,
    [name] : value
  }))


}


const resetForm =  (data?:any)=> setForm(data? data:initialState)



  return {formData,setForm,handleChange,resetForm}
}

export default useForm 
