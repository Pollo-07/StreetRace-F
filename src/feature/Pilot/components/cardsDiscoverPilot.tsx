import{ useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Chip,
  Grid,
} from "@mui/material";
import ButtonCustom from "../../../components/buttonCustom";
import { useUser } from "../hooks/useUser";
import { Engangements, streetCred, WinRate } from "../../../utils/winRate";
import { RankConverter } from "../../../utils/rankConverter";
import ModalChallenge from "./ModalChallenge";
import type { DiscoverUserWithVehicle } from "../../../types/vehicleTypes";
import { useNavigate } from "react-router-dom";


//   {
//     name: "VAPOR_VECTOR",
//     level: 88,
//     cred: "LEGENDARY",
//     speed: 342,
//     heat: "CRITICAL",
//     vehicleType: "MOTORCYCLE",
//     brand: "Yamaha",
//     model: "YZF-R1",
   
//   {
//     name: "CYBER_REBEL",
//     level: 64,
//     cred: "VETERAN",
//     speed: 318,
//     heat: "STABLE",
//     vehicleType: "SPORT BIKE",
//     brand: "Kawasaki",
//     model: "Ninja ZX-10R",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrB50uzr8lPioSpJKo0JRXWBy3QMvJg9m6RCmryYIkzPUf3DXZFpcFpOJ-uEcWXZcr6JoAGFZWfMefIiGw2v8bSj7QUBmAoQhWVCokAKrNg7diIfGcN2q4qWaPdoaYZEfs-lBH2jD89Cq0-CSi1B0F1HFQrfXwI2uroTcZN7SMgLdrWLiEOLCPhTMcN3GWx2BDfIpCOq9dSi8AK_OBg6q83yVfnvHMmvSGd3j5rW_YnbG9NT1Z6JGR14m4irQTdJl4EUeE5S6hbAWl",
//     car: "https://lh3.googleusercontent.com/aida-public/AB6AXuAalJKwOejObnDXK_R62gbaeCP0Wvj7vNWoGpC7ZZTFoejboPzddm2yaUqkgPVXR1jmeLPEj2QqemVuL9CJ9jhy4vwTe1LOkNGJ7uXCz-tLRTgxI2Z3d1TNzkv5S6YvCFjl98HisOdar_9-2PdjZ9VS1jwKiPQQW9LcSTqhocMK4kDqP_zBDsR3fadZx4qeAq6uhmE6JR8WUrWBZQhTh6hKCC_JKc2bCRv1qlrulzjZo8Hf6Jl_M10jYXk9yTZaM5n-jsqN7J-6zsgv",
//   },
// ];

const CardsDiscoverPilot = () => {
const [enableScroll, setEnableScroll] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<DiscoverUserWithVehicle>();
  const navigate = useNavigate()
  
    const handleOpen = (pilot:DiscoverUserWithVehicle) => {
     setInitialData(pilot)
      setOpen(true)
    
    };

    const {discoverPilot,respectPilot,respectPilotData} = useUser()

  const   img= "https://lh3.googleusercontent.com/aida-public/AB6AXuDOKrzkedjMW70mRTqCi3L68pEKcc77rV6siiJoHW29mVBw16WaeR1OgrTZq8oYPwztxnRzg-90oPW_K8YtoiGxcRrCJ7cM92oK_Kh7W4d1tdiID7u9oPVhyrtkCUBu_p3QC59f6lL0DRCgAOVQwPLWG6uQ1lkiwedgHXRV3RwzjVC2-hHm10NrLuU1tgSpp10JJSq2IY5rAMzhXae-mRL0bNL_D-AYgr8ytPFRM9-qk5kCFLIzP16wgNNobHRRxdEl_zB1A3QaGx"
   const car= "https://lh3.googleusercontent.com/aida-public/AB6AXuCWERGK2no66i6d2VnOOGDJrv5uGZkn_rOqwWVqln4UVYL8ajA9xKjN0FGGd5R33hXkv1KhDxfhBKjYmgC3PYnMY6sPpjrSvSinsA1EyAwP-ssYFYcx_bq7_7ybQoI246BjQeaPvwpZkFfzr1SyYqvivQSus5ZgXuDsZedP_BtS2EokKqckwn3H046fwTbwB6p4y0SP3cEvzjYbhqxdy9fIifsyKvoSoKJ-GXeWJtclrI0By9ZyCzS9bI2wVgOzR7xvy7-HYke2TyxP"
  



   console.log("dscober",discoverPilot)
  return (

      <>
      
   {
    discoverPilot?.length!==0 ? <Box
      sx={{
        height: "70vh",
       overflowY: enableScroll ? "scroll" : "hidden",
         scrollSnapType: "y mandatory",
         scrollSnapStop: "always",
        scrollBehavior: "smooth", // 
         transition: "all 0.10s ease",  
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      {discoverPilot?.map((pilot, index) => {

        const pilotRespect = respectPilotData?.find(p => p.id === pilot.id)

        return(
          <Box
         onMouseEnter={() => setEnableScroll(true)}
         onMouseLeave={() => setEnableScroll(false)}
          key={index}
          sx={{
          height: "100%",         
            scrollSnapAlign: "start",
            p: 4,
            mb:4,
            
          }}
        >
          <Card
            sx={{
              display: "flex",
              width: "100%",
              height: "60vh",
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "#10111A",
              color: "white",
              border: "1px solid rgba(0,244,254,0.2)",
              boxShadow: "0 0 30px rgba(0,244,254,0.1)",
            }}
          >
            {/* LEFT */}
            <Box
              sx={{
                width: "40%",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                borderRight: "1px solid rgba(255,255,255,0.05)",
              }}
            >
          
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  component="img"
                  src={img}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "2px solid #00f4fe",
                  }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 700, fontStyle: "italic",mb:1 }}>
                    {pilot.username}
                  </Typography>
                  <Box sx={{display:"flex",gap:2}}>
                      <Chip label={RankConverter(pilot.rango)} size="small"   variant="outlined" sx={{
                          borderColor: "#00f0ff",   
                          color: "white",        
                          fontWeight: "bold",
                        }} />
                    <Chip label={streetCred(pilot.victorias,pilot.derrotas,pilot.rango)} size="small" sx={{
                          bgcolor: "#00f0ff",   
                          color: "#000",        
                          fontWeight: "bold",
                        }} />

                  </Box>
                
                </Box>
              </Box>

           

             
              <Grid container spacing={1}>
                <Grid size={6}>
                  <Box sx={{ p: 1, bgcolor: "#000" }} color="#00f0ff">
                    <Typography variant="caption" >WINS</Typography>
                    <Typography>{pilot.victorias}</Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{ p: 1, bgcolor: "#000" }} color={"#FF4B4B"}>
                    <Typography variant="caption">LOSES</Typography>
                    <Typography>{pilot.derrotas}</Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{ p: 1, bgcolor: "#000" }} color="#2FF801">
                    <Typography variant="caption">PRECISION</Typography>
                    <Typography>{WinRate(pilot.victorias,pilot.derrotas)}</Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{ p: 1, bgcolor: "#000" }} color= "#90A0B3">
                    <Typography variant="caption">ENGAGEMENTS</Typography>
                    <Typography>{Engangements(pilot.victorias,pilot.derrotas)}</Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* VEHICLE */}
              <Box sx={{ p: 2, bgcolor: "#000",display:"flex",gap:5,alignItems:"center",justifyContent:"space-between" }}>
                <Box>
                   <Typography variant="caption">TYPE</Typography>
                <Typography color="#00f0ff">{pilot.tipo_vehiculo}</Typography>

                </Box>
               <Box>
                <Typography variant="caption">MARCA / MODEL</Typography>
                <Typography color="#00f0ff">
                  {pilot.marca} {pilot.modelo}
                </Typography>

               </Box>

                
              </Box>
            </Box>

            {/* RIGHT */}
            <Box sx={{ position: "relative", flex: 1 }}>
              <CardMedia
                component="img"
                image={car}
                sx={{
                  height: "100%",
                  objectFit: "cover",
                  transition: "0.5s",
                  "&:hover": { transform: "scale(1.1)" },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  p: 2,
                  display: "flex",
                  gap: 2,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                }}
              >
                <ButtonCustom variant="contained" fullWidth onClick={()=>handleOpen(pilot)}>
                  CHALLENGE
                </ButtonCustom>
                <ButtonCustom variant="outlined" fullWidth onClick={()=>{

                   respectPilot(pilot.id),
                  console.log("pilot_id",pilot.id)
                }}  disabled={!!pilotRespect}>
                  RESPECT
                </ButtonCustom>
               
              </Box>
            </Box>
          </Card>
        
        </Box>

        )
        
        
})}

   <ModalChallenge open={open} setOpen={setOpen} initialData={initialData}/>

    </Box>
    : (<Box sx={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",height:"60vh"}}>
    <Typography sx={{color:"#00f0ff",textAlign:"center",mb:5,fontSize:35,fontStyle:"italic",fontWeight:600}}>PARA DESCUBRIR PILOTOS TIENE QUE CONFIGURAR TU ZONA</Typography>
      <ButtonCustom   sx={{ width: 180,mx: "auto", display: "block"}} onClick={()=>navigate("/edituser")}>Ir</ButtonCustom>
    </Box>)
   }

      
      
      </>
    
  );
};

export default CardsDiscoverPilot;