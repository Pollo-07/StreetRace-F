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

  const onclose=()=>  setAnchorEl(null)

    const open = Boolean(anchorEl);

  return (
    <>
     
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onclose}
      >
        <MenuItem onClick={()=>handleEditPerfil("edituser")} >Edit Perfil</MenuItem>
        <MenuItem onClick={hanldelogout} >Logout</MenuItem>
      </Menu>
    </>
  );
}