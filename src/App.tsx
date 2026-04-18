import { Box, CssBaseline } from "@mui/material";
import AppRoutes from "./routes/appRoutes";
import "./App.css";
import {  useEffect } from "react";
import { SnackbarProvider } from "notistack";
import UseAuthContext from "./feature/Pilot/hooks/useAuthContext";
import { useAuth } from "./feature/Pilot/hooks/useAuth";
import ScrollToTop from "./components/ScrollToTop";




export default function App() {
  
  const {state} = UseAuthContext()
  const {refreshTokens}=useAuth()


  useEffect(()=>{
       refreshTokens()
  },[])




if(state.loading){
    return <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Cargando sesión...
      </Box>
   }



  return (
    <>
      <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <ScrollToTop/> 
        <CssBaseline />
        <AppRoutes/>

        
 </SnackbarProvider>
     
    </>
  );
}
