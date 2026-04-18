import { useEffect, useState, type ChangeEvent } from "react";
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
  Chip,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import BuildIcon from "@mui/icons-material/Build";
import useForm from "../../../utils/userForm";
import DarkField from "../../../components/darkField";
import SectionBlock from "../../../components/sectionBlock";
import PageWrapper from "./pageWrapper";
import UseVehicle from "../hooks/useVehicle";
import { useQueryClient } from "@tanstack/react-query";
import ButtonCustom from "../../../components/buttonCustom";
import type { VehicleForm, Vehiculo } from "../../../types/vehicleTypes";

const VEHICLE_TYPES = ["auto", "moto", "monopatin_electrico"];

const initialForm:VehicleForm= {
  user_id: "",
  tipo_vehiculo: "",
  marca: "",
  modelo: "",
  año: "",
  color: "",
  placa: "",
};

function ModalCars({
  open,
  setOpen,
  title,
  initialData
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title:string,
  initialData?:Vehiculo
}) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [modInput, setModInput] = useState("");
  const [modifications, setModifications] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const {CreateVehicle} = UseVehicle()

  const queryClient = useQueryClient();
  const auth = queryClient.getQueryData(["auth"])  as { token: string, userId:string } | null
  const user_id = auth?.userId


 


  const { formData, handleChange ,resetForm} = useForm(initialForm);


  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const addMod = () => {
    const val = modInput.trim();
    if (val && !modifications.includes(val)) {
      setModifications([...modifications, val]);
      setModInput("");
    }
  };

  const removeMod = (mod: string) =>
    setModifications(modifications.filter((m) => m !== mod));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFormData = { ...formData, 
      user_id,
       modificaciones: modifications.length > 0 
    ? modifications.join(",") 
    : ""
    };   

    const cleanData = Object.fromEntries(
  Object.entries(newFormData).filter(([_, value]) => value !== "") 
) as VehicleForm

    console.log(cleanData)
    try {
      setLoading(true);
      CreateVehicle(cleanData)
    }catch (error) {
      console.log(error,"error tryc catch");
  } finally{
      resetForm()
      setLoading(false);
      handleClose();
    }
     
  };

  const handleClose = () => {
  resetForm(initialForm);
  setModifications([]);
  setPhoto(null);
  setPhotoPreview(null);
  setOpen(false);
};
 useEffect(() => {
  if (open && initialData) {
    resetForm(initialData);
    setModifications(
      initialData.modificaciones 
        ? initialData.modificaciones.split(",") 
        : []
    );
  }
}, [initialData, open]);
  

  return (
    <PageWrapper>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent
          sx={{
            backgroundColor: "#000",
            display: "flex",
            fontFamily: "'Barlow Condensed', sans-serif",
            position: "relative",
            py: 4,
            overflow: "scrollY",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 1100,
              mx: "auto",
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                mb: 6,
              }}
            >
              <Box sx={{display:"flex",gap:1,alignItems:"center"}}>
                
              
                  <DirectionsCarIcon sx={{ color: "#00f0ff", fontSize: 100 }} />
               

                <Box>
                  <Typography
                    sx={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: { xs: "2.2rem", md: "3rem" },
                      letterSpacing: "0.04em",
                      lineHeight: 1,
                      color: "#fff",
                      textTransform: "uppercase",
                    }}
                  >
                   {title} 
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.9rem",
                      mt: 0.5,
                    }}
                  >
                    Completa los datos de tu vehículo
                  </Typography>
                </Box>
              </Box>

              <CloseIcon
                sx={{ color: "red", cursor: "pointer" }}
                onClick={handleClose}
              />
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 380px" },
                gap: 4,
                alignItems: "start",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <SectionBlock label="01 — DATOS DEL VEHÍCULO">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2.5,
                    }}
                  >
                    <DarkField
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              bgcolor: "#0f172a",
                              color: "#fff",
                              borderRadius: 2,
                              mt: 1,
                              border: "1px solid rgba(0,240,255,0.2)",
                              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                            },
                          },
                        },
                      }}
                      select
                      label="Tipo de Vehículo"
                      name="tipo_vehiculo"
                      value={formData.tipo_vehiculo}
                      onChange={handleChange}
                    >
                      {VEHICLE_TYPES.map((t) => (
                        <MenuItem
                          key={t}
                          value={t}
                          sx={{
                            bgcolor: "#1a1a24",
                            color: "#fff",
                            "&:hover": { bgcolor: "#252530" },
                          }}
                        >
                          {t}
                        </MenuItem>
                      ))}
                    </DarkField>

                    <DarkField
                      label="Marca"
                      name="marca"
                      value={formData.marca}
                      onChange={handleChange}
                      placeholder="Ej: Toyota"
                    />
                    <DarkField
                      label="Modelo"
                      name="modelo"
                      value={formData.modelo}
                      onChange={handleChange}
                      placeholder="Ej: Corolla"
                    />

                    <DarkField
                      label="Año"
                      name="año"
                      value={formData.año}
                      onChange={handleChange}
                    ></DarkField>
                  </Box>
                </SectionBlock>

                <SectionBlock label="02 — IDENTIFICACIÓN">
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2.5,
                    }}
                  >
                    <Box
                      sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
                    >
                      <Box
                        sx={{
                          width: 48,
                          height: 56,
                          borderRadius: "10px",
                          flexShrink: 0,
                          border: "2px solid rgba(255,255,255,0.1)",
                          background: formData.color || "#333",
                          position: "relative",
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          type="color"
                          value={formData.color || "#333333"}
                          onChange={handleChange}
                          name="color"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "200%",
                            height: "200%",
                            border: "none",
                            cursor: "pointer",
                            opacity: 0,
                          }}
                        />
                      </Box>
                      <DarkField
                        label="Color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        placeholder="#FF5000 o Rojo"
                        sx={{ flex: 1 }}
                      />
                    </Box>

                    <DarkField
                      label="Placa"
                      name="placa"
                      value={formData.placa}
                      onChange={handleChange}
                      placeholder="Ej: ABC-123"
                      inputProps={{
                        style: {
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontWeight: 700,
                        },
                      }}
                    />
                  </Box>
                </SectionBlock>

                <SectionBlock label="03 — MODIFICACIONES">
                  <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
                    <DarkField
                      label="Agregar modificación"
                      value={modInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setModInput(e.target.value)
                      }
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addMod();
                        }
                      }}
                      placeholder="Ej: Turbo, Rines 18', Spoiler..."
                      sx={{ flex: 1 }}
                    />
                    <Tooltip title="Agregar">
                      <IconButton
                        onClick={addMod}
                        sx={{
                          bgcolor: "#00f0ff",
                          border: "1px solid #00f0ff",
                          color: "#a9aaaa",
                          borderRadius: "10px",
                          width: 56,
                          height: 56,
                          "&:hover": { bgcolor: "#104153" },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {modifications.length > 0 ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {modifications.map((mod) => (
                        <Chip
                          key={mod}
                          label={mod}
                          onDelete={() => removeMod(mod)}
                          deleteIcon={
                            <CloseIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "rgba(255,255,255,0.5) !important",
                              }}
                            />
                          }
                          sx={{
                            bgcolor: "#104153",
                            border: "1px solid #00f0ff",
                            color: "#00f0ff",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            "& .MuiChip-deleteIcon:hover": {
                              color: "#00f0ff !important",
                            },
                          }}
                          icon={
                            <BuildIcon
                              sx={{
                                fontSize: "14px !important",
                                color: "#00f0ff !important",
                              }}
                            />
                          }
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.2)",
                        fontSize: "0.85rem",
                        fontStyle: "italic",
                      }}
                    >
                      Sin modificaciones agregadas aún.
                    </Typography>
                  )}
                </SectionBlock>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  position: { lg: "sticky" },
                  top: 24,
                }}
              >
                <Box
                  sx={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(10px)",
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                    <Typography
                      sx={{
                        color: "#00f0ff",
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      04 — FOTO DEL VEHÍCULO
                    </Typography>
                  </Box>
                  <Divider
                    sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 2 }}
                  />

                  <Box sx={{ px: 3, pb: 3 }}>
                    <Box
                      component="label"
                      sx={{
                        display: "block",
                        cursor: "pointer",
                        width: "100%",
                        aspectRatio: "16/10",
                        borderRadius: "12px",
                        border: photoPreview
                          ? "none"
                          : "2px dashed rgba(36, 186, 236, 0.3)",
                        background: photoPreview
                          ? `url(${photoPreview}) center/cover no-repeat`
                          : "rgba(255,80,0,0.04)",
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.2s ease",
                        "&:hover .overlay": { opacity: 1 },
                      }}
                    >
                      <Box
                        className="overlay"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,0.55)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 1,
                          opacity: photoPreview ? 0 : 1,
                          transition: "opacity 0.2s",
                        }}
                      >
                        <PhotoCameraIcon
                          sx={{ color: "#00f0ff", fontSize: 36 }}
                        />
                        <Typography
                          sx={{
                            color: "#fff",
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.95rem",
                          }}
                        >
                          {photoPreview ? "Cambiar foto" : "Subir foto"}
                        </Typography>
                        <Typography
                          sx={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.75rem",
                          }}
                        >
                          JPG, PNG, WEBP
                        </Typography>
                      </Box>

                      <input
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto}
                      />
                    </Box>

                    {photo && (
                      <Typography
                        sx={{
                          mt: 1.5,
                          color: "rgba(255,255,255,0.35)",
                          fontSize: "0.75rem",
                          textAlign: "center",
                        }}
                      >
                        {photo.name}
                      </Typography>
                    )}
                  </Box>
                </Box>

                  <ButtonCustom>
                  {loading
                    ? "Guardando..."
                    : success
                      ? "✓ Guardado"
                      : (<><SaveIcon/>  <Typography sx={{ml:1}}>Guardar Vehículo</Typography></>)}
                </ButtonCustom>

             
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}

<style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&display=swap');`}</style>;
export default ModalCars;
