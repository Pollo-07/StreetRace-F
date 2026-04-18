import { Box, Typography } from "@mui/material";
import CardsChallenge from "../components/cardsChallenge";
import PageWrapper from "../components/pageWrapper";
import { useState } from "react";
import ModalChallenge from "../components/ModalChallenge";


const Challenge = () => {

      const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);


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
                        <Typography onClick={handleOpen} sx={{cursor:"pointer",border:"1px solid #BC13FE ",p:2,borderRadius:"50px","&:hover":{backgroundColor:"#a752c9",border:"none"}}}>New Challenge</Typography>
                         <ModalChallenge open={open} setOpen={setOpen}/>
              </Box>

        </Box>
       
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap",justifyContent:"center" }}>
          <CardsChallenge />
          
           
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Challenge;
