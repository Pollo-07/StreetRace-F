import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";



type Props = {
  setOpen?:React.Dispatch<React.SetStateAction<boolean>>
  setMode?: React.Dispatch<React.SetStateAction<"create" | "edit">>;
};

const CarsEmpty = ({setOpen,setMode}:Props) => {

 const location = useLocation();
 const navigate = useNavigate()

 const handlerOpenModal=()=>{
    if(location.pathname === "/" || location.pathname ==="/perfil"){
          navigate("/garage")
          return
    }

    if(location.pathname === "/garage"){
        setMode?.("create")
        setOpen?.(true)
    }
 }

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
          color: "#ff6e81",
          textTransform: "uppercase",
          letterSpacing: 1
        }}
      >
        Garage Vacio
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
       vehiculos Activos no encontrados. Iniciar la adquisición en el mercado negro.
      </Typography>

     
      <Button
      onClick={handlerOpenModal}
        variant="outlined"
        sx={{
          mt: 2,
          borderColor: "#ff6e81",
          color: "#ff6e81",
          px: 3,
          py: 1.2,
          borderRadius: 2,
          fontWeight: "bold",
          textTransform: "uppercase",
          "&:hover": {
            borderColor: "#ff8fa0",
            backgroundColor: "rgba(255,110,129,0.08)"
          }
        }}
      >
      { location.pathname === "/garage" ? "Crear vehiculo":<Typography> Visit the Market</Typography>}
      </Button>
    </Box>
  );
};

export default CarsEmpty;