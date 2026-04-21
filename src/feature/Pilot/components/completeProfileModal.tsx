import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const CompleteProfileModal = () => {

    const [open,setOpen] = useState<boolean>(false)
    const  navigate = useNavigate()


    useEffect(() => {
  const alreadyShown = localStorage.getItem("profileModalShown");

  if (alreadyShown) return;

  const timer = setTimeout(() => {
    setOpen(true);
    localStorage.setItem("profileModalShown", "true");
  }, 5000);

  return () => clearTimeout(timer);
}, []);


const onContinue=()=>{

    console.log("hechooo")
   setOpen(false)
    navigate("/edituser")
}


  return (
  <Dialog
  open={open}
  onClose={() => setOpen(false)}
  disableEscapeKeyDown
  PaperProps={{
    sx: {
      borderRadius: 3,
      background: "#181920",
      border: "1px solid rgba(255,255,255,0.08)",
      p: 1
    }
  }}
>
  {/* HEADER */}
  <DialogTitle
    sx={{
      fontWeight: 900,
      textAlign: "center",
      color: "#00f1fe",
      textTransform: "uppercase",
      letterSpacing: 1
    }}
  >
    Complete your profile
  </DialogTitle>

  {/* CONTENT */}
  <DialogContent>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
        px: 2
      }}
    >
      <Typography sx={{ color: "#cfd3dc", fontSize: 14, lineHeight: 1.6 }}>
        Debes completar tu información de usuario antes de continuar.
      </Typography>

      <Typography sx={{ color: "#9aa0a6", fontSize: 13 }}>
        Esto nos ayuda a personalizar tu experiencia y desbloquear todas las funciones.
      </Typography>
    </Box>
  </DialogContent>

  {/* ACTIONS */}
  <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
    <Button
      onClick={onContinue}
      variant="contained"
      sx={{
        bgcolor: "#00f1fe",
        color: "#00555a",
        fontWeight: "bold",
        px: 4,
        py: 1,
        borderRadius: 2,
        textTransform: "uppercase",
        boxShadow: "0 0 20px rgba(0,241,254,0.3)",
        "&:hover": {
          bgcolor: "#00d9e6"
        }
      }}
    >
      Complete now
    </Button>
  </DialogActions>
</Dialog>
  );
};

export default CompleteProfileModal;