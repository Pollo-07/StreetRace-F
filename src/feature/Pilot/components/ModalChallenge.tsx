import {
  Box, Typography, MenuItem,
   Grid, InputAdornment, 
  Stack,
  Dialog,
  DialogContent,
} from "@mui/material";
import PersonIcon        from "@mui/icons-material/Person";
import LocationOnIcon    from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotesIcon         from "@mui/icons-material/Notes";
import SportsScoreIcon   from "@mui/icons-material/SportsScore";
import SectionBlock from "../../../components/sectionBlock";
import DarkField from "../../../components/darkField";
import useForm from "../../../utils/userForm";
import UseChallanges from "../hooks/useChallenges";
import ButtonCustom from "../../../components/buttonCustom";
import { useUser } from "../hooks/useUser";
import UseVehicle from "../hooks/useVehicle";
import type { DiscoverUserWithVehicle } from "../../../types/vehicleTypes";




const CARRERAS = [
  { value:"Cuarto_milla", icon:"⚡" },
  { value:"Vueltas", icon:"🌀" },
  { value:"Derrape", icon:"🏁" },
 
];




const InitialformData = {
retado_id:"",
tipo_carrera:"",
ubicacion_acordada:"",
fecha_acordada:"",
notas:"",
} 
interface ModalChallengeProp {
open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData?:DiscoverUserWithVehicle
}

   
export default function ModalChallenge({ open,setOpen,initialData }: ModalChallengeProp) {


  const {formData,handleChange,resetForm} = useForm(InitialformData)
  const {user,respectPilotData} = useUser()
  const {vehicles} = UseVehicle()
  const vehiclesActivo = vehicles?.find((vehiculo)=>vehiculo.activo)
  const {createChallenge} = UseChallanges()


console.log("respectPilotData",respectPilotData)


 const handleClose = () => {

    resetForm()
    setOpen(false);

  };

  const handlerCreateChanllenge=()=>{
    const vehiculo_retado_id = respectPilotData?.find((respect)=>
      respect.id = formData.retado_id
    )

   const newData = {
  ...formData,
  retador_id: user?.id,
  vehiculo_retador_id: vehiclesActivo?.id,
  vehiculo_retado_id:initialData? initialData.id_vehiculo : vehiculo_retado_id?.id_vehiculo ,
  estado: "pendiente",
};


     createChallenge(newData)

      resetForm()
     
  }

  
  
 
  return (
    <>
       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
           <DialogContent sx={{ minHeight:"100vh", bgcolor:"#000", px:3, py:5, display:"flex", justifyContent:"center" }}>
                  <Box sx={{ width:"100%", maxWidth:860 }}>

          {/* Header */}
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box sx={{ width:48, height:48, borderRadius:1.5, bgcolor:"rgba(0,240,255,0.07)",
                border:"1px solid rgba(0,240,255,0.2)", display:"flex", alignItems:"center",
                justifyContent:"center", boxShadow:"0 0 20px rgba(0,240,255,0.15)" }}>
                <SportsScoreIcon sx={{ color:"#00f0ff", fontSize:26 }} />
              </Box>
              <Box>
                <Typography sx={{ fontFamily:"'Orbitron',sans-serif", fontWeight:900,
                  fontSize:"1.9rem", letterSpacing:"0.06em", color:"#fff", lineHeight:1,fontStyle:"italic" }}>
                  CREAR RETO
                </Typography>
                <Typography sx={{ color:"#444", fontSize:"0.85rem", mt:.4 }}>
                  Configura los detalles del desafío
                </Typography>
              </Box>
            </Box>
          </Box>

      
            <Grid container  spacing={4} alignItems="stretch">

                  <Grid size={6} >
                    <Stack spacing={2.5}> 
                    <SectionBlock label={"01 — PARTICIPANTES"}>
                      <Stack spacing={2.5}>
                      <DarkField 
                      select
                      fullWidth size="small" name="retado_id" label=" Retado" 
                      value={formData.retado_id}
                        onChange={handleChange} placeholder="user_xxxx" 
                        InputProps={{ startAdornment:<InputAdornment position="start"><PersonIcon sx={{color:"#555",fontSize:18}}/></InputAdornment> }} >

                         {
                              initialData ? (
                                <MenuItem key={initialData.id} value={initialData.id}>
                                  {initialData.username}
                                </MenuItem>
                              ) : 

                                respectPilotData?.length === 0 ? <Typography sx={{p:1,color:"red"}}>Necesitas conocer Pilotos </Typography> :
                              
                              (
                                respectPilotData?.map((respect) => (
                                  <MenuItem key={respect.id} value={respect.id}>
                                    {respect.username}
                                  </MenuItem>
                                ))
                              )
                            }

                      </DarkField>
                      
                    </Stack>
                    </SectionBlock>

                    <SectionBlock label={"02 — TIPO Y ESTADO"}>
                    <Stack spacing={2.5}> 
                      <DarkField name="tipo_carrera" fullWidth size="small" select label="Tipo de Carrera"
                        value={formData.tipo_carrera} onChange={handleChange}
                        InputProps={{ startAdornment:<InputAdornment position="start"><SportsScoreIcon sx={{color:"#00f0ff",fontSize:18}}/></InputAdornment> }}>
                        {CARRERAS.map(o => (
                          <MenuItem key={o.value} value={o.value} sx={{ fontFamily:"'Rajdhani',sans-serif" }}>
                            <span style={{marginRight:8}}>{o.icon}</span>{o.value}
                          </MenuItem>
                        ))}
                      </DarkField>
                     
                      </Stack>  
                    </SectionBlock>
                    </Stack>
                  </Grid>
             
                <Grid size={6}>
                  <Stack spacing={2.5}> 
                  <SectionBlock label={"04 — LUGAR Y FECHA"}>
                      <Stack spacing={2.5}> 
                    <DarkField name="ubicacion_acordada" fullWidth size="small" label="Ubicación Acordada" value={formData.ubicacion_acordada}
                      onChange={handleChange} placeholder="Ej: Autódromo de la Ciudad" 
                      InputProps={{ startAdornment:<InputAdornment position="start"><LocationOnIcon sx={{color:"#00f0ff",fontSize:18}}/></InputAdornment> }} />
                    <DarkField name="fecha_acordada" fullWidth size="small" type="datetime-local" label="Fecha y Hora"
                      value={formData.fecha_acordada} onChange={handleChange}
                      InputLabelProps={{ shrink:true }} 
                      InputProps={{ startAdornment:<InputAdornment position="start"><CalendarMonthIcon sx={{color:"#00f0ff",fontSize:18}}/></InputAdornment> }} />
                    </Stack>
                  </SectionBlock>

                  </Stack>
                </Grid>

          </Grid>

          <Grid container spacing={4} sx={{m:"30px 0px 30px 0px"}} >
              <Grid size={12}>
                <SectionBlock label={"05 — NOTAS"}>
                  <Stack spacing={2.5}>  
                  <DarkField name="notas" fullWidth size="small" multiline rows={3} label="Notas (opcional)"
                    value={formData.notas} onChange={handleChange}
                    placeholder="Reglas especiales, apuestas..." 
                    InputProps={{ startAdornment:
                      <InputAdornment position="start" sx={{alignSelf:"flex-start",mt:1.2}}>
                        <NotesIcon sx={{color:"#555",fontSize:18}}/>
                      </InputAdornment> }} />
                      </Stack>
                </SectionBlock>              
              </Grid>

            </Grid>

          <ButtonCustom disabled={ respectPilotData?.length === 0 } onClick={() =>handlerCreateChanllenge() }>
            <SportsScoreIcon/> <Typography sx={{ml:1}} >LANZAR RETO </Typography>
          </ButtonCustom>
        </Box>
           </DialogContent>
              
              
              
      </Dialog>
     
    </>
  );
}