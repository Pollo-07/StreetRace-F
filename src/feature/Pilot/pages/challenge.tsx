import { Box, Typography } from "@mui/material";
import CardsChallenge from "../components/cardsChallenge";
import PageWrapper from "../components/pageWrapper";
import { useState } from "react";
import ModalChallenge from "../components/ModalChallenge";
import UseVehicle from "../hooks/useVehicle";
import ButtonCustom from "../../../components/buttonCustom";


const Challenge = () => {

      const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);

    const {vehicles} = UseVehicle()

  return (
    <PageWrapper>
      <Box sx={{ color: "white", p: 2 }}>
        <Typography
          variant="h6"
          sx={{ fontStyle: "italic", fontWeight: 900, color: "#BC13FE" }}
        >
          Active Feed
        </Typography>
        <Box sx={{ display:"flex",alignItems:"center",justifyContent:"space-between",}}>
                <Typography variant="h3" sx={{ fontStyle: "italic", fontWeight: 900 }}>
              {" "}
              Incoming <span style={{ color: "#00f0ff" }}>Challenges</span>
            </Typography>
            <Box  >  
                  <ButtonCustom disabled={!vehicles || vehicles.length === 0}  onClick={handleOpen} sx={{border:"1px solid #BC13FE",color:"white",p:2,borderRadius:"50px","&:hover":{backgroundColor:"#a752c9",border:"none"}}}>New Challenge</ButtonCustom>
                  <ModalChallenge open={open} setOpen={setOpen}/>
              </Box>

        </Box>
       
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap",justifyContent:"center" }}>
          
          {
           ( !vehicles || vehicles.length ===0) ?
              <Box
                sx={{
                  height: "60vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: 20, md: 26 },
                    color: "#ff6e81",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    textAlign: "center",
                  }}
                >
                  No es posible iniciar un challenge sin vehículos
                </Typography>
              </Box>
            :
             <CardsChallenge />
             
              
          }
        
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Challenge;
