import { Box, Typography } from "@mui/material";
import { DisputeCard } from "../components/disputeCard";

export default function DisputesPage() {


  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#10111A",
        color: "#e2e2e2",
        p: 4,
      }}
    >
        <Box sx={{display:"flex", gap:1}}>

        <Typography sx={{ fontWeight: 600, mb: 4, fontSize: 48,fontStyle:"italic", color:"#ffff"}}>
            Disputed 
        </Typography>
        <Typography sx={{ fontWeight: 600, mb: 4, fontSize: 48,fontStyle:"italic",color:"#0ff", }} >
            Challenges
        </Typography>
            
        </Box>
     

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <DisputeCard/>
      </Box>
    </Box>
  );
}