import { Box, Typography, Button } from "@mui/material";
import RankingTable from "../components/rankingTable";
import Podium from "../components/podium";

export default function RankingPage() {

  
  
  
  
  return (
    <Box sx={{ bgcolor: "#0e0e0e", minHeight: "100vh",p:2 }}>

    
      <Box sx={{ p:2}}>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
         <Box sx={{ mb: 6 }}>
          <Typography
            sx={{
                fontStyle:"italic",
              fontSize: 40,
              fontWeight: 900,
              color: "#0ff",
            }}
          >
            GLOBAL RANKING
          </Typography>

          <Typography sx={{ color: "#888", fontSize: 12 }}>
            Season 2024
          </Typography>
        </Box>

      
        <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
          <Button
            sx={{
              bgcolor: "#BC13FE",
              color: "#000",
            }}
          >
            CARS
          </Button>

          <Button sx={{ color: "#888" }}>
            MOTORCYCLES
          </Button>
        </Box>

        
    </Box>
      
       


        <Podium /> 

        <RankingTable />

      </Box>

   
    </Box>
  );
}