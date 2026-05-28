import { Box, IconButton, Typography } from "@mui/material";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FlagIcon from "@mui/icons-material/Flag";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuPopever from "../../Pilot/components/popover";
const navItems = [

     { label: "Challenges Disputed", path: ".", icon: <FlagIcon /> },
  { label: "Ranking", path: "rankingPage", icon: <DashboardIcon /> },
  { label: "Pilots", path: "pilotManagement", icon: <PeopleIcon /> },
  { label: "Reportes", path: "reportes", icon: <AssessmentIcon /> },
  { label: "Configuración", path: "config", icon: <SettingsIcon /> },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }; 


  
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0b0b0b" }}>
      <Box
        sx={{
          width: collapsed ? 80 : 260,
          transition: "0.2s",
          bgcolor: "#000",
          borderRight: "1px solid rgba(0,240,255,0.12)",
          display: "flex",
          flexDirection: "column",
          p: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!collapsed && (
            <Typography
              sx={{ color: "#00f0ff", fontWeight: 700, fontSize: 30 }}
            >
              Street Race
            </Typography>
          )}
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon sx={{ color: "#00f0ff" }} />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "space-between",
            height: "50%",
            mt: 2,
          }}
        >
         {navItems.map((item) => (
  <NavLink
    key={item.path}
    to={item.path}
    end={item.path === "."}
    style={{ textDecoration: "none" }}
  >
    {({ isActive }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 1.2,
          borderRadius: 2,
          cursor: "pointer",

          bgcolor: isActive ? "rgba(0,240,255,0.1)" : "transparent",
          color: isActive ? "#fff" : "rgba(255,255,255,0.6)",

          border: isActive
            ? "1px solid rgba(0,240,255,0.3)"
            : "1px solid transparent",

          transition: "0.2s",

          "&:hover": {
            bgcolor: "rgba(0,240,255,0.08)",
            color: "#fff",
          },
        }}
      >
        {item.icon}
        {!collapsed && item.label}
      </Box>
    )}
  </NavLink>
))}

        </Box>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            height: 64,
            borderBottom: "1px solid rgba(0,240,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            bgcolor: "#000",
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 600 ,fontSize:30}}>
            Panel Administrativo
          </Typography>

          <Box sx={{display:"flex",alignItems:"center",gap:2,cursor:"pointer"}} onClick={(e)=>handleOpen(e)}>
             <AccountCircleIcon sx={{ color:"#00f0ff"}}/>
               <Typography  variant="h6" sx={{ color: "#00f0ff" }} > Admin</Typography>
          </Box>
          <MenuPopever  setAnchorEl={setAnchorEl} anchorEl={anchorEl} />

         
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
         
            <Outlet />
        
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
