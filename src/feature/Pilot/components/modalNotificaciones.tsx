import { Box, Menu, MenuItem, Typography } from "@mui/material";
import UseAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import UseNotification from "../hooks/useNotification";

type MenuNotificacionesProps = {
  anchorElNotificacion: HTMLElement | null;
  setAnchorElNotificacion: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
};
const ModalNotificaciones = ({ anchorElNotificacion,setAnchorElNotificacion,}: MenuNotificacionesProps) => {
  const { state } = UseAuthContext();
  const navigate = useNavigate()
  const {allNotificationsAsRead} =UseNotification()


  const handlerMenu=(tipo:string)=>{
    navigate(tipo === "resultado" ? "/challengeComplete" : "/challenges")
    setAnchorElNotificacion(null)
  }

  const onClosed =()=>{
    setAnchorElNotificacion(null)
    allNotificationsAsRead()

  }


  return (
<Menu
  anchorEl={anchorElNotificacion}
  open={Boolean(anchorElNotificacion)}
  onClose={onClosed}
  PaperProps={{
    sx: {
      width: 400,
      borderRadius: 3,
      pb:5,
      background: "#0b0f14",
      boxShadow: "0 0 25px rgba(0,240,255,0.15)",
      border: "1px solid rgba(0,240,255,0.15)",
    }
  }}
>
  <Box sx={{ px: 2, py: 1.5 }}>
    <Typography
      sx={{
        fontWeight: 600,
        fontSize: 15,
        color: "#00f0ff",
        letterSpacing: "0.5px"
      }}
    >
      NOTIFICACIONES 
    </Typography>
  </Box>

  <Box sx={{ maxHeight: 380, overflowY: "auto" , px:2 ,pb:1}}>
    {state.notificaciones.length === 0 ? (
      <Box sx={{ py: 5, textAlign: "center" }}>
        <Typography sx={{ color: "#6b7c85" }}>
          Sin actividad ⚡
        </Typography>
      </Box>
    ) : (
      state.notificaciones.map((n, i) => (
        <MenuItem
         onClick={()=>handlerMenu(n.tipo)}
          key={i}
          sx={{
            width:350,
            mb: 1 ,
            borderRadius: 2,
            alignItems: "flex-start",
            px: 2,
            py: 1.5,
            background: !n.leida
              ? "rgba(0,240,255,0.06)"
              : "rgba(255,255,255,0.02)",
            backdropFilter: "blur(6px)",
            border: !n.leida
              ? "1px solid rgba(0,240,255,0.25)"
              : "1px solid rgba(0,240,255,0.08)",
            transition: "all .2s ease",
            position: "relative",

            "&:hover": {
              background: "rgba(0,240,255,0.08)",
              boxShadow: "0 0 12px rgba(0,240,255,0.25)"
            }
          }}
        >
          {!n.leida && (
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                px: 1,
                py: "2px",
                borderRadius: 1,
                fontSize: 10,
                color: "#00f0ff",
                border: "1px solid rgba(0,240,255,0.4)",
                boxShadow: "0 0 6px rgba(0,240,255,0.3)"
              }}
            >
              NEW
            </Box>
          )}

          <Box width="100%" pl={!n.leida ? 1 : 0}>
            <Typography
              variant="body2"
              sx={{
                color: !n.leida ? "#ffffff" : "#e6faff",
                fontWeight: !n.leida ? 600 : 400,
                mb: 0.5,
                lineHeight: 1.4,          
                whiteSpace: "normal",                 
              }}
            >
             {n.mensaje}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "#5f7a82",
                fontSize: 11
              }}
            >
              {new Date(n.created_at!).toLocaleDateString("es-CO")}
            </Typography>
          </Box>
        </MenuItem>
      ))
    )}
  </Box>
</Menu>
  )
};

export default ModalNotificaciones;
