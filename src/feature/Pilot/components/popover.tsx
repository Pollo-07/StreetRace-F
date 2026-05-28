import { Menu, MenuItem,  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function MenuPopever({ setAnchorEl,anchorEl }: { setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>> ,
    anchorEl: HTMLElement | null }) {

      const navigate = useNavigate();
      const {logout} = useAuth()


  const handleEditPerfil = (arg:string) => {
    setAnchorEl(null);
    navigate(`/${arg}`) 
  };

  

  const hanldelogout = () => {
    setAnchorEl(null);
    logout()
    navigate("/login")
  };


  return (
    <>
     <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={() => setAnchorEl(null)}
  PaperProps={{
    sx: {
      width: 220,
      borderRadius: 3,
      p: 1,
      background: "#0b0f14",
      boxShadow: "0 0 25px rgba(0,240,255,0.15)",
      border: "1px solid rgba(0,240,255,0.15)"
    }
  }}
>
  <MenuItem
    onClick={() => handleEditPerfil("edituser")}
    sx={{
      borderRadius: 2,
      px: 2,
      py: 1.2,
      color: "#e6faff",
      fontSize: 14,
      transition: "all .2s ease",
      "&:hover": {
        background: "rgba(0,240,255,0.08)",
        boxShadow: "0 0 10px rgba(0,240,255,0.2)"
      }
    }}
  >
    Editar perfil
  </MenuItem>

  <MenuItem
    onClick={hanldelogout}
    sx={{
      borderRadius: 2,
      px: 2,
      py: 1.2,
      color: "#ff4d6d",
      fontSize: 14,
      transition: "all .2s ease",
      "&:hover": {
        background: "rgba(255,77,109,0.08)",
        boxShadow: "0 0 10px rgba(255,77,109,0.25)"
      }
    }}
  >
    Cerrar sesión
  </MenuItem>
</Menu>
    </>
  );
}