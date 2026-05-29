import { Box, Typography, IconButton, Badge } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import MenuPopever from "../components/popover";
import CompleteProfileModal from "../components/completeProfileModal";
import UseAuthContext from "../hooks/useAuthContext";
import ModalNotificaciones from "../components/modalNotificaciones";



const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorElNotificacion, setAnchorElNotificacion] = useState<null | HTMLElement>(null);
    const { state } = UseAuthContext();
  

  const NotificationRead = state.notificaciones.filter((item)=>!item.leida)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
   const handleOpenNotificacion = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNotificacion(event.currentTarget);
  };


  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
          background: "#0D0D16",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          px: { xs: 1, sm: 3 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 3 } }}>
          <IconButton
            sx={{ display: { lg: "none" }, color: "white" }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MenuIcon />
          </IconButton>

          <Link className="link title" to="/">
            STREET RACE
          </Link>
        </Box>

        <Box sx={{ display: "flex", gap: { xs: 1, sm: 4 }, alignItems: "center" }}>
           <IconButton onClick={handleOpenNotificacion}>
                <Badge
                  badgeContent={NotificationRead.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#00f0ff",
                      color: "#0b0f14",
                      fontSize: 11,
                      boxShadow: "0 0 8px rgba(0,240,255,0.7)"
                    }
                  }}
                >
                  <NotificationsNoneOutlinedIcon sx={{ color: "white" }} />
                </Badge>
            </IconButton>
              <ModalNotificaciones anchorElNotificacion={anchorElNotificacion} setAnchorElNotificacion={setAnchorElNotificacion}/>
            <IconButton onClick={handleOpen}>
               <SettingsOutlinedIcon sx={{ color: "white" }} />
          </IconButton>
          <MenuPopever  setAnchorEl={setAnchorEl} anchorEl={anchorEl} />
           <Link style={{ display: "flex", alignItems: "center" }}  to="/perfil">    <AccountCircleOutlinedIcon sx={{ color: "white", }} /></Link>
      
        </Box>
      </Box>

      <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
        
        <Box
          sx={{
            width: { xs: sidebarOpen ? "200px" : 0, md: "250px" },
            background: "#0A0A12",
            display: { xs: sidebarOpen ? "flex" : "none", md: sidebarOpen ? "flex" : "none" ,lg:"flex" },
            flexDirection: "column",
            gap: "5px",
            borderRight: "1px solid rgba(255,255,255,0.1)",
            pt: 4,
            transition: "width 0.3s",
            overflow: "hidden",
            zIndex: 10,
            position: { xs: "absolute", md: "relative" },
            height: "100%",
          }}
        >
          <Box sx={{ padding: "0px 22px", mb: 3 }}>
            <Typography variant="caption" sx={{ color: "#00F0FF" }}>ELITE DIVISION</Typography>
            <Box sx={{ border: "1px solid rgba(0,240,255)", width: 50, mt: 1 }}></Box>
            <Box sx={{ border: "1px solid rgba(0,240,255,0.2)", width: 80, mt: 0 }}></Box>
          </Box>

          <Link className="link" to="/"><SpeedOutlinedIcon sx={{ mr: 1 }} />Dashboard</Link>
          <Link className="link" to="/challenges"><EmojiEventsOutlinedIcon sx={{ mr: 1 }} />Challenges</Link>
          <Link className="link" to="/challengeComplete"><TaskAltOutlinedIcon sx={{ mr: 1 }} />Challenges Complete</Link>
          <Link className="link" to="/discoverPilot"><SearchOutlinedIcon sx={{ mr: 1 }} />Encontrar Piloto</Link>
          <Link className="link" to="/garage"><DirectionsCarFilledOutlinedIcon sx={{ mr: 1 }} />My Garage</Link>
          <Link className="link" to="/perfil"><AccountCircleOutlinedIcon sx={{ mr: 1 }} />Piloto Perfil</Link>
        </Box>

        <Box
          id="main-scroll"
          sx={{
            flex: 1,
            background: "#10111A",
            overflow: "auto",
            minHeight: 0,
      
          }}
        >
            
      
      <Outlet />
          
          
        </Box>

        <CompleteProfileModal/>

      </Box>
    </Box>
  );
};

export default Layout;
