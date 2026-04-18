import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PageWrapper from "../components/pageWrapper";
import { LoginSchema } from "../../../utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginType } from "../../../types/userTypes";
// import useForm from "../utils/userForm";


import { useForm } from "react-hook-form"; 
import DarkField from "../../../components/darkField";

export default function Login() {


  const { login} = useAuth();


  const handlerlogin = (data: LoginType) => {
    login(data);
  };

   const { register,
  handleSubmit,
  formState: { errors },} = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
     mode: "onBlur", 

  });

  return (
    <PageWrapper>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#05050A",
          color: "#e4e1e9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: 600,
            height: 600,
            background: "rgba(0,240,255,0.5)",
            filter: "blur(120px)",
          }}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "7fr 5fr" },
            maxWidth: 1200,
            width: "100%",
            gap: 4,
            zIndex: 1,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Box sx={{ width: 50, height: 2, bgcolor: "#00f0ff" }} />
              <Typography
                sx={{ fontSize: 12, letterSpacing: 4, color: "#00f0ff" }}
              >
                Future 2099
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: 60, md: 110 },
                fontWeight: 900,
                fontStyle: "italic",
                color: "#00f0ff",
                lineHeight: 0.8,
                textShadow: "0 0 20px rgba(0,240,255,0.4)",
              }}
            >
              STREET
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 60, md: 110 },
                fontWeight: 900,
                fontStyle: "italic",
                color: "#00f0ff",
                lineHeight: 0.8,
              }}
            >
              RACE
            </Typography>

            <Typography sx={{ mt: 4, color: "#b9cacb", maxWidth: 400 }}>
              Accercate a la red de de Pilotos. Asegure su posición en las
              clasificaciones mundiales.
            </Typography>

            <Box sx={{ mt: 6, display: "flex", gap: 6 }}>
              <Box>
                <Typography sx={{ fontSize: 10, color: "#b9cacb" }}>
                  ACTIVE PILOTS
                </Typography>
                <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>
                  14,892
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ fontSize: 10, color: "#b9cacb" }}>
                  STATUS
                </Typography>
                <Typography
                  sx={{ fontSize: 24, fontWeight: "bold", color: "#2ff801" }}
                >
                  STABLE
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
        
            sx={{
              backdropFilter: "blur(20px)",
              background: "rgba(31,31,36,0.6)",
              p: 5,
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
              position: "relative",
            }}
          >
            <Typography sx={{ fontSize: 24, fontWeight: 700 }}>
              PILOT AUTHENTICATION
            </Typography>

            <Typography sx={{ fontSize: 12, color: "#b9cacb", mt: 1 }}>
              Identifícate para sincronizar tu velocidad
            </Typography>

            <Box
              component="form" onSubmit={handleSubmit(handlerlogin)}
              sx={{ mt: 5, display: "flex", flexDirection: "column", gap: 4 ,color:"white"}}
            >
              <DarkField
                {...register("email")}
                 error={!!errors.email}
                helperText={errors.email?.message}
                label="Email"
                variant="standard"
                fullWidth
                sx={{height:50}}

                
              />

              <DarkField
                {...register("password")}
                 error={!!errors.password}
                 helperText={errors.password?.message}
                label="password"
                type="password"
                variant="standard"
                fullWidth
                sx={{height:50}}
              
              />

              <Button
                // onClick={login}
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  py: 2,
                  fontWeight: 900,
                  letterSpacing: 2,
                  background: "linear-gradient(to right, #00dbe9, #00f0ff)",
                  color: "#002022",
                  boxShadow: "0 0 25px rgba(0,240,255,0.3)",
                  "&:hover": {
                    boxShadow: "0 0 40px rgba(0,240,255,0.5)",
                  },
                }}
              >
                START
              </Button>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography
                  sx={{ fontSize: 15, color: "#7c8080", cursor: "pointer" }}
                >
                  Lost Key?
                </Typography>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      width: "120px",
                      padding: "3px",
                      textAlign: "center",
                      fontSize: 15,
                      color: "#b9cacb",
                      cursor: "pointer",
                      border: "1px solid",
                    }}
                  >
                    New Pilot?
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
}
