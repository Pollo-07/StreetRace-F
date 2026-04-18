import {
  Box,
  Typography,
    Button,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import fondoregister from "../assets/fondo-register.png";
import type { RegisterType,} from "../../../types/userTypes";
import { useAuth } from "../hooks/useAuth";
import PageWrapper from "../components/pageWrapper";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "../../../utils/zodSchema";
import DarkField from "../../../components/darkField";

export const Register = () => {
  const { register } = useAuth();

  
  const registerUser = (data: RegisterType) => {
    register(data);
  };

  const {register:registerForm,handleSubmit,formState:{errors},control} = useForm<RegisterType>({
    resolver:zodResolver(RegisterSchema),
    mode:"onBlur",
      reValidateMode: "onBlur",
     defaultValues:  { userName: "", password: "", email: "", tipo_categoria: "",protocol:false }
  })

  return (
    <PageWrapper>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: "100vh",
          bgcolor: "#131318",
          color: "#e4e1e9",
        }}
      >

        {/* IMAGEN / HERO */}
        <Box
          sx={{
            position: "relative",
            width: { xs: "100%", md: "60%" },
            height: { xs: "50vh", sm: "60vh", md: "100vh" },
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={fondoregister}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.6,
              transition: "0.7s",
              "&:hover": { filter: "grayscale(0%)" },
            }}
          />

          <Box
            sx={{
              pointerEvents: "none",
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent, rgba(19,19,24,0.4), #131318)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              bottom: { xs: 10, sm: 20, md: 40 },
              left: { xs: 15, sm: 30, md: 40 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 36, md: 80 },
                fontWeight: 900,
                fontStyle: "italic",
              }}
            >
              STREET
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 20, sm: 36, md: 80 },
                fontWeight: 900,
                color: "#00f0ff",
              }}
            >
              RACE
            </Typography>
          </Box>
        </Box>

        {/* FORMULARIO */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, sm: 5 },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 400 }}>
            <Typography
              sx={{
                mb: 2,
                fontSize: { xs: 20, sm: 25, md: 32 },
                fontWeight: 800,
              }}
            >
              ÚNETE AL CIRCUITO
            </Typography>

            <Typography
              sx={{ mb: 4, color: "#b9cacb", fontSize: { xs: 12, sm: 14 } }}
            >
              Inicializa tu identidad de piloto
            </Typography>

            <Box
              component="form"
               onSubmit={handleSubmit(registerUser)}
              sx={{ display: "flex", flexDirection: "column", gap: 3 }}
            >
              <DarkField
                 {...registerForm("userName")}
                  error={!!errors.userName}
                helperText={errors.userName?.message}
                label="username"
                variant="standard"
                fullWidth
                sx={{height:50}}
              
              />

              <DarkField
                 {...registerForm("email")}
                 error={!!errors.email}
                helperText={errors.email?.message}
                name="email"
                label="email"
                variant="standard"
                fullWidth
                 sx={{height:50}}
             
              />

              <DarkField
                 {...registerForm("password")}
                 error={!!errors.password}
                helperText={errors.password?.message}
                name="password"
                label="password"
                type="password"
                variant="standard"
                fullWidth
                  sx={{height:50}}
               
              />

              <FormControl
                fullWidth
              
                sx={{
                  height:80,
                  "& .MuiInput-underline:before": {
                    borderBottom: "1px solid #3b494b",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "2px solid #00f0ff",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "2px solid #00f0ff",
                  },
                }}
                error={!!errors.tipo_categoria}
              >
                <InputLabel
                  sx={{
                    color: "#b9cacb",
                    "&.Mui-focused": { color: "#00f0ff" },
                  }}
                >
                  Categoria
                </InputLabel>


              
                  <Controller
                   name="tipo_categoria"
                   
                   control={control}
                   render={({ field }) => (
                      <Select
                      variant="standard"
                      {...field} 
                      label="Tipo de carrera"
                      sx={{
                        color: "white",
                        "& .MuiSvgIcon-root": { color: "#b9cacb" },
                      }}
                >
                  <MenuItem value="Stock">Stock</MenuItem>
                  <MenuItem value="Modified">Modified</MenuItem>
                  <MenuItem value="Pro">Pro</MenuItem>
                </Select>
                     )}
                  >

                  </Controller>


                 <FormHelperText>
                        {errors.tipo_categoria?.message}
                  </FormHelperText>
              </FormControl>

              <Button
              type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  py: 2,
                  fontWeight: 800,
                  background: "linear-gradient(to right, #00dbe9, #00f0ff)",
                  color: "#002022",
                  boxShadow: "0 0 25px rgba(0,240,255,0.3)",
                  "&:hover": { boxShadow: "0 0 40px rgba(0,240,255,0.5)" },
                }}
              >
                CREATE PROFILE
              </Button>

               <Controller
                name="protocol"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value || false}
                        sx={{ color: "#00f0ff","&.Mui-checked": {color: "#00f0ff", }, }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 12 }}>
                        Accept Protocol
                      </Typography>
                    }
                  />
                )}/>
       
                {errors.protocol && (
            <Typography sx={{ color: "red", fontSize: 12 }}>
              {errors.protocol.message}
            </Typography>)}
            </Box>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
};

export default Register;
