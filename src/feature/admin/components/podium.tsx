import { Avatar, Box, Typography } from "@mui/material";
import image from "../../Pilot/assets/img-prueba.png"
import { useAdmin } from "../hooks/useAdmin";
import { getStreetCredValue, streetCred } from "../../../utils/winRate";


export default function Podium() {



    const {userAll} = useAdmin()


    console.log(userAll,"usaerall")



    
    const  sorted = (userAll?? []).slice()
            .sort((a,b)=>
            getStreetCredValue(b.victorias, b.derrotas, b.rango) -
            getStreetCredValue(a.victorias, a.derrotas, a.rango)
          ).slice(0,3)

    const podium = [sorted[1], sorted[0], sorted[2]]; 

  return (
    <Box
      sx={{
        display: "flex",
        alignItems:"center",
        gap: 2,
        mb: 6,
      }}
    >
         
         {
        (podium ??[]).map((pilot,index)=>{
           if (!pilot) return null;
          return(
              <Box
              key={index}
              sx={{
                flex: 1,
                p: 3,
                bgcolor: index===1? "#000" : "#111",
                border: index===1 ? "4px solid #BC13FE" : "1px solid #222",
                height:index===1? 480 : 320,
                textAlign: "center",
                position:"relative"
              }}
  >

    {
        index !==1 &&  <Typography sx={{ color: "#2a2626" ,position:"absolute",bottom:230,left:300,fontSize:45,fontStyle:"italic"}}>#0{index+1}</Typography>
    }
  

        <Box>
                  <Avatar
                  src={image}
                  sx={{
                    width: index===1 ? 150 : 120,
                    height: index===1 ? 150 : 120,
                    mx:"auto",
                    filter: "grayscale(1)",
                  }}
                />

                <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
                {pilot.username}
                </Typography>
                   <Typography variant="body2" sx={{ color: "#00f0ff" }}>
                  {pilot.zona_ciudad} / {pilot.zona_localidad}
                </Typography>

                <hr style={{margin:20}}></hr>

                <Box sx={{display:"flex",justifyContent:"space-around"}}> 


                   <Box>
                    
                    <Typography variant="caption" sx={{ color: "grey" }}>
                            Puntos 
                    </Typography>
                        
                    <Typography sx={{ color: "#00f0ff",fontSize:30 }}>
                            {streetCred(pilot.victorias,pilot.derrotas,pilot.rango)} 
                    </Typography>
                </Box>

                <Box>
                   <Typography variant="caption" sx={{ color: "grey" }}>
                            Victorias
                    </Typography>
                        
                   <Typography sx={{ color: "#BC13FE",fontSize:30 }}>
                            {pilot.victorias}
                    </Typography>
                </Box>


                </Box>
             



            </Box>
            
        </Box>

          )
          
           

        }

          

          )
         }


     
      
    </Box>
  );
}