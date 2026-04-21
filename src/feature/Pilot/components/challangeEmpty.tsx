import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ChallangeEmpty = () => {

     const location = useLocation();
     const naviagate = useNavigate()
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        px: 2
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: { xs: 20, md: 26 },
          color: "#00f1fe",
          textTransform: "uppercase",
          letterSpacing: 1
        }}
      >
        The track is cold
      </Typography>

      {/* Subtitle */}
      <Typography
        sx={{
          fontSize: 13,
          color: "#9aa0a6",
          maxWidth: 320,
          lineHeight: 1.6
        }}
      >
      
     No se detectaron challanges activos. Buscando carreras callejeras cercanas...
      </Typography>


{
        location.pathname === "/" && <Button
        onClick={()=>naviagate("/challenges")}
        variant="contained"
        sx={{
           
          mt: 2,
          bgcolor: "#00f1fe",
          color: "#00555a",
          fontWeight: "bold",
          px: 3,
          py: 1.2,
          borderRadius: 2,
          textTransform: "uppercase",
          "&:hover": {
            bgcolor: "#00d9e6"
          }
        }}
      >
        Buscar Challenges
      </Button>
     }
     
      
    </Box>
  );
};

export default ChallangeEmpty;