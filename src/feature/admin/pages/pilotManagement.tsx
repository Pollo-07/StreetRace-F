import { Box, Grid, Typography, } from "@mui/material";
import PilotForm from "../components/pilotForm";
import PilotCardEdit from "../components/PilotCardEdit";
import { useEffect, useState } from "react";
import type { User } from "../../../types/userTypes";
import DarkField from "../../../components/darkField";
import { useAdmin } from "../hooks/useAdmin";
import ButtonCustom from "../../../components/buttonCustom";


export default function PilotManagement() {

  const [PilotData,setPilotData] = useState<User>({
     id: "",
  username: "",
  email: "",
 foto_perfil: "",
  zona_localidad: "",
  zona_ciudad: "",
  zona_estado: "",
  zona_pais: "",
  rango: "",
  categoria_id: "",
  victorias: 0,
  derrotas: 0,
  retos_consecutivos: 0,
  estado: "",
  })

const [search, setSearch] = useState("");
const [data, setData] = useState<{data:User[],totalUser:{total:number}}>();
const {userAllSearch} = useAdmin()
const [page, setPage] = useState(1)


 

  useEffect(()=>{

    const hadlerSearch = async ()=>{

   const result=  await userAllSearch({search,page})
     setData(result)
  }

  hadlerSearch()

  },[search,page])


    const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  
    const totalPages = Math.ceil( (data?.totalUser.total ?? 0) / 10);


  return (
    <Box sx={{ bgcolor: "#10111A", minHeight: "100vh", p: 4, color: "#fff" }}>
      
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ color: "#00ffff", fontSize: "10px" }}>
          CORE_DATABASE_LOADED
        </Typography>

        <Typography sx={{ fontSize: "40px", fontWeight: 800 }}>
          Modify Pilotos
        </Typography>

       

        <Box sx={{ width:"100%",mt: 2, display: "flex", gap: 4,justifyContent:"space-between",alignItems:"center"}}>

             <Box sx={{display:"flex",gap:4,flex:.7}}>
               <ButtonCustom sx={{width:170}}  disabled={page === 1} onClick={prevPage}>ant</ButtonCustom>
             <ButtonCustom sx={{width:170}} disabled={page>=totalPages} onClick={nextPage}>sigu</ButtonCustom>
             </Box>
           



           <Box sx={{display:"flex",alignItems:"center",gap:5}}>
                 <DarkField
                 sx={{"& .MuiInputBase-root": {
                     height: "56px",
                  },}}
                  
              size="small"
                placeholder="buscar piloto"
             
                value={search}
                onChange={(e:any) => {
                  setSearch(e.target.value);
                  setPage(1); // 🔥 reset página
                }}
              />

    

           </Box>
          
         

        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid size={6}>
          <PilotCardEdit setPilotData={setPilotData} user={data}/>
        </Grid>

        <Grid size={6}>
          <PilotForm PilotData ={PilotData} />
        </Grid>
      </Grid>
    </Box>
  );
}