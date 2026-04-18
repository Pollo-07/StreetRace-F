import { Box, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import SectionBlock from "../../../components/sectionBlock";
import DarkField from "../../../components/darkField";
import ButtonCustom from "../../../components/buttonCustom";
import useForm from "../../../utils/userForm";
import type { User, UserForm } from "../../../types/userTypes";
import { useEffect } from "react";
import { useAdmin } from "../hooks/useAdmin";


  interface PilotFormProps {
    PilotData:User
  }


export default function PilotForm({PilotData}:PilotFormProps) {

  const initiData:UserForm = {
    username:"",
    email:"",
    zona_localidad:"",
    zona_estado:"",
    zona_pais:"",
     zona_ciudad:"",
     foto_perfil: null
  }

  const {formData,handleChange,resetForm} = useForm(initiData)
  const {deleteUser,updateUser} = useAdmin()
  const id_Pilot = PilotData.id

  useEffect(()=>{
  if(PilotData){
    resetForm({
    username:PilotData.username,
    email:PilotData.email,
    zona_localidad:PilotData.zona_localidad,
    zona_estado:PilotData.zona_estado,
    zona_pais:PilotData.zona_pais,
     zona_ciudad:PilotData.zona_ciudad
      
    })
  }

},[PilotData])


  const  handlerUpdateUser =()=>{
  updateUser({
    data:formData,
    id:id_Pilot
  })
  

  }
  


  const handlerDeleteUser =(id:string)=>{
    console.log(id)
    deleteUser(id)

  }





  return (
    <Card
      sx={{
        bgcolor: "#000",
        p: 3,
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
 <form>
      <SectionBlock label={"Modify Pilot"}>
        <Box display="flex" flexDirection="column" gap={2}>
          
         
          <Box sx={{display:"flex", gap:5}}>

              <DarkField
              onChange={handleChange}
              value={formData.username}
              fullWidth
              size="small"
              name="username"
              label="Username"
              placeholder="user_xxxx"
            />

            <DarkField
              onChange={handleChange}
              value={formData.email}
              fullWidth
              size="small"
              name="email"
              label="Email"
              placeholder="user@email.com"
            />

          </Box>

          <Box sx={{display:"flex", gap:5}}>

                <DarkField
              onChange={handleChange}
              value={formData.zona_localidad}
              fullWidth
              size="small"
              name="zona_localidad"
              label="Zona Localidad"
              placeholder="Medellin"
            />

            <DarkField
              onChange={handleChange}
              value={formData.zona_estado}
              fullWidth
              size="small"
              name="zona_estado"
              label="Zona Estado"
              placeholder="Antioquia"
          />

          </Box>

         

          <DarkField
            onChange={handleChange}
            value={formData.zona_pais}
            fullWidth
            size="small"
            name="zona_pais"
            label="Zona País"
            placeholder="Colombia"
          />
        </Box>
      </SectionBlock>
    </form>

   
     

        <Box display="flex" gap={2}>
          <ButtonCustom
          onClick={handlerUpdateUser}
            fullWidth
            sx={{
              bgcolor: "#00ffff",
              color: "#000",
              "&:hover": { boxShadow: "0 0 20px rgba(0,255,255,0.3)" },
            }}
          >
            UPDATE
          </ButtonCustom>

          <ButtonCustom
          onClick={()=>handlerDeleteUser(PilotData?.id)}
            sx={{
              border: "1px solid #ff716c",
              color: "#ff716c",
              "&:hover": { bgcolor: "#ff716c", color: "#000" },
            }}
          >
            <DeleteIcon />
          </ButtonCustom>
        </Box>

    </Card>
  );
}