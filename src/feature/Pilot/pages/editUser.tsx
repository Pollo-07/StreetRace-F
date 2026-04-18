import { useEffect, useState, type ChangeEvent } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import type {  UserForm } from "../../../types/userTypes";
import useForm from "../../../utils/userForm";
import SectionBlock from "../../../components/sectionBlock";
import DarkField from "../../../components/darkField";
import PageWrapper from "../components/pageWrapper";
import { useUser } from "../hooks/useUser";



export default function EditUser() {

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

    const initialForm: UserForm = {
    username: "",
    foto_perfil:null,
    zona_localidad: "",
    zona_ciudad: "",
    zona_pais: "",
    zona_estado: "",
  };
  const { formData, handleChange ,setForm} = useForm(initialForm);

  
  const {user,updateUser} = useUser()
  

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    try {
      setLoading(true);
       const formDataToSend = new FormData()

    formDataToSend.append("username", formData.username);
    formDataToSend.append("zona_ciudad", formData.zona_ciudad);
    formDataToSend.append("zona_estado", formData.zona_estado);
    formDataToSend.append("zona_pais", formData.zona_pais);
    formDataToSend.append("zona_localidad", formData.zona_localidad);

     if (image) {
      formDataToSend.append("foto_perfil", image);
    }
        
   console.log("formt",[...formDataToSend.entries()])

    
      updateUser(formDataToSend)
      
    } catch (error) {
      
    }finally{
         setLoading(false);
    }
    

  };




  useEffect(() => {
  if (user) {
    setForm(prev => ({
      ...prev,
      username: user.username,
      zona_localidad: user.zona_localidad || "",
      zona_ciudad: user.zona_ciudad || "",
      zona_estado: user.zona_estado || "",
      zona_pais: user.zona_pais || "",
    }));

    setPreview(user.foto_perfil)

  }
}, [user]);

  return (
    <PageWrapper>
      <Box
        sx={{
          height: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              position: "relative",
              height: "45vh",
            }}
          >
            <Typography
              variant="h4"
              color="white"
              fontWeight={700}
              sx={{
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                fontStyle: "italic",
              }}
            >
              Editar Perfil
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.75)">
              Actualiza tu información personal
            </Typography>

            <Box sx={{ position: "relative", mt: 1 }}>
              <Avatar
                src={preview ?? undefined}
                sx={{
                  width: 100,
                  height: 100,
                  border: "4px solid white",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                  fontSize: 40,
                }}
              >
                {!preview && formData.username
                  ? formData.username[0].toUpperCase()
                  : !preview
                    ? "?"
                    : null}
              </Avatar>

              <Tooltip title="Cambiar foto">
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "white",
                    width: 32,
                    height: 32,
                    boxShadow: 2,
                    "&:hover": { bgcolor: "#f0f0f0" },
                  }}
                >
                  <PhotoCameraIcon sx={{ fontSize: 16, color: "#667eea" }} />
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </IconButton>
              </Tooltip>
            </Box>

            {preview && (
              <Typography variant="caption" color="rgba(255,255,255,0.85)">
                {image?.name}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              p: 4,
              width: 481,
              margin: "-118px auto 0 auto",
              borderRadius: 2,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <SectionBlock label={"INFORMACIÓN PERSONAL"}>
                  <DarkField
                    fullWidth
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <EditIcon
                          sx={{ mr: 1, color: "white", fontSize: 18 }}
                        />
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    <DarkField
                      label="Localidad"
                      name="zona_localidad"
                      value={formData.zona_localidad}
                      onChange={handleChange}
                    />
                    <DarkField
                      label="Ciudad"
                      name="zona_ciudad"
                      value={formData.zona_ciudad}
                      onChange={handleChange}
                    />
                    <DarkField
                      label="Estado"
                      name="zona_estado"
                      value={formData.zona_estado}
                      onChange={handleChange}
                    />
                    <DarkField
                      label="País"
                      name="zona_pais"
                      value={formData.zona_pais}
                      onChange={handleChange}
                    />
                  </Box>
                </SectionBlock>


                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={<SaveIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background:
                      "linear-gradient(135deg, #104153 0%, #00f0ff 100%)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0 4px 14px rgba(102,126,234,0.5)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #104153 25%, #00f0ff 75%)",
                    },
                  }}
                >
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
}
