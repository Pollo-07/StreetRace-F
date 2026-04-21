import { Box, Typography } from "@mui/material";
import CardsCars from "../components/cardsCars";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ModalCars from "../components/modalCars";
import { useState } from "react";
import PageWrapper from "../components/pageWrapper";
import UseVehicle from "../hooks/useVehicle";
import type { Vehiculo } from "../../../types/vehicleTypes";

type ModalMode = "create" | "edit";


const MyGarage = () => {

     const [open, setOpen] = useState(false);  
     const [mode, setMode] = useState<ModalMode>("create");
     
     const [dataEdit, setDataEdit] = useState<Vehiculo>();  


  const handleOpen = () => {
     setMode("create");
    setOpen(true)
}
  const {vehicles} = UseVehicle()
  const  vehicleActivo = vehicles?.find((item)=>item.activo)

  return (
    <PageWrapper>
        <Box sx={{ color: "white"}}>
          {
            vehicles?.length ===0 || vehicles &&  <Box sx={{position: "relative" }}>
            
            <Box
                component="img"
                src={vehicleActivo?.foto}
                sx={{
                width: "100%",
                height: "85vh",
                objectFit: "cover",
                borderRadius: "16px",
                border: " rgba(255, 255, 255, 0.1)",
                imageRendering: "auto"
                }}
            />

        
      
         

            <Box
                sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 2,
                position: "absolute",
                top: 0,
                width: "100%",
                height: "100%",
                }}
            >
                <Box>
                <Box>
                    <Typography
                    variant="h3"
                    sx={{ fontWeight: 600, fontStyle: "italic", color: "gray" }}
                    >
                    {vehicleActivo?.marca}
                    </Typography>
                    <Typography
                    variant="h2"
                    sx={{
                        color: "#00f0ff",
                        fontWeight: 600,
                        fontSize: 100,
                        fontStyle: "italic",
                    }}
                    >
                   {vehicleActivo?.modelo}
                    </Typography>
                </Box>
                </Box>

                <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                >
                <Box
                    sx={{
                    width: "320px",
                    background: "rgba(22, 22, 30, 0.5)",
                    backdropFilter: "blur(.5px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    p: 2,
                    borderRadius: "20px",
                    }}
                >
                    <Box
                    sx={{
                        p: 1,
                        display: "flex",
                        gap: 1,
                        justifyContent: "space-between",
                    }}
                    >
                    <Typography variant="body1">Color</Typography>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Box
                        sx={{
                            width: 15,
                            backgroundColor: "red",
                            height: 15,
                            borderRadius: "50%",
                        }}
                        ></Box>
                        <Typography> {vehicleActivo?.color}</Typography>
                    </Box>
                    </Box>

                    <Box
                    sx={{
                        p: 1,
                        display: "flex",
                        gap: 1,
                        justifyContent: "space-between",
                        borderRadius: "5px",
                    }}
                    >
                    <Typography variant="body1">Placa</Typography>
                    <Typography>{vehicleActivo?.placa}</Typography>
                    </Box>
                    <Box
                    sx={{
                        p: 1,
                        display: "flex",
                        gap: 1,
                        justifyContent: "space-between",
                        borderRadius: "5px",
                    }}
                    >
                    <Typography variant="body1">Yaer</Typography>
                    <Typography>{vehicleActivo?.año}</Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                    width: "320px",
                    height: 160,
                    background: "rgba(22, 22, 30, 0.5)",
                    backdropFilter: "blur(0.5px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    p: 4,
                    borderRadius: "20px",
                    }}
                >
                    <Typography variant="h5">Premium Attributes </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
                    <Box
                        sx={{
                        borderRadius: 5,
                        border: "1px solid rgba(255,255,255,.2)",
                        p: 1,
                        }}
                    >
                        <Typography variant="body2">{vehicleActivo?.modificaciones} </Typography>
                    </Box>
                    </Box>
                </Box>
                </Box>
            </Box>


        </Box>
          }

            
        
       

        <Box sx={{p:"10px 45px"}}>

            <Typography variant="h4" sx={{fontStyle:"italic",color:"#00f0ff",mt:5}}>MIS VEHICULOS</Typography>
            <Box >
                 <Box sx={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:2, justifyContent: {
                            xs: "center",  
                            sm: "flex-start" 
                            },}}>
                          <CardsCars setOpen={setOpen} setMode={setMode} setDataEdit={setDataEdit}/>

                           {
                    (vehicles?.length?? 0) < 3 && (vehicles?.length?? 0) !==0  && <Box onClick={handleOpen} sx={{border:"1px solid rgba(255,255,255,.2)",width:150,height:150,borderRadius:"50%", display:"flex",alignItems:"center",justifyContent:"center", cursor:"pointer"}}>  

                      <ControlPointIcon/>
                </Box>
                  }
                 </Box>
                 
                 
                
                <ModalCars open={open} setOpen={setOpen}   title={mode === "create" ? "Crear vehículo" : "Editar vehículo"} 
                initialData={mode==="edit"? dataEdit:undefined}/>

            </Box>
            

        </Box>
 
       
       
         
    </Box>

    </PageWrapper>
    
  );
};

export default MyGarage;
